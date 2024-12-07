"""
URL configuration for sploitus project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="CHECK TO THE DOMAIN",
        default_version='v1',
        description="DESCRIPTION",
        terms_of_service="https://www.check_to_the_domain.com/terms/",
        contact=openapi.Contact(email="ermekulysaken8@gmail.com"),
        license=openapi.License(name="The license is only for my colleges"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('check/', include('apps.vulnerability_check.urls')),
    path('auths/', include('apps.auths.urls')),
    path('auths_bots/', include('apps.auths_bots.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),name='swagger-schema'),
]
