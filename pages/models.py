from django.db import models
from authentication.models import SteamUser

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



class GameChat(models.Model):
    logTime = models.CharField(max_length=20, blank=True)
    oldLog = models.TextField(blank=False, null=True)


class KillLog(models.Model):
    LogTime = models.CharField(max_length=20, blank=True)
    oldLog = models.TextField(blank=False, null=True)

class LoginLog(models.Model):
    LogTime = models.CharField(max_length=20, blank=True)
    oldLog = models.TextField(blank=False, null=True)

class PlayersOnline(models.Model):
    player = models.ForeignKey(SteamUser, null=True, blank=True, on_delete=models.CASCADE)
    serverId = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)


class KillStat(models.Model):
    killerID = models.CharField(max_length=20, blank=True)
    killerNick = models.CharField(max_length=100, blank=True)
    victimID = models.CharField(max_length=20, blank=True)
    victimNick = models.CharField(max_length=100, blank=True)
    killerLocGameCoordX = models.CharField(max_length=255, blank=True)
    killerLocGameCoordY = models.CharField(max_length=255, blank=True)
    victimLocGameCoordX = models.CharField(max_length=255, blank=True)
    victimLocGameCoordY = models.CharField(max_length=255, blank=True)
    killerLocCoordX = models.CharField(max_length=255, blank=True)
    killerLocCoordY = models.CharField(max_length=255, blank=True)
    victimLocCoordX = models.CharField(max_length=255, blank=True)
    victimLocCoordY = models.CharField(max_length=255, blank=True)
    killerSector = models.CharField(max_length=5, blank=True)
    victimSector = models.CharField(max_length=5, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)

class WarZone(models.Model):
    zoneName = models.CharField('Название зоны', max_length=20, blank=True)
    zoneImage = models.ImageField('Картинка',upload_to='zone_images/', null=True, blank=True)
    zoneDescription = models.TextField('Описание', blank=True,null=True, default='')
    zoneX = models.CharField('Х', max_length=20, blank=True)
    zoneY = models.CharField('Y', max_length=20, blank=True)
    zoneR = models.CharField('Радиус', max_length=20, blank=True)
    repRewardAll = models.IntegerField('Награда репутация для всех', default=1)
    rcRewardAll = models.IntegerField('Награда RC для всех', default=50)
    repRewardTop1 = models.IntegerField('Награда репутация для ТОП1', default=100)
    rcRewardTop1 = models.IntegerField('Награда RC для ТОП1', default=5000)
    isActive = models.BooleanField('Не менять в ручную!', default=False)


    def __str__(self):
        return 'Зона : {}'.format(self.zoneName)


    class Meta:
        verbose_name = "Warzone"
        verbose_name_plural = "Warzone"
class WarZonePlayer(models.Model):
    zone = models.ForeignKey(WarZone, null=True, blank=True, on_delete=models.CASCADE)
    player = models.ForeignKey(SteamUser, null=True, blank=True, on_delete=models.CASCADE)
    playerKills = models.IntegerField(default=0)
    playerDeaths = models.IntegerField(default=0)



