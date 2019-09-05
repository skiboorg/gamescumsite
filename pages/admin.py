from django.contrib import admin
from pages.models import *

class WarZoneAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    #list_display = ['zoneName']


    exclude = ['isActive'] #не отображать на сранице редактирования
    class Meta:
        model = WarZone

admin.site.register(SiteStat)
admin.site.register(WarZone,WarZoneAdmin)
# Register your models here.
