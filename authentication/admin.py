from django.contrib import admin

from authentication.models import *


@admin.register(SteamUser)
class SteamUserAdmin(admin.ModelAdmin):
    list_filter = ('vip', 'outlaw', 'is_squad_leader', 'old_player', 'is_active')
    search_fields = ('steamid', 'discord_id', 'discord_nickname', 'personaname',)
    ordering = ('personaname',)
    list_display = ('personaname', 'steamid', 'vip', 'is_active', 'wallet', 'level', 'rating',)

class LogAdmin(admin.ModelAdmin):
    search_fields = ('player_action', 'player__personaname',)
    class Meta:
        model = Logs

admin.site.register(PrivateMessages)
admin.site.register(Logs, LogAdmin)