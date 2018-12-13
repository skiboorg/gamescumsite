from django.forms import ModelForm

from .models import Squad
from django.utils.translation import ugettext_lazy as _


class CreateSquadForm(ModelForm):
     class Meta:
        model = Squad
        fields = (
            'name',
            'avatar',
            'info',
            'leader'
        )


class UpdateSquadForm(ModelForm):
    class Meta:
        model = Squad
        fields = ('name',
                  'avatar',
                  'info',
                  )
        # error_messages = {
        #     'email': {
        #         'unique': _("Указанный адрес уже кем-то используется"),
        #     },
        #     'discord_id': {
        #         'unique': _("Указанный Discord ID уже кем-то используется"),
        #     },
        #
        # }



