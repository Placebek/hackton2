from django.http import JsonResponse
from django.views import View
from django.conf import settings
from .models import TelegramBot  # Модель, где хранятся токены ботов
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


class RegisterBotView(APIView):
    # serializer_class = TelegramBotSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
    operation_description="Создание нового бота",
    responses={200: TelegramBotSerializer(many=True)},
    )

    def post(self, request):
        # Парсим данные JSON из тела запроса
        try:
            data = json.loads(request.body)
            name = data.get('name')
            token = data.get('token')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

        if not name or not token:
            return JsonResponse({'error': 'Both name and token are required'}, status=400)

        # Проверка токена через Telegram API
        response = requests.get(f'https://api.telegram.org/bot{token}/getMe')
        if response.status_code != 200:
            return JsonResponse({'error': 'Invalid token'}, status=400)

        api_key = hashlib.sha256(token.encode()).hexdigest()

        # Сохраняем бота в базе данных
        bot, created = TelegramBot.objects.get_or_create(
            name=name,
            defaults={'token': token, 'api_key': api_key}
        )

        if created:
            return JsonResponse({'message': 'Bot successfully registered.', 'api_key': api_key})
        else:
            return JsonResponse({'message': 'Bot already registered.','api_key': api_key})


class TelegramBotList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        telegrambot = TelegramBot.objects.all()
        serializer = TelegramBotSerializer(telegrambot, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
# class ProtectedEndpointView(View):
#     def get(self, request):
#         # Проверяем наличие токена в заголовке запроса
#         auth_header = request.headers.get('Authorization', '')
#         if not auth_header.startswith('Bearer '):
#             return JsonResponse({'error': 'Unauthorized'}, status=401)

#         token = auth_header.split(' ')[1]
#         try:
#             bot = TelegramBot.objects.get(bot_token=token, is_active=True)
#             return JsonResponse({'message': 'Access granted to the bot.'})
#         except TelegramBot.DoesNotExist:
#             return JsonResponse({'error': 'Unauthorized'}, status=401)
