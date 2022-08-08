from django.shortcuts import render
from rest_framework  import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse #takes a python dictionary to convert in into json http hresponse


# Create your views here.
class RoomView(generics.CreateAPIView): #also try: ListAPIView -> only a list, no POST field
    #Output html will display "Example" for class ExampleView()
    queryset= Room.objects.all() #what do we want to return
    #QUERYSETS are similar to SQL call results 
    #e.g. 1) Django:   queryset = Room.objects.all().order_by('host').values()
    #        SQL:      SELECT * FROM Room ORDER BY host;
    #     2) Django:   queryset = Room.obejcts.values_list('host')
    #        SQL:      SELECT host FROM Room 

    serializer_class = RoomSerializer #how to convert queryset in some format that I can output

class GetRoom(APIView):
    serializer_class = RoomSerializer
    look_me_up = "code" #note that this is accessed as an instance attribtue

    def get(self, request):
        code = request.GET.get(self.look_me_up)
        if code != None:
            room=Room.objects.filter(code=code)
            if  len(room)>0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host #check if user who makes GET is host, and save that information
                return Response(data, status.HTTP_200_OK)
            return Response({'Room not Found': 'Invalid Room Code'}, status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code Parameter not found in request'}, status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    look_me_up = "code"
    def post(self, request, format=None):
        #get the session key
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create() #session allows to access information to each user sessions
        code = request.data.get(self.look_me_up)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code #so we know which user is in which room
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)



class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    #with API view we can overwrite methodes like GET PUT POST
    def post(self, request, format=None):
       
         #get the session key
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data) #transform transferred data into Python represenation
        #thus we can check if the data was valid
        if serializer.is_valid():
            guest_can_pause=serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            #if we already have a session/host, we allow to overwrite
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0] #take the sessions room object
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])#need to pass update_fields, cause we want to update an existing object and not create a new one
                self.request.session['room_code'] = room.code #so we know which user is in which room
                return Response(RoomSerializer(room).data, status.HTTP_200_OK)
            else: #create a new Room
                room=Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code #so we know which user is in which room
                return Response(RoomSerializer(room).data, status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status.HTTP_400_BAD_REQUEST)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.sessions_key
            room_results = Room.objects.filter(host=host_id)
            if len(room_results)>0:
                room= room_results[0]
                room.delete()
            return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
