from rest_framework import serializers
from .models import Room

#whenever we handle different requests, use a serializer

class RoomSerializer(serializers.ModelSerializer):
    class Meta:

        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause','votes_to_skip') #'host' will not be passed, but created by a session key (sessions = temporary connection bewteen computers)
        #look at views.py to see how we retreive the session key via POST