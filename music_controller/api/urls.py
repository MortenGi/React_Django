from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom 

urlpatterns = [
    path('room', RoomView.as_view()),
    path('add', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view())
]
