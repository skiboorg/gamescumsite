from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from squads.forms import *
from squads.models import *
from authentication.models import *

def create_squad(request):
    if request.POST:

        if request.POST.get('update'):
            print('upadting')
            squad = Squad.objects.get(leader_id=request.user.id)
            print(request.POST)
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


def buy_sector(request):
    if request.POST:
        print(request.POST)
        return HttpResponseRedirect('/profile/' + request.user.nickname)


def add_to_balance(request):
    print(request.POST)
    if request.POST:
        player = request.user
        squad = Squad.objects.get(id=request.POST.get('squad_id'))
        squad_member = SquadMembers.objects.get(player=player.id)
        squad_member.income += int(request.POST.get('rc_amount'))
        squad_member.save(force_update=True)
        player.wallet -= int(request.POST.get('rc_amount'))
        player.rating += 1
        player.save(force_update=True)
        squad.balance += int(request.POST.get('rc_amount'))
        squad.save(force_update=True)

        print(request.POST)
        return HttpResponseRedirect('/profile/' + request.user.nickname)

def show_squads(request):
    squad_active = 'active'
    squads = Squad.objects.all()
    player = request.user
    squad_requests = SquadRequests.objects.filter(player=player)

    return render(request, 'squads/index.html', locals())

def join_request(request,name_slug):
    try:
        squad = Squad.objects.get(name_slug=name_slug)
        new_request = SquadRequests.objects.create(squad_id=squad.id, player_id=request.user.id)
        new_request.save()
        new_message = PrivateMessages.objects.create(to_player_id=squad.leader.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.personaname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Привет, хочу вступить в твой отряд!')
        new_message.save()
        return HttpResponseRedirect('/squad/')
    except:
        return HttpResponseRedirect('/squad/')

def confirm_request(request):
    req_user = SteamUser.objects.get(nickname=request.GET.get('name'))
    req_squad = SquadMembers.objects.create(squad_id=int(request.GET.get('squad')), player_id=req_user.id)
    req_squad.save()
    player_req = SquadRequests.objects.filter(player_id=req_user.id)
    player_req.delete()
    return HttpResponseRedirect('/profile/' + request.user.nickname)

def reject_request(request):
    pass