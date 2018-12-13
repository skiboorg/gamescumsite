from django.shortcuts import render
from django.http import HttpResponseRedirect
from squads.forms import *
from squads.models import *

def create_squad(request):
    if request.POST:

        if request.POST.get('update'):
            print('upadting')
            squad = Squad.objects.get(leader_id=request.user.id)
            print(squad)
            squad_form = UpdateSquadForm(request.POST, request.FILES, instance=squad)
            if squad_form.is_valid():
                squad_form.save()
                return HttpResponseRedirect('/profile/' + request.user.nickname)
        else:
            squad_form = CreateSquadForm(request.POST, request.FILES)
            if squad_form.is_valid():
                instance = Squad(avatar=request.FILES['avatar'])
                squad_form.save()
                return HttpResponseRedirect('/profile/' + request.user.nickname)

    return HttpResponseRedirect('/profile/' + request.user.nickname)