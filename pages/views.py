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
from django.contrib import messages
from datetime import datetime , time
from lxml import html
import requests
import bot_settings
from django.http import JsonResponse
from pages.models import SiteStat



def server_stat(request):
    total_players = SteamUser.objects.filter(is_staff=False)
    total_rc = 0
    total_drop_rc = 0
    total_deaths = 0
    for player in total_players:
        total_rc += player.wallet
        total_drop_rc += player.total_buys_summ
        total_deaths += player.deaths




    return render(request, 'pages/statistic.html', locals())

def discord(request):
    return HttpResponseRedirect('https://discord.gg/sgUz53k')

def settings(request):
    site_settings = SiteStat.objects.get(id=1)
    return render(request, 'pages/settings.html', locals())

def get_squad_info(player_id):
    try:
        squad_member = SquadMembers.objects.get(player_id=player_id)
    except:
        squad_member = False
        squad_info = False
    if squad_member:
        squad_info = Squad.objects.get(id=squad_member.squad.id)
    return(squad_info)


def support(request):
    return render(request, 'pages/support_new.html', locals())


def index(request):

    page_title = 'ГЛАВНАЯ'
    index_page_active = 'active'
    news = News.objects.all().order_by('-id')[:12]

    page = requests.get(bot_settings.SERVER_URL)
    if page:
        tree = html.fromstring(page.content)
        players = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')[0]
        rank = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[1]/text()')[0]
        name = tree.xpath('//*[@id="serverPage"]/h2/text()')
        ip = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[3]/text()')[0]
        status = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[4]/text()')[0]
    top3 = SteamUser.objects.filter(is_active=True, is_staff=False).order_by('-rating')[:10]

    return render(request, 'pages/index_new.html', locals())


def login(request):
    pass


def logout_page(request):
    logout(request)
    return render(request, 'pages/logout.html', locals())


def profile(request, nickname_req):
    page_title = 'ПРОФИЛЬ ИГРОКА'

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
                all_orders = Orders.objects.filter(player=player, is_complete=False)

                if player.vip:
                    vip_ends = player.vip_start + timedelta(days=30)
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
                section = request.GET.get('section')


                return render(request, 'pages/ownprofile_new.html', locals())
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
    return_dict = {}
    data = request.POST
    print(data)
    pm_id = int(data.get('pm_id'))
    message = PrivateMessages.objects.get(id=pm_id)
    message.delete()

    return JsonResponse(return_dict)


def about_us(request):
    page_title = 'О ПРОЕКТЕ'
    return render(request, 'pages/about_us_new.html', locals())

def bonus_pack(request):
    admins = SteamUser.objects.filter(is_staff=True)
    player = request.user
    for admin in admins:
        new_message = PrivateMessages.objects.create(to_player_id=admin.id,
                                                     from_player_name=player.personaname,
                                                     from_player_name_slug=player.nickname,
                                                     from_player_avatar=str(player.avatar),
                                                     text='Я бы хотел попросить бонус пак .\n'
                                                          ' Мой SteamID {} . '.format(player.steamid))
        new_message.save()
    player.bonus_pack = True
    player.save(force_update=True)
    messages.add_message(request, messages.SUCCESS, 'Заявка на получение бонус-пака отправлена! '
                                                 'Ожидай в дискорде сообщения от администрации сервера.')

    return HttpResponseRedirect('/profile/' + request.user.nickname)


def rules(request):
    page_title = 'ПРАВИЛА СЕРВЕРА'
    return render(request, 'pages/rules_new.html', locals())

def players(request):
    all_players = SteamUser.objects.filter(is_staff=False, is_active=True)
    top20_kills = all_players.order_by('-kills')[:20]
    top20_rating = all_players.order_by('-rating')[:20]
    top20_money = all_players.order_by('-wallet')[:20]
    players_active = 'active'

    page_title = 'СТАТИСТИКА ИГРОКОВ'
    return render(request, 'pages/top20_new.html', locals())

def about_bonus_pack(request):
    page_title = 'БОНУС ПАК НОВЫМ ИГРОКАМ'
    return render(request, 'pages/bonus_pack.html', locals())

def add_to_player_balance(request):
    player = request.user
    to_player = SteamUser.objects.get(id=request.POST.get('player_id'))
    if player.wallet >= int(request.POST.get('rc_amount')):
        player.wallet -= int(request.POST.get('rc_amount'))
        player.save(force_update=True)
        to_player.wallet += int(request.POST.get('rc_amount'))
        to_player.save(force_update=True)
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Перевод {} RC, игроку {} '.format(
                                        request.POST.get('rc_amount'), to_player.nickname))
        new_log.save()
        new_message = PrivateMessages.objects.create(to_player_id=to_player.id,
                                                     from_player_name=player.personaname,
                                                     from_player_name_slug=player.nickname,
                                                     from_player_avatar=str(player.avatar),
                                                     text='Привет, я перевел тебе {} RC'
                                                     .format(request.POST.get('rc_amount')))
        new_message.save()
        messages.add_message(request, messages.SUCCESS,
                             'Баланс игрока '+ to_player.personaname +' успешно пополнен на '
                             + request.POST.get('rc_amount') + ' RC')
    else:
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка перевода {} RC, игроку {} '.format(
                                          request.POST.get('rc_amount'), to_player.nickname))
        new_log.save()
        messages.add_message(request, messages.WARNING, 'Не хватает собственных средств для перевода!')

    return HttpResponseRedirect('/profile/' + to_player.nickname)