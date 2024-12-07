# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # path('api/v1/protected-endpoint/', views.ProtectedEndpointView.as_view(), name='protected-endpoint'),
    path('api/v1/register-bot/', views.RegisterBotView.as_view(), name='register-bot'),
    path('api/v1/botlist/', views.TelegramBotList.as_view(), name='list-bot')
]
