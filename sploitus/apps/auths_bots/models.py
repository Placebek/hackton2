from django.db import models


# Create your models here.
class TelegramBot(models.Model):
    name = models.CharField(max_length=100, unique=True)
    token = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name