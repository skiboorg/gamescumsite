from django.contrib import admin
from .models import *


class CategoriesInline (admin.TabularInline):
    model = Items
    readonly_fields = ('image_tag',)
    extra = 0


class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['name','discount']
    # list_display = [field.name for field in Categories._meta.fields]
    inlines = [CategoriesInline]
    exclude = ['name_slug','created_at','updated_at'] #не отображать на сранице редактирования
    class Meta:
        model = Categories


class ItemsInlineSet (admin.TabularInline):
    model = Items.set.through

    extra = 0

class SubtemsInlineSet (admin.TabularInline):
    model = SubItem.set.through
    extra = 0

class ItemsInline (admin.TabularInline):
    model = ItemsInOrder
    extra = 0


class OredersAdmin(admin.ModelAdmin):
    # list_display = ['name','discount']
   # list_display = [field.name for field in Categories._meta.fields]
    list_filter = ('is_complete',)
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

class SetAdmin(admin.ModelAdmin):
    exclude = ['name_slug',]
    inlines = [ItemsInlineSet,SubtemsInlineSet]
    class Meta:
        model = Set

admin.site.register(Categories,CategoriesAdmin)
admin.site.register(SubItem)
admin.site.register(Items)
admin.site.register(Orders,OredersAdmin)
admin.site.register(ItemsInOrder)
admin.site.register(Baskets,BasketAdmin)
admin.site.register(Set,SetAdmin)
# admin.site.register(SetImage)
admin.site.register(FavoriteItems)
# Register your models here.
