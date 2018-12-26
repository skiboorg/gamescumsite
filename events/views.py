from django.shortcuts import render
from .models import *


def events_home(request):
    page_title = 'СОБЫТИЯ СЕРВЕРА'
    all_events = Event.objects.all()
    all_players = EventPlayers.objects.all()


    return render(request, 'events/index.html', locals())
