from django.contrib import admin
from authentication.models import SteamUser
from .models import Squad


class SquadInline (admin.TabularInline):
    model = SteamUser
    extra = 0


class SquadAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Squad._meta.fields]
    inlines = [SquadInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Squad




admin.site.register(Squad,SquadAdmin)
