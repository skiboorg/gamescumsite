from django.contrib import admin
from authentication.models import SteamUser
from events.models import *


class PlayersInline (admin.TabularInline):
    model = EventPlayers
    extra = 0


class EventAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Event._meta.fields]
    inlines = [PlayersInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Event




admin.site.register(Event,EventAdmin)
admin.site.register(EventTemplates)
admin.site.register(EventPlayers)
# Register your models here.
