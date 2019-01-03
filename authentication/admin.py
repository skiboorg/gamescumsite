from django.contrib import admin

from authentication.models import *


@admin.register(SteamUser)
class SteamUserAdmin(admin.ModelAdmin):
    list_filter = ('vip', 'outlaw', 'is_squad_leader')
    search_fields = ('steamid', 'discord_id', 'discord_nickname', 'personaname',)
    ordering = ('personaname',)


admin.site.register(PrivateMessages)
admin.site.register(Logs)