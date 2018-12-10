from django.db import models
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

    def __str__(self):
        return '%s ' % self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"



