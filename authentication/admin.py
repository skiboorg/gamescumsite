from django.contrib import admin

from authentication.models import *
from squads.models import SquadMembers


@admin.register(SteamUser)
class SteamUserAdmin(admin.ModelAdmin):
    list_filter = ('vip', 'outlaw', 'is_squad_leader', 'old_player', 'is_active')
    search_fields = ('steamid', 'discord_id', 'discord_nickname', 'personaname',)
    ordering = ('personaname',)
    list_display = ('personaname', 'steamid', 'vip', 'is_active', 'wallet', 'level', 'get_squad', 'rating',)

    def get_squad(self, obj):
        squad_member = SquadMembers.objects.get(player=obj)
        if squad_member:
            return squad_member.squad.name
        else:
            return False

    get_squad.short_description = 'Отряд'
    get_squad.admin_order_field = 'squad'


    def make_old_player(modeladmin, request, queryset):
        queryset.update(old_player=True)
    def make_bonus_pack(modeladmin, request, queryset):
        queryset.update(bonus_pack=True)
    def make_vip(modeladmin, request, queryset):
        queryset.update(vip=True)
    def make_not_vip(modeladmin, request, queryset):
        queryset.update(vip=False)

    def make_outlaw(modeladmin, request, queryset):
        queryset.update(outlaw=True)
    def make_not_outlaw(modeladmin, request, queryset):
        queryset.update(outlaw=False)

    make_old_player.short_description = "Отметить всех отмеченных старыми игроками"
    make_bonus_pack.short_description = "Отметить у всех отмеченных выдачу бонус пака"
    make_vip.short_description = "Отметить всех отмеченных ВИП игроками"
    make_not_vip.short_description = "Снять у всех отмеченных ВИП статус"
    make_outlaw.short_description = "Отметить всех отмеченных вне закона игроками"
    make_not_outlaw.short_description = "Снять у всех отмеченных статус вне закона"

    actions = [make_old_player, make_bonus_pack, make_not_outlaw, make_outlaw, make_not_vip, make_vip]

class LogAdmin(admin.ModelAdmin):
    search_fields = ('player_action', 'player__personaname',)
    class Meta:
        model = Logs

admin.site.register(PrivateMessages)
admin.site.register(Logs, LogAdmin)