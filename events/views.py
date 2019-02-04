from django.shortcuts import render
from django.http import  HttpResponseRedirect
from .models import *


def events_home(request):
    player_in_events =[]
    page_title = 'СОБЫТИЯ СЕРВЕРА'
    all_events = Event.objects.all()
    all_players = EventPlayers.objects.all()
    for pl in all_players:
        if pl.player.id == request.user.id:
            player_in_events.append(pl.event.id)
    print(player_in_events)


    return render(request, 'events/index.html', locals())

def event_apply(request,event_id):
    try:
        check_event = Event.objects.get(id=event_id)
    except:
        check_event = None
    if check_event:
        try:
            check_user = EventPlayers.objects.get(player_id=request.user.id,event_id=event_id)
        except:
            check_user = None
        if not check_user:
            EventPlayers.objects.create(event_id=event_id, player_id=request.user.id,spawn_command='#teleport {}'.format(request.user.steamid))
    page_title = 'СОБЫТИЯ СЕРВЕРА'
    all_events = Event.objects.all()
    all_players = EventPlayers.objects.all()
    return HttpResponseRedirect('/events/')


def event_leave(request,event_id):
    try:
        check_event = Event.objects.get(id=event_id)
    except:
        check_event = None
    if check_event:
        try:
            EventPlayers.objects.get(event_id=event_id, player_id=request.user.id).delete()
        except:
            pass
    page_title = 'СОБЫТИЯ СЕРВЕРА'
    all_events = Event.objects.all()
    all_players = EventPlayers.objects.all()
    return HttpResponseRedirect('/events/')