from django.db import models

class SiteStat(models.Model):
    is_active = models.BooleanField(default=True)
    all_players = models.IntegerField(default=0)
    all_squads = models.IntegerField(default=0)
    all_kills = models.IntegerField(default=0)
    all_deaths = models.IntegerField(default=0)
    all_buys_summ = models.IntegerField(default=0)
    all_players_money = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Статистика сайта"
        verbose_name_plural = "Статистика сайта"

