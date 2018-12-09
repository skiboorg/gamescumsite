from django.db import models
from pytils.translit import slugify
from django.utils import timezone




class Squad(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    name_slug = models.SlugField(max_length=50, blank=True, null=False, unique=True)
    avatar = models.ImageField(upload_to='squad_avatars/', null=True, blank=True)
    info = models.TextField(default='Дополнительных сведений об отряде не предоставлено.')
    created = models.DateTimeField(default=timezone.now)
    rating = models.DecimalField(max_digits=4, decimal_places=3, blank=False, null=False, default=1)


    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        super(Squad, self).save(*args, **kwargs)

    def __str__(self):
        return 'Отряд : %s ' % self.name

    class Meta:
        verbose_name = "Отряд"
        verbose_name_plural = "Отряды"

