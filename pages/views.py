from django.contrib.auth import logout
from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from news.models import News
from authentication.forms import EditProfileForm
from squads.forms import *
from authentication.models import *
from squads.models import *
from shop.models import Orders
import json
import requests
from datetime import datetime , time
from lxml import html
import requests
import bot_settings



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
    news = News.objects.all().order_by('-id')
    news_first3 = news.order_by('-id')[:3]
    news_last6 = news.order_by('id')[:6]
    page = requests.get(bot_settings.SERVER_URL)
    tree = html.fromstring(page.content)
    players = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')[0]
    rank = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[1]/text()')[0]
    name = tree.xpath('//*[@id="serverPage"]/h2/text()')
    ip = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[3]/text()')[0]
    status = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[4]/text()')[0]
    top3 = SteamUser.objects.filter(is_superuser=False,is_staff=False).order_by('-rating')[:3]
    print(status)

    if request.user.is_authenticated:
        player = request.user

        if player.rating > player.level * 50:
            player.level += 1
            player.save(force_update=True)

        if not player.vip and player.rating > 300:
            player.vip = True
            player.rank = 'VIP'
            player.save(force_update=True)

        last_login = player.last_vizit
        time_now = datetime.now().date()

        if time_now > last_login:

            if player.vip:
                player.wallet += 60
                player.last_vizit = datetime.now().date()
                player.save(force_update=True)
            else:

                if not player.outlaw:
                    player.wallet += 30
                    player.last_vizit = datetime.now().date()
                    player.save(force_update=True)

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
        print('get user info')
        print(json_data['response'])
        if json_data['response'] != {}:
            for i in json_data['response']['games']:
                if i['appid'] == 513710:
                    played_time = round(int(i['playtime_forever']) / 60)
                    print(played_time)
        else:
            played_time = 'НЕТ ДАННЫХ'
        return played_time

    def get_bans(steamid):

        server_response = requests.get('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=BD1EBFF1F1644726E7F1399B2E9FF8B4&steamids={}'.format(steamid))
        json_data = json.loads(server_response.text)
        print('get user bans')

        ban_data = json_data['players'][0]['NumberOfGameBans']
        print(ban_data)
        if json_data['players'] != '':
            if ban_data > 0:
                print('есть бан')
                player_bans = ban_data
                print(player_bans)
            else:
                print('нет бан')
                player_bans = 'НЕТ'
        else:
            player_bans = 'НЕТ ДАННЫХ'
        return player_bans


    if request.POST:

        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()

        return HttpResponseRedirect('/profile/' + request.user.nickname)


    else:
        if request.user.is_authenticated:
            if nickname_req == request.user.nickname:


                own_profile = True
                player = request.user
                squad_info = get_squad_info(player.id)
                print('squad_info  : ')
                print(squad_info)
                squad_wear = SquadWear.objects.all()
                all_orders = Orders.objects.filter(player=player)

                if squad_info:
                    if player.is_squad_leader:
                        squad_form = UpdateSquadForm(instance=squad_info)
                        squad_join_requests = SquadRequests.objects.filter(squad=squad_info.id)

                    squad_members = SquadMembers.objects.filter(squad=squad_info.id)
                    squad_sectors = SquadSectors.objects.filter(squad=squad_info.id)
                    wars = SectorWars.objects.all()

                else:
                    print('No squad info')
                    squad_form = CreateSquadForm()

                form = EditProfileForm(instance=request.user)

                return render(request, 'pages/ownprofile.html', locals())
            else:
                try:
                    player = SteamUser.objects.get(nickname=nickname_req)
                except:
                    player = None

                if player:
                    print('user info auth mode')

                    squad_info = get_squad_info(player.id)
                    player_play_time = get_play_time(player.steamid)
                    bans = get_bans(player.steamid)
                    print(player)
                    return render(request, 'pages/profile.html', locals())
                else:
                    return HttpResponseRedirect('/')

        else:
            try:
                player = SteamUser.objects.get(nickname=nickname_req)
            except:
                player = None

            if player:
                print('user info no auth mode')

                squad_info = get_squad_info(player.id)
                player_play_time = get_play_time(player.steamid)
                bans = get_bans(player.steamid)
                print(bans)
                return render(request, 'pages/profile.html', locals())
            else:
                return HttpResponseRedirect('/')


def del_message(request):
    message = PrivateMessages.objects.get(id=int(request.GET.get('m_id')))
    if message.to_player.id == request.user.id:
        message.delete()
    return HttpResponseRedirect('/profile/' + request.user.nickname)

def about_us(request):
    return render(request, 'pages/about_us.html', locals())


