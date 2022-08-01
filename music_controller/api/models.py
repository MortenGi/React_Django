from django.db import models
import string
import random

def generate_unique_code():
    length = 6 #smaller than "max" so we have space if we need more rooms

    while True:
        code = ''.join(random.choices(string.ascii_lowercase, k=length))
        if Room.objects.filter(code=code).count() ==0:
            break

    return code

# Create your models here.
class Room(models.Model): 
    #Django: fat models, thin views/controllers
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host    = models.CharField(max_length=80, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at=models.DateTimeField(auto_now_add=True)