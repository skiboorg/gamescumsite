from django.db import models
from django.db.models.signals import post_save, post_delete
from authentication.models import SteamUser
from pytils.translit import slugify
from squads.models import SquadSectors
from django.utils.safestring import mark_safe

class Categories(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    for_sector = models.ForeignKey(SquadSectors,blank=True,null=True,default=None, on_delete=models.SET_NULL)
    name_slug = models.SlugField(max_length=255, blank=True, null=True)
    active = models.BooleanField(default=True)
    discount = models.IntegerField(default=0)
    for_squad = models.BooleanField(default=False)
    level = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        super(Categories, self).save(*args, **kwargs)

    def __str__(self):
        return 'Категория : %s ' % self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Set(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    name_slug = models.SlugField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='set/', null=True, blank=False)
    description = models.TextField(blank=True, null=True, default='')
    # spawn_commands = models.TextField(blank=True, null=True, default='')
    price = models.IntegerField(default=0, blank=True)
    discount = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    active = models.BooleanField(default=True)
    for_vip = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        new_price = 0
        for item in self.items_set.all():
            new_price += item.price
        for subitem in self.subitem_set.all():
            new_price += subitem.price
        self.price = new_price
        super(Set, self).save(*args, **kwargs)

    @property
    def discount_value(self):
        if self.discount > 0:
            dis_val = self.price - (self.price * self.discount / 100)
        else:
            dis_val = 0
        return (dis_val)

    # todo добавить расчет скидки для старых игроков
    @property
    def discount_vip_value(self):
        dis_vip_val = self.price - (self.price * 30 / 100)
        return (dis_vip_val)


    def __str__(self):
        return 'Сет : %s ' % self.name

    class Meta:
        verbose_name = "Сет"
        verbose_name_plural = "Сеты"

# class SetImage(models.Model):
#     set = models.ForeignKey(Set, blank=True, null=True, on_delete=models.SET_NULL)
#     image = models.ImageField(upload_to='set_images/',  blank=False)
#     description = models.CharField(max_length=255, blank=False, null=True)
#
#     def __str__(self):
#         try:
#             return 'Часть сета: %s ' % self.set.name
#         except:
#             return 'Часть сета без привязки к сету '
#
#
#     class Meta:
#         verbose_name = "Часть сета"
#         verbose_name_plural = "Части сетов"



class Items(models.Model):
    category = models.ForeignKey(Categories, blank=False, null=True, on_delete=models.CASCADE)
    set = models.ManyToManyField(Set,blank=True, null=True, verbose_name='В составе сета')
    name = models.CharField(max_length=255, blank=False, null=True)
    name_slug = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    name_lower = models.CharField(max_length=255, blank=True, null=True, default='')
    item_spawn_name = models.CharField(max_length=255, blank=False, null=True)
    image = models.ImageField(upload_to='shop/', null=True, blank=False)
    description = models.TextField(blank=True, null=True, default='')
    active = models.BooleanField(default=True)
    price = models.IntegerField(default=0)
    buys = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    for_vip = models.BooleanField(default=False)
    discount = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        self.name_lower = self.name.lower()
        super(Items, self).save(*args, **kwargs)

    def image_tag(self):
        # used in the admin site model as a "thumbnail"
        return mark_safe('<img src="{}" width="100" height="100" />'.format(self.image.url))


    image_tag.short_description = 'Картинка'

    @property
    def discount_value(self):
        if self.discount > 0:
            dis_val = self.price - (self.price * self.discount / 100)
        else:
            dis_val = 0
        return (dis_val)

    #todo добавить расчет скидки для старых игроков
    @property
    def discount_vip_value(self):
        dis_vip_val = self.price - (self.price * 30 / 100)
        return (dis_vip_val)

    def __str__(self):
        return '%s . Уровень товара : %s' % (self.name, self.level)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class SubItem(models.Model):
    item = models.ForeignKey(Items, blank=True, null=True, on_delete=models.SET_NULL)
    set = models.ManyToManyField(Set, blank=True, null=True, verbose_name='В составе сета')
    color_name = models.CharField(max_length=255, blank=False)
    item_spawn_name = models.CharField(max_length=255, blank=False, null=True)
    description = models.TextField(blank=True, null=True, default='')
    image = models.ImageField(upload_to='shop/', null=True, blank=False)
    active = models.BooleanField(default=True)
    price = models.IntegerField(default=0)
    buys = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    discount = models.IntegerField(default=0)
    for_vip = models.BooleanField(default=False)



    @property
    def discount_value(self):
        if self.discount > 0:
            dis_val = self.price - (self.price * self.discount / 100)
        else:
            dis_val = 0
        return (dis_val)

    # todo добавить расчет скидки для старых игроков
    @property
    def discount_vip_value(self):
        dis_vip_val = self.price - (self.price * 30 / 100)
        return (dis_vip_val)

    def __str__(self):
        try:
            return 'Вариант %s для товара : %s' % (self.color_name, self.item.name)
        except:
            return 'Вариант %s без привязки к товару' % (self.color_name)

    class Meta:
        verbose_name = "Вариант товара"
        verbose_name_plural = "Варианты товаров"


class Orders(models.Model):
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    server = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    spawn_text = models.TextField(default='')

    def __str__(self):
        return 'Заказ № %s игрока %s . Статус: %s ' % (self.id, self.player.personaname, self.is_complete)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"



class ItemsInOrder(models.Model):
    order = models.ForeignKey(Orders, blank=False, null=True, default=None, on_delete=models.SET_NULL)
    item = models.ForeignKey(Items, blank=False, null=True, default=None, on_delete=models.SET_NULL)
    subitem = models.ForeignKey(SubItem, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    number = models.IntegerField(blank=False, null=True, default=0)
    current_price = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def save(self, *args, **kwargs):
    #     if self.subitem:
    #         if self.subitem.discount > 0:
    #             self.current_price = self.subitem.price - (self.subitem.price * self.subitem.discount / 100)
    #         elif self.order.player.vip:
    #             self.current_price = self.subitem.price - (self.subitem.price * 30 / 100)
    #         else:
    #             self.current_price = self.subitem.price
    #         self.total_price = self.number * self.current_price
    #
    #     else:
    #         if self.item.discount > 0:
    #             self.current_price = self.item.price - (self.item.price * self.item.discount / 100)
    #         elif self.order.player.vip:
    #             self.current_price = self.item.price - (self.item.price * 30 / 100)
    #         else:
    #             self.current_price = self.item.price
    #         self.total_price = self.number * self.current_price
    #
    #     super(ItemsInOrder, self).save(*args, **kwargs)


    def __str__(self):
        return 'Товар : %s . В заказе от игрока ID %s .' % (self.item.name, self.order.player.steamid)

    class Meta:
        verbose_name = "Товар в заказе"
        verbose_name_plural = "Товары в заказах"


class Baskets(models.Model):
    player = models.ForeignKey(SteamUser, blank=False, null=True, default=None, on_delete=models.SET_NULL)
    item = models.ForeignKey(Items, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    subitem = models.ForeignKey(SubItem, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    number = models.IntegerField(blank=False, null=True, default=0)
    current_price = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Товар в корзине"
        verbose_name_plural = "Товары в корзинах"

    def save(self, *args, **kwargs):
        if self.subitem:
            if self.subitem.discount > 0:
                if self.player.vip:
                    self.current_price = self.subitem.price - (self.subitem.price * 30 / 100)
                else:
                    self.current_price = self.subitem.price - (self.subitem.price * self.subitem.discount / 100)
            else:
                if self.player.vip:
                    self.current_price = self.subitem.price - (self.subitem.price * 30 / 100)
                else:
                    self.current_price = self.subitem.price
            self.total_price = self.number * self.current_price
        else:
            if self.item.discount > 0:
                if self.player.vip:
                    self.current_price = self.item.price - (self.item.price * 30 / 100)
                else:
                    self.current_price = self.item.price - (self.item.price * self.item.discount / 100)
            else:
                if self.player.vip:
                    self.current_price = self.item.price - (self.item.price * 30 / 100)
                else:
                    self.current_price = self.item.price
            self.total_price = self.number * self.current_price

        super(Baskets, self).save(*args, **kwargs)

class FavoriteItems(models.Model):
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, blank=True, null=True, default=None, on_delete=models.CASCADE)
    subitem = models.ForeignKey(SubItem, blank=True, null=True, default=None, on_delete=models.SET_NULL)

    def __str__(self):
        if self.subitem:
            return 'Товар %s (вариант %s) в избранном у игрока  %s' % (self.subitem.item.name,
                                                                       self.subitem.color_name,
                                                                       self.player.personaname)
        else:
            return 'Товар %s  в избранном у игрока  %s' % (self.item.name, self.player.personaname)

    class Meta:
        verbose_name = "Избранный товар"
        verbose_name_plural = "Избранные товары"


def ItemsInOrder_post_save(sender,instance,**kwargs):
    order = instance.order
    order_total_price = 0
    all_items_in_order = ItemsInOrder.objects.filter(order=order)
    for item in all_items_in_order:
        order_total_price += item.total_price
    instance.order.total_price = order_total_price
    instance.order.save(force_update=True)
    
def apply_discount(sender,instance,**kwargs):
    cat_id = instance.id
    all_items = Items.objects.filter(category=cat_id)
    for item in all_items:
        item.discount = instance.discount
        item.save(force_update=True)
        






post_delete.connect(ItemsInOrder_post_save, sender=ItemsInOrder)
post_save.connect(ItemsInOrder_post_save, sender=ItemsInOrder)
post_save.connect(apply_discount, sender=Categories)





