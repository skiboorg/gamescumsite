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


class ItemsInline (admin.TabularInline):
    model = ItemsInOrder
    extra = 0


class OredersAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
   # list_display = [field.name for field in Categories._meta.fields]
    inlines = [ItemsInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Orders

class BasketAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
    list_display = [field.name for field in Baskets._meta.fields]
    #inlines = [ItemsInline]
    # exclude = ['info'] #не отображать на сранице редактирования
    class Meta:
        model = Baskets

admin.site.register(Categories,CategoriesAdmin)
admin.site.register(Items)
admin.site.register(Orders,OredersAdmin)
admin.site.register(ItemsInOrder)
admin.site.register(Baskets,BasketAdmin)
# Register your models here.
