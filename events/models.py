from django.db import models
from authentication.models import SteamUser

class PoliceStat(models.Model):
    obez = models.IntegerField('Обезврежено', default=0)
    victim = models.IntegerField('Жертвы', default=0)
    izyato = models.IntegerField('Изъято', default=0)

    class Meta:
        verbose_name = "Полицейская стата"
        verbose_name_plural = "Полицейская стата"

class EventTemplates(models.Model):
    name = models.CharField(max_length=50, blank=False, null=True, default='')
    image = models.ImageField(upload_to='events/', null=True, blank=False,default=None)
    info = models.TextField(default='')


    def __str__(self):
        return 'Шаблон мероприятия : %s' % self.name

    class Meta:
        verbose_name = "Шаблон мероприятия"
        verbose_name_plural = "Шаблоны мероприятий"

class Event(models.Model):
    template = models.ForeignKey(EventTemplates,blank=False,null=True,default=None, on_delete=models.CASCADE)
    date = models.DateTimeField(blank=False,null=True,default=None)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return 'Мероприятие : %s, дата проведения %s' % (self.template.name, self.date)

    class Meta:
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    def save(self, *args, **kwargs):
        all_players = self.eventplayers_set.all()

        if all_players:
            for player in all_players:
                if player.is_present:

                    player.player.rating += 1
                    player.player.save(force_update=True)
        super(Event, self).save(*args, **kwargs)

class EventPlayers(models.Model):
    event = models.ForeignKey(Event, blank=False,null=True,default=None, on_delete=models.CASCADE)
    player = models.ForeignKey(SteamUser, blank=False, null=True, default=None, on_delete=models.CASCADE)
    spawn_command = models.CharField(max_length=100, blank=True, null=True, default='')
    is_present = models.BooleanField('Был на событии?', default=False)

    def __str__(self):
        return 'Участник : %s, мероприятия %s' % (self.player.personaname, self.event.template.name)

    class Meta:
        verbose_name = "Участник мероприятия"
        verbose_name_plural = "Участники мероприятии"


class EventReward(models.Model):
    event = models.ForeignKey(Event, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    reward_name = models.CharField(max_length=100, blank=False, default='')
    reward_number = models.IntegerField(default=1)
    reward_image = models.ImageField(upload_to='events/', null=True, blank=False, default=None)
    spawn_command = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return 'Награда за мероприятие %s' % self.reward_name

    class Meta:
        verbose_name = "Награда за мероприятие"
        verbose_name_plural = "Награды за мероприятия"