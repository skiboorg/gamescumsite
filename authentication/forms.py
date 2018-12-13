from django.contrib.auth.forms import UserChangeForm
from .models import SteamUser
from django.utils.translation import ugettext_lazy as _


class EditProfileForm(UserChangeForm):
     class Meta:
        model = SteamUser
        fields = (
            'email',
            'discord_id',
            'info'
        )
        error_messages = {
            'email': {
                'unique': _("Указанный адрес уже кем-то используется"),
            },
            'discord_id': {
                'unique': _("Указанный Discord ID уже кем-то используется"),
            },

        }



