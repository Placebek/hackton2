from django.http import JsonResponse
from django.views import View
from django.conf import settings
from .models import TelegramBot  
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from .serilizers import TelegramBotSerializer
from rest_framework.views import APIView
import hashlib
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from drf_yasg import openapi


class RegisterBotView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Добавление нового Telegram-бота. Проверяет токен через Telegram API и выдаст ApiKey",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description='Название бота'),
                'token': openapi.Schema(type=openapi.TYPE_STRING, description='Токен Telegram-бота')
            },
            required=['name', 'token'],
        ),
        responses={
            200: openapi.Response(
                description="Бот успешно зарегистрирован",
                examples={
                    "application/json": {
                        "message": "Бот успешно зарегистрирован!",
                        "api_key": "hashed_api_key"
                    }
                }
            ),
            400: openapi.Response(
                description="Ошибка валидации или проблемы с токеном",
                examples={
                    "application/json": {"error": "Invalid JSON format"}
                }
            )
        }
    )

    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            token = data.get('token')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

        if not name or not token:
            return JsonResponse({'error': 'Требуются имя бота и токен'}, status=400)

        response = requests.get(f'https://api.telegram.org/bot{token}/getMe')
        if response.status_code != 200:
            return JsonResponse({'error': 'Invalid token'}, status=400)

        api_key = hashlib.sha256(token.encode()).hexdigest()

        bot, created = TelegramBot.objects.get_or_create(
            name=name,
            defaults={'token': token, 'api_key': api_key}
        )

        if created:
            return JsonResponse({'message': 'Бот успешно зарегистрирован!.', 'api_key': api_key})
        else:
            return JsonResponse({'message': 'Бот таким токеном уже существует!'}, status=400)


class TelegramBotList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TelegramBotSerializer

    @swagger_auto_schema(
        operation_description="Возвращает список всех зарегистрированных Telegram-ботов пользователя.",
        responses={
            200: openapi.Response(
                description="Список всех Telegram-ботов",
                schema=TelegramBotSerializer(many=True),
                examples={
                    "application/json": [
                        {
                            "id": 1,
                            "name": "BotName1",
                            "token": "Token1",
                            "api_key": "hashed_api_key1"
                        },
                        {
                            "id": 2,
                            "name": "BotName2",
                            "token": "Token2",
                            "api_key": "hashed_api_key2"
                        }
                    ]
                }
            )
        }
    )

    def get(self, request):
        telegrambot = TelegramBot.objects.all()
        serializer = TelegramBotSerializer(telegrambot, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    