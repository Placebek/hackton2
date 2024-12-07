from .models import TelegramBot
from rest_framework.serializers import ModelSerializer


class TelegramBotSerializer(ModelSerializer):
    class Meta:
        model = TelegramBot
        fields = ("name", "token", "is_active",)