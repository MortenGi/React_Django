from django.shortcuts import render
from rest_framework  import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


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
                return Response(RoomSerializer(room).data, status.HTTP_200_OK)
            else: #create a new Room
                room=Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status.HTTP_400_BAD_REQUEST)
