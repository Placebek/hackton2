from django.contrib import admin
from . import models
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    model = models.User

    readonly_fields = ()
    list_display = (
        "username",
        "password",
    )

    ordering = ("-id",)

admin.site.register(models.User, UserAdmin)




