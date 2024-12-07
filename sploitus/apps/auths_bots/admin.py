from django.contrib import admin
from . import models

# Register your models here.
class TelegramBotAdmin(admin.ModelAdmin):
    model = models.TelegramBot

    readonly_fields = ()
    list_display = (
        "name",  
        "token",    
        "is_active", 
        "created_at", 
    )

    ordering = ("-id",)

admin.site.register(models.TelegramBot, TelegramBotAdmin)