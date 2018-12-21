from django.contrib import admin

from authentication.models import *


@admin.register(SteamUser)
class SteamUserAdmin(admin.ModelAdmin):
    list_filter = ('vip', 'outlaw','is_squad_leader')


admin.site.register(PrivateMessages)