from django.db import models

class SiteStat(models.Model):
    is_active = models.BooleanField(default=True)
    all_players = models.IntegerField(default=0)
    all_squads = models.IntegerField(default=0)
    all_kills = models.IntegerField(default=0)
    all_deaths = models.IntegerField(default=0)
    all_buys_summ = models.IntegerField(default=0)
    all_players_money = models.IntegerField(default=0)
    option1 = models.IntegerField('Количество марионеток', default=0)
    option2 = models.IntegerField('Количество роботов', default=0)
    option3 = models.IntegerField('Количество транспорта', default=0)
    option4 = models.IntegerField('Количество айрдропов', default=0)
    option5 = models.IntegerField('Усиление марионеток', default=0)
    option6 = models.IntegerField('Усилиние роботов', default=0)
    option7 = models.IntegerField('Усилиние самодельного оружия', default=0)
    option8 = models.IntegerField('Усиление огнестрельного оружия', default=0)

    class Meta:
        verbose_name = "Статистика сайта"
        verbose_name_plural = "Статистика сайта"

