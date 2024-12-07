from django.db import models
from apps.auths.models import CustomUser


# Create your models here.
class TelegramBot(models.Model):
    name = models.CharField(max_length=100, unique=True)
    token = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    api_key = models.CharField(max_length=150, null=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_bots', null=True)

    def __str__(self):

        return self.name