from django.db import models
from django.db.models.signals import post_save, post_delete
from authentication.models import SteamUser
from pytils.translit import slugify


class Categories(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    name_slug = models.SlugField(max_length=255, blank=True, null=True)
    info = models.CharField(max_length=255, blank=False, null=True)
    active = models.BooleanField(default=True)
    views = models.IntegerField(default=0)
    discount = models.IntegerField(default=0)
    for_vip = models.BooleanField(default=False)
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


class Items(models.Model):
    category = models.ForeignKey(Categories, blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=False, null=True)
    item_spawn_name = models.CharField(max_length=30, blank=True, null=True)
    info = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='shop/', null=True, blank=True)
    active = models.BooleanField(default=True)
    price = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    buys = models.IntegerField(default=0)
    for_vip = models.BooleanField(default=False)
    discount = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def discount_value(self):
        if self.discount > 0:
            dis_val = self.price - (self.price * self.discount / 100)
        else:
            dis_val = 0
        return (dis_val)

    def __str__(self):
        return '%s ' % self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class Orders(models.Model):
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    total_price = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True, default=0)
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Заказ : %s. Статус: %s ' % (self.id, self.is_complete)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"



class ItemsInOrder(models.Model):
    order = models.ForeignKey(Orders, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    item = models.ForeignKey(Items, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    number = models.IntegerField(blank=True, null=True, default=0)
    current_price = models.DecimalField(max_digits=6, decimal_places=3, blank=True, null=True, default=0)
    total_price = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.item.discount > 0:
            self.current_price = float(self.item.price - (self.item.price * self.item.discount / 100))
        elif self.order.player.vip:
            self.current_price = float(self.item.price - (self.item.price * 50 / 100))
        else:
            self.current_price = float(self.item.price)
        self.total_price = float(self.number) * self.current_price

        super(ItemsInOrder, self).save(*args, **kwargs)


    def __str__(self):
        return 'Товар : %s . В заказе от игрока ID %s .' % (self.item.name, self.order.player.steamid)

    class Meta:
        verbose_name = "Товар в заказе"
        verbose_name_plural = "Товары в заказах"

class Baskets(models.Model):
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    order = models.ForeignKey(Orders, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    item = models.ForeignKey(Items, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    number = models.IntegerField(blank=True, null=True, default=0)
    current_price = models.DecimalField(max_digits=6, decimal_places=3, blank=True, null=True, default=0)
    total_price = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Товар в корзине"
        verbose_name_plural = "Товары в корзинах"

    def save(self, *args, **kwargs):
        if self.item.discount > 0:
            self.current_price = float(self.item.price - (self.item.price * self.item.discount / 100))
        elif self.player.vip:
            self.current_price = float(self.item.price - (self.item.price * 50 / 100))
        else:
            self.current_price = float(self.item.price)
        self.total_price = float(self.number) * self.current_price

        super(Baskets, self).save(*args, **kwargs)


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





