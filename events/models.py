from django.db import models
from authentication.models import SteamUser



class EventTemplates(models.Model):
    name = models.CharField(max_length=50, blank=False, null=True, default='')
    image = models.ImageField(upload_to='events/', null=True, blank=False,default=None)
    info = models.TextField(default='')
    reward = models.TextField(default='')

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

class EventPlayers(models.Model):
    event = models.ForeignKey(Event,blank=False,null=True,default=None, on_delete=models.CASCADE)
    player = models.ForeignKey(SteamUser, blank=False, null=True, default=None, on_delete=models.CASCADE)
    spawn_command = models.CharField(max_length=100, blank=True, null=True, default='')

    def __str__(self):
        return 'Участник : %s, мероприятия %s' % (self.player.personaname, self.event.template.name)

    class Meta:
        verbose_name = "Участник мероприятия"
        verbose_name_plural = "Участники мероприятии"

