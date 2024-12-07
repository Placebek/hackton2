from django.contrib import admin
from . import models
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    model = models.CustomUser

    readonly_fields = ()
    list_display = (
        "username",
        "password",
    )

    ordering = ("-id",)

admin.site.register(models.CustomUser, UserAdmin)




