from django.contrib import admin
from .models import *


class CategoriesInline (admin.TabularInline):
    model = Items
    extra = 0


class CategoriesAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Categories._meta.fields]
    inlines = [CategoriesInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Categories




admin.site.register(Categories,CategoriesAdmin)
admin.site.register(Items)
# Register your models here.
