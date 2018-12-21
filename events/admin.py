from django.contrib import admin
from events.models import *


class PlayersInline (admin.TabularInline):
    model = EventPlayers
    extra = 0

class RewardInline (admin.TabularInline):
    model = EventReward
    extra = 0

class EventAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Event._meta.fields]

    inlines = [PlayersInline, RewardInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Event

admin.site.register(Event,EventAdmin)
admin.site.register(EventTemplates)
admin.site.register(EventPlayers)
admin.site.register(EventReward)
# Register your models here.
