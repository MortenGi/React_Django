from django.shortcuts import render
from rest_framework  import generics 
from .serializers import RoomSerializer
from .models import Room

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

 