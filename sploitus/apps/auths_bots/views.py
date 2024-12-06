from django.http import JsonResponse
from django.views import View
from django.conf import settings
from .models import TelegramBot  # Модель, где хранятся токены ботов
import requests
import json
from django.views.decorators.csrf import csrf_exempt


class RegisterBotView(View):
    @csrf_exempt
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

        # Проверка валидности токена через Telegram API
        response = requests.get(f'https://api.telegram.org/bot{token}/getMe')
        if response.status_code != 200:
            return JsonResponse({'error': 'Invalid token'}, status=400)

        bot_data = response.json()
        bot_id = bot_data.get('result', {}).get('id')  # Используем ID бота
        bot_username = bot_data.get('result', {}).get('username', name)  # Используем username если доступно

        # Сохраняем бота в базе данных
        bot, created = TelegramBot.objects.get_or_create(
            bot_id=bot_id,
            defaults={'bot_token': token, 'bot_name': bot_username}
        )

        if created:
            return JsonResponse({'message': 'Bot successfully registered.'})
        else:
            return JsonResponse({'message': 'Bot already registered.'})


class ProtectedEndpointView(View):
    @csrf_exempt
    def get(self, request):
        # Проверяем наличие токена в заголовке запроса
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        token = auth_header.split(' ')[1]
        try:
            bot = TelegramBot.objects.get(bot_token=token, is_active=True)
            return JsonResponse({'message': 'Access granted to the bot.'})
        except TelegramBot.DoesNotExist:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
