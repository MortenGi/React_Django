from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('add', CreateRoomView.as_view())
]
