from django.contrib import admin

from authentication.models import *


@admin.register(SteamUser)
class SteamUserAdmin(admin.ModelAdmin):
    pass
admin.site.register(PrivateMessages)