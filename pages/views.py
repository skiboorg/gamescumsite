from django.contrib.auth import logout
from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from news.models import News
from authentication.forms import EditProfileForm
from squads.forms import *
from authentication.models import PrivateMessages
from squads.models import *
import json
import requests
from datetime import datetime , time



def get_squad_info(player_id):
    try:
        squad_member = SquadMembers.objects.get(player_id=player_id)
    except:
        squad_member = False
        squad_info = False
    if squad_member:
        squad_info = Squad.objects.get(id=squad_member.squad.id)
    return(squad_info)


def index(request):
    page_title = 'ГЛАВНАЯ'
    index_page_active = 'active'
    news = News.objects.all()
    if request.user.is_authenticated:
        last_login = request.user.last_vizit
        time_now = datetime.now().date()
        if time_now > last_login:
            request.user.wallet += 30
            request.user.last_vizit = datetime.now().date()
            request.user.save(force_update=True)

    return render(request, 'pages/index.html', locals())


def login(request):
    pass


def logout_page(request):
    logout(request)
    return render(request, 'pages/logout.html', locals())


def profile(request, nickname_req):

    def get_play_time(steamid):
        played_time = 0
        server_response = requests.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=BD1EBFF1F1644726E7F1399B2E9FF8B4&steamid={}&format=json'.format(steamid))
        json_data = json.loads(server_response.text)
        if json_data['response'] == '':
            for i in json_data['response']['games']:
                if i['appid'] == 513710:
                    played_time = round(int(i['playtime_forever']) / 60)
        else:
            played_time = 'НЕТ ДАННЫХ'
        return played_time



    if request.POST:

        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()

        return render(request, 'pages/ownprofile.html', locals())


    else:
        if request.user.is_authenticated:
            if nickname_req == request.user.nickname:
                sectors_a = SquadSectors.objects.filter(name__startswith='a').order_by('-name')

                own_profile = True
                player = request.user
                squad_info = get_squad_info(player.id)
                print('squad_info  : ')
                print(squad_info)
                squad_wear = SquadWear.objects.all()

                if squad_info:
                    if player.is_squad_leader:
                        squad_form = UpdateSquadForm(instance=squad_info)
                        squad_join_requests = SquadRequests.objects.filter(squad=squad_info.id)

                    squad_members = SquadMembers.objects.filter(squad=squad_info.id)
                    squad_sectors = SquadSectors.objects.filter(squad=squad_info.id)

                else:
                    print('No squad info')
                    squad_form = CreateSquadForm()

                form = EditProfileForm(instance=request.user)

                return render(request, 'pages/ownprofile.html', locals())
            else:
                player = SteamUser.objects.filter(nickname=nickname_req).first()
                squad_info = get_squad_info(player.id)
                player_play_time = get_play_time(player.steamid)
                return render(request, 'pages/profile.html', locals())
        else:

            player = SteamUser.objects.filter(nickname=nickname_req).first()
            squad_info = get_squad_info(player.id)
            player_play_time = get_play_time(player.steamid)
            return render(request, 'pages/profile.html', locals())

def del_message(request):
    message = PrivateMessages.objects.get(id=int(request.GET.get('m_id')))
    if message.to_player.id == request.user.id:
        message.delete()
    return HttpResponseRedirect('/profile/' + request.user.nickname)


