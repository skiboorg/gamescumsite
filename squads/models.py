from django.db import models

class Squad(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    # avatar = models.ImageField()

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = "Отряд"
        verbose_name_plural = "Отряды"

