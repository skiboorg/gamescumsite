from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from squads.forms import *
from squads.models import *
from authentication.models import *
from datetime import datetime



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
                request.user.wallet -= 1000
                request.user.save(force_update=True)
                return HttpResponseRedirect('/profile/' + request.user.nickname)

    return HttpResponseRedirect('/profile/' + request.user.nickname)


def buy_sector(request):
    squad = Squad.objects.get(leader=request.user)
    sectors_count = SquadSectors.objects.filter(squad=squad).count()
    sector_to_buy = SquadSectors.objects.get(id=int(request.GET.get('s')))
    if sector_to_buy.price <= squad.balance:
        if squad.level == 1:
            if sectors_count < 1:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                sector_to_buy.own = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
            else:
                pass
        if squad.level == 2:
            if sectors_count < 2:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                sector_to_buy.own = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
            else:
                pass
        if squad.level == 3:
            if sectors_count < 3:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
            else:
                pass

        if squad.level == 4:
            if sectors_count < 4:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
            else:
                pass

        if squad.level == 5:
            if sectors_count < 5:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
            else:
                pass
    return HttpResponseRedirect('/profile/' + request.user.nickname)


def add_to_balance(request):

    if request.POST:
        player = request.user
        if player.wallet >= int(request.POST.get('rc_amount')):
            squad = Squad.objects.get(id=request.POST.get('squad_id'))
            squad_member = SquadMembers.objects.get(player=player.id)
            squad_member.income += int(request.POST.get('rc_amount'))
            squad_member.save(force_update=True)
            player.wallet -= int(request.POST.get('rc_amount'))
            player.rating += 1
            player.save(force_update=True)
            squad.balance += int(request.POST.get('rc_amount'))
            squad.save(force_update=True)


        return HttpResponseRedirect('/profile/' + request.user.nickname)

def show_squads(request):
    squad_active = 'active'
    squads = Squad.objects.all()
    player = request.user
    print(player.id)
    req_list = list()
    try:
        squad_requests = SquadRequests.objects.filter(player_id=player.id)
    except:
        squad_requests = None
    if player.id in squad_requests:
        print(req_list)

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
    squad = Squad.objects.get(leader=request.user)
    members_count = SquadMembers.objects.filter(squad=squad).count()
    if squad.level == 1:
        if members_count < 3:
            pass
        else:
            squad.recruting = False
            squad.save(force_update=True)
    if squad.level == 2:
        if members_count < 4:
            pass
        else:
            squad.recruting = False
            squad.save(force_update=True)
    if squad.level == 3:
        if members_count < 5:
            pass
        else:
            squad.recruting = False
            squad.save(force_update=True)

    if squad.level == 4:
        if members_count < 6:
            pass
        else:
            squad.recruting = False
            squad.save(force_update=True)

    if squad.level == 5:
        if members_count < 7:
            pass
        else:
            squad.recruting = False
            squad.save(force_update=True)

    if squad.recruting:
        req_user = SteamUser.objects.get(nickname=request.GET.get('name'))
        req_squad = SquadMembers.objects.create(squad_id=squad.id, player_id=req_user.id)
        req_squad.save()
        player_req = SquadRequests.objects.filter(player_id=req_user.id)
        player_req.delete()
    return HttpResponseRedirect('/profile/' + request.user.nickname)

def reject_request(request):
    req = SquadRequests.objects.get(id=int(request.GET.get('r_id')))
    squad = req.squad
    if request.user.id == squad.leader.id:
        req.delete()
        new_message = PrivateMessages.objects.create(to_player_id=req.player.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.personaname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Заявка на вступление отклонена')
        new_message.save()
    return HttpResponseRedirect('/profile/' + request.user.nickname)

def kick_player(request,nickname):
    squad_member = SquadMembers.objects.get(player__nickname=nickname)
    squad = squad_member.squad
    if request.user.id == squad.leader.id:
        squad_member.delete()
        new_message = PrivateMessages.objects.create(to_player_id=squad_member.player.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.personaname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Привет, ты был кикнут из отряда.')
        new_message.save()
    return HttpResponseRedirect('/profile/' + request.user.nickname)


def level_up(request):
    squad = Squad.objects.get(leader=request.user)

    if squad.level == 1:
        if squad.balance >= 1000:
            squad.balance -= 1000
            squad.level = 2
            squad.save(force_update=True)
    elif squad.level == 2:
        if squad.balance >= 3000:
            squad.balance -= 3000
            squad.level = 3
            squad.recruting = True
            squad.save(force_update=True)
    elif squad.level == 3:
        if squad.balance >= 5000:
            squad.balance -= 5000
            squad.level = 4
            squad.recruting = True
            squad.save(force_update=True)
    elif squad.level == 4:
        if squad.balance >= 10000:
            squad.balance -= 10000
            squad.level = 5
            squad.recruting = True
            squad.save(force_update=True)
    elif squad.level == 5:
        if squad.balance >= 15000:
            squad.balance -= 15000
            squad.level = 6
            squad.recruting = True
            squad.vip = True
            squad.save(force_update=True)


    return HttpResponseRedirect('/profile/' + request.user.nickname)

def delete_squad(request):
    squad_to_delete = Squad.objects.get(leader=request.user)
    SquadMembers.objects.filter(squad=squad_to_delete).delete()
    SquadSectors.objects.filter(squad=squad_to_delete).update(squad=None)
    SquadRequests.objects.filter(squad=squad_to_delete).delete()
    request.user.is_squad_leader = False
    request.user.save(force_update=True)
    squad_to_delete.delete()

    return HttpResponseRedirect('/profile/' + request.user.nickname)