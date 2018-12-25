from django.db import models
from pytils.translit import slugify
from datetime import datetime
from authentication.models import SteamUser
from django.db.models.signals import post_save, post_delete


class SquadWear(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    spawn_info = models.TextField(default='Тут можно указать команды спавна')
    for_vip = models.BooleanField(default=False)

    def __str__(self):
        return 'Форма : %s' % self.name

    class Meta:
        verbose_name = "Форма"
        verbose_name_plural = "Формы"



class Squad(models.Model):
    leader = models.ForeignKey(SteamUser, blank=False, null=True, default=None, on_delete=models.SET_NULL)
    wear = models.ForeignKey(SquadWear, blank=False, null=True, default=None, on_delete=models.SET_NULL)
    name = models.CharField(max_length=50, blank=False, null=False, unique=True)
    name_slug = models.SlugField(max_length=50, blank=True, null=False, unique=True)
    avatar = models.ImageField(upload_to='squad_avatars/', null=True, blank=True)
    balance = models.IntegerField(default=0, blank=True)
    level = models.IntegerField(default=1, blank=True)
    rating = models.IntegerField(default=1, blank=True)
    info = models.TextField(default='Дополнительных сведений об отряде не предоставлено.')
    battles_wins = models.IntegerField(default=0, blank=True)
    battles_loose = models.IntegerField(default=0, blank=True)
    vip = models.BooleanField(default=False)
    recruting = models.BooleanField(default=True)
    created = models.DateTimeField(default=datetime.now())

    @property
    def get_members(self):
        squad_members = SquadMembers.objects.filter(squad=self.id)
        return (squad_members)

    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)

        super(Squad, self).save(*args, **kwargs)

    def __str__(self):
        return 'Отряд : %s ' % self.name

    class Meta:
        verbose_name = "Отряд"
        verbose_name_plural = "Отряды"


class SquadRequests(models.Model):
    squad = models.ForeignKey(Squad, blank=True,null=True, default=None, on_delete=models.CASCADE)
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.CASCADE)
    created = models.DateTimeField(default=datetime.now())



    def __str__(self):
        return 'Заявка в отряд : %s от игрока %s' % (self.squad.name, self.player.personaname)

    class Meta:
        verbose_name = "Заявка в отряд"
        verbose_name_plural = "Заявки в отряды"


class SquadMembers(models.Model):
    squad = models.ForeignKey(Squad, blank=True, null=True, default=None, on_delete=models.CASCADE)
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.CASCADE)
    income = models.IntegerField(default=0, blank=True)


    def __str__(self):
        return 'Участник отряда : %s' % self.squad.name

    class Meta:
        verbose_name = "Участник отряда"
        verbose_name_plural = "Участник отряда"


class SquadSectors(models.Model):
    squad = models.ForeignKey(Squad, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    name = models.CharField(max_length=5, blank=False, null=False)
    income = models.IntegerField(default=0, blank=False)
    price = models.IntegerField(default=0, blank=False)
    own = models.DateTimeField(default=datetime.now())
    last_pay = models.DateTimeField(default=datetime.now())

    def __str__(self):
        if self.squad:
            return 'Сектор : %s. Принадлежит %s' % (self.name,self.squad.name)
        else:
            return 'Сектор : %s' % self.name

    class Meta:
        verbose_name = "Сектор"
        verbose_name_plural = "Сектора"

class SectorWars(models.Model):
    sector = models.ForeignKey(SquadSectors, blank=False, null=True, on_delete=models.CASCADE)
    enemy = models.ForeignKey(Squad, blank=False, null=True, on_delete=models.CASCADE)
    war_date = models.DateTimeField(blank=False, null=True,default=None)
    owner_notify = models.BooleanField(default=False)
    owner_agreed = models.BooleanField(default=False)
    owner_denied = models.BooleanField(default=False)
    for_bot_enemy_squad_name = models.CharField(max_length=50, blank=True)
    for_bot_sector_name = models.CharField(max_length=50, blank=True)
    for_bot_owner_name = models.CharField(max_length=50, blank=True)
    def __str__(self):
        return 'Оспаривание сектора : %s' % self.sector.name

    class Meta:
        verbose_name = "Война за сектор"
        verbose_name_plural = "Война за секторы"

def squad_post_save(sender, instance, **kwargs):
    try:
        SquadMembers.objects.get(player_id=instance.leader.id)
    except:
        SquadMembers.objects.create(squad_id=instance.id, player_id=instance.leader.id)
        instance.leader.is_squad_leader = True
        instance.leader.rank = 'Глава отряда ' + str(instance.name)
        instance.leader.save(force_update=True)


post_save.connect(squad_post_save, sender=Squad)