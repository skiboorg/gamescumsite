from django.contrib import admin
from authentication.models import SteamUser
from .models import Event


# class PlayersInline (admin.TabularInline):
#     model = SteamUser
#     extra = 0


class EventAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Event._meta.fields]
    #inlines = [PlayersInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Event




admin.site.register(Event,EventAdmin)
# Register your models here.
