from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from datetime import datetime, timedelta

from django.utils.translation import ugettext_lazy as _
from pytils.translit import slugify




class SteamUserManager(BaseUserManager):
    def _create_user(self, steamid, password, **extra_fields):
        """
        Creates and saves a User with the given steamid and password.
        """
        try:
            # python social auth provides an empty email param, which cannot be used here
            del extra_fields['email']
        except KeyError:
            pass
        if not steamid:
            raise ValueError('The given steamid must be set')
        user = self.model(steamid=steamid, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, steamid, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(steamid, password, **extra_fields)

    def create_superuser(self, steamid, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(steamid, password, **extra_fields)


class SteamUser(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'steamid'
    steamid = models.CharField(max_length=17, unique=True)
    discord_id = models.CharField(max_length=40, blank=True, null=True, unique=True, default=None)
    discord_nickname = models.CharField(max_length=40, blank=True, null=True, unique=True, default=None)

    personaname = models.CharField(max_length=255)
    nickname = models.SlugField(blank=True, null=True, default=None)
    profileurl = models.CharField(max_length=300)
    avatar = models.CharField(max_length=255)
    avatarmedium = models.CharField(max_length=255)
    avatarfull = models.CharField(max_length=255)
    rank = models.CharField(max_length=100, default='Новичек')
    info = models.TextField(default='Игрок не указал дополнительных сведений о себе.')
    wallet = models.IntegerField(default=0)
    rating = models.IntegerField(default=1)
    level = models.IntegerField(default=1)
    kills = models.IntegerField(default=0)
    deaths = models.IntegerField(default=0)
    total_buys_summ = models.IntegerField(default=0)
    total_buys_count = models.IntegerField(default=0)

    vip = models.BooleanField(default=False)
    outlaw = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_squad_leader = models.BooleanField(default=False)
    profile_open = models.BooleanField(default=True)
    is_banned = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    bonus_pack = models.BooleanField(default=False)
    last_zp = models.DateTimeField(default=datetime.now() + timedelta(days=1))
    date_joined = models.DateTimeField(_('date joined'), default=datetime.now())
    last_vizit = models.DateField(default=datetime.now().date())
    last_buy = models.DateField(default=datetime.now().date())
    buys_count = models.IntegerField(default=0)
    objects = SteamUserManager()

    def get_short_name(self):
        return self.personaname

    def get_full_name(self):
        return self.personaname

    def save(self, *args, **kwargs):
        self.nickname = slugify(self.personaname)
        super(SteamUser, self).save(*args, **kwargs)

    def __str__(self):
        return '%s' % self.nickname


class PrivateMessages(models.Model):
    to_player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    from_player_name = models.CharField(max_length=30, blank=False)
    from_player_name_slug = models.CharField(max_length=30, blank=True)
    from_player_avatar = models.CharField(max_length=255, blank=False)
    text = models.TextField(blank=False, default='')
    created = models.DateTimeField(auto_now_add=True)

class Logs(models.Model):
    player = models.ForeignKey(SteamUser, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    player_action = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Действие игрока %s' % self.player.personaname

    class Meta:
        verbose_name = "Действие игрока"
        verbose_name_plural = "Действия игроков"

