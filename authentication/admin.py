from django.contrib import admin

from authentication.models import *


@admin.register(SteamUser)
class SteamUserAdmin(admin.ModelAdmin):
    list_filter = ('vip', 'outlaw', 'is_squad_leader')
    search_fields = ('steamid', 'discord_id', 'discord_nickname', 'personaname',)
    ordering = ('personaname',)

class LogAdmin(admin.ModelAdmin):
    search_fields = ('player_action', 'player__personaname',)
    class Meta:
        model = Logs

admin.site.register(PrivateMessages)
admin.site.register(Logs, LogAdmin)