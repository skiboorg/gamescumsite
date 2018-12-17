from django.contrib import admin
from authentication.models import SteamUser
from .models import *


class SquadMembersInline (admin.TabularInline):
    model = SquadMembers
    extra = 0

class SquadSectorsInline (admin.TabularInline):
    model = SquadSectors
    extra = 0

class SquadRequestsInline (admin.TabularInline):
    model = SquadRequests
    extra = 0



class SquadAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Squad._meta.fields]
    inlines = [SquadMembersInline,SquadRequestsInline,SquadSectorsInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Squad




admin.site.register(Squad,SquadAdmin)
admin.site.register(SquadMembers)
admin.site.register(SquadRequests)
admin.site.register(SquadWear)
admin.site.register(SquadSectors)
admin.site.register(SectorWars)