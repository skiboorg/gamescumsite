from django.contrib.auth.forms import UserChangeForm
from .models import SteamUser
from django import forms


class EditProfileForm(UserChangeForm):

    class Meta:
        model = SteamUser
        fields = (
            'email',
            'discord_id'
        )
        exclude = ('password',)


