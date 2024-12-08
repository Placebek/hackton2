from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer 

    @swagger_auto_schema(
        operation_description="Регистрация нового пользователя.",
        request_body=UserRegistrationSerializer,
        responses={
            201: openapi.Response(
                description="Пользователь успешно зарегистрирован.",
                examples={
                    "application/json": {
                        "message": "Пользователь успешно зарегистрирован!"
                    }
                }
            ),
            400: openapi.Response(
                description="Ошибка валидации.",
                examples={
                    "application/json": {
                        "username": ["Это поле обязательно."],
                        "password": ["Пароль слишком короткий."]
                    }
                }
            )
        },
    )

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Пользователь успешно зарегистрирован!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(APIView):

    @swagger_auto_schema(
        operation_description="Аутентификация пользователя и выдача JWT-токенов.",
        request_body=UserLoginSerializer,
        responses={
            200: openapi.Response(
                description="Успешный вход пользователя.",
                examples={
                    "application/json": {
                        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                }
            ),
            400: openapi.Response(
                description="Ошибка аутентификации.",
                examples={
                    "application/json": {
                        "non_field_errors": ["Неверные учетные данные."]
                    }
                }
            )
        },
    )

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

