from django.contrib.auth import logout
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from news.models import News
from authentication.forms import EditProfileForm
from squads.forms import *
from authentication.models import *
from squads.models import *
from shop.models import Orders
import json
from django.contrib import messages
# from datetime import datetime , time
from lxml import html
import requests
from django.http import JsonResponse
from pages.models import *
from datetime import datetime, timedelta
import bot_settings
from discord_webhook import DiscordWebhook, DiscordEmbed
from django.views.decorators.csrf import csrf_exempt
import math
from PIL import Image
import socket

def sector(x,y):
    if (y >= 317500):
        sect = 'D'
    elif (y >= 11500):
        sect = 'C'
    elif (y >= -294500):
        sect = 'B'
    else:
        sect = 'A'
    if (x >= 315000):
        sect += '4'
    elif (x >= 9500):
        sect += '3'
    elif (x >= -295500):
        sect += '2'
    else:
        sect += '1'
    return sect
def calculateDistance(x1,x2,y1,y2):
    print('x1,x2,y1,y2',x1,x2,y1,y2)
    dist = round(math.sqrt(((x2 - x1)**2 + (y2 - y1)**2)) * 0.01)
    return dist

def warzone(request,zonename):
    pass

@csrf_exempt
def kill_log(request):
    print(request.POST)
    logTime = request.POST.get('time')
    logText = json.loads(request.POST.get('data'))

    logtext, created = KillLog.objects.get_or_create(LogTime=logTime, defaults={'oldLog': logText})

    if created:
        print('new killlog is created')
    else:
        print('killlog is present')

        oldlog = logtext.oldLog
        old = oldlog.splitlines()

        newlog = json.loads(request.POST.get('data'))
        new = newlog.splitlines()
        DF = [x for x in new if x not in old]
        print('kill df = ', DF)
        logtext.oldLog = newlog
        logtext.save(force_update=True)

        if DF:

            for msg in DF:


                msg = msg.replace(': ', ',').replace('S[', ',').replace('C[', ',').replace('] (killer',
                                                                                           ',').split(',')
                print('msg len = ', len(msg))
                if len(msg) == 21 and not len(msg) == 22:

                    print('kill log=', msg)
                    victimNick = msg[2].replace('(', '').replace (')', '').split(' 7')[0]
                    victimID = '7' + msg[2].replace('(', '').replace (')', '').split(' 7')[1]
                    killerNick = msg[4].replace('(', '').replace(')', '').split(' 7')[0]
                    killerID = '7' + msg[4].replace('(', '').replace(')', '').split(' 7')[1]
                    killerGameX = msg[6]
                    killerGameY = msg[7]
                    victimGameX = msg[10]
                    victimGameY = msg[11]
                    killerLocCoordX = str(((float(killerGameX) * -1) + 613142.340) * 0.001)
                    killerLocCoordY = str((float(killerGameY) + 593500) * 0.001)
                    victimLocCoordX = str(((float(victimGameX) * -1) + 613142.340) * 0.001)
                    victimLocCoordY = str((float(victimGameY) + 593500) * 0.001)
                    newKillStat = KillStat.objects.create(killerID=killerID,
                                            killerNick=killerNick,
                                            victimID=victimID,
                                            victimNick=victimNick,
                                            killerLocGameCoordX=killerGameX,
                                            killerLocGameCoordY=killerGameY,
                                            victimLocGameCoordX=victimGameX,
                                            victimLocGameCoordY=victimGameY,
                                            killerLocCoordX=killerLocCoordX,
                                            killerLocCoordY=killerLocCoordY,
                                            victimLocCoordX=victimLocCoordX,
                                            victimLocCoordY=victimLocCoordY,
                                            killerSector=str(sector(round(float(killerGameX)),round(float(killerGameY)))),
                                            victimSector=str(sector(round(float(victimGameX)),round(float(victimGameY)))))


                    newKillStat.save()
                    #TODO добавлять рейтинг при убийстве (рейтинг для ВИП?)
                    try:
                        killer = SteamUser.objects.get(steamid=killerID)
                        print('KILLER KILLS = ', killer.kills)
                        killer.kills += 1
                        killer.save(force_update=True)
                        print('KILLER NICK = ', killer.personaname)
                    except:
                        print('KILLER NOT FOUND')
                    try:
                        victim = SteamUser.objects.get(steamid=victimID)
                        print('VICTIM DEATHS = ', victim.deaths)
                        victim.deaths += 1
                        victim.save(force_update=True)
                        print('VICTIM NICK = ', victim.personaname)
                    except:
                        print('VICTIM NOT FOUND')
                    msg_date = list(reversed(msg[0].split('-')[0].split('.')))
                    msg_time = msg[0].split('-')[1].split('.')
                    if int(msg_time[0]) + 3 > 23:
                        msg_date[0] = str(int(msg_date[0]) + 1)
                        if int(msg_time[0]) + 3 - 24 < 10:
                            msg_time[0] = '0' + str(int(msg_time[0]) + 3 - 24)
                        else:
                            msg_time[0] = str(int(msg_time[0]) + 3 - 24)
                    else:
                        msg_time[0] = str(int(msg_time[0]) + 3)
                    #msg_time[0] = str(int(msg_time[0]) + 3)
                    print('send in discord', msg_date , msg_time)

                    # base_image = Image.open('C:/Users/ххх/PycharmProjects/gamescumsite_new/map.jpg')
                    # watermark = Image.open('C:/Users/ххх/PycharmProjects/gamescumsite_new/zone.png')
                    # width, height = base_image.size
                    # transparent = Image.new('RGB', (width, height), (0, 0, 0, 0))
                    # transparent.paste(base_image, (0, 0))
                    # transparent.paste(watermark, (600 - 35, 600 - 35), mask=watermark)
                    # #transparent.show()

                    webhook = DiscordWebhook(url=bot_settings.DISCORD_KILL_LOG)

                    embed = DiscordEmbed(title='-',
                                         description="Игрок {} убил игрока {} в квадрате {} с расстояния {} м.".format(
                                             killerNick,
                                             victimNick,
                                             sector(round(float(victimGameX)),round(float(victimGameY))),
                                            calculateDistance(float(killerGameX),
                                                              float(victimGameX),
                                                              float(killerGameY),
                                                              float(victimGameY)),
                                             color=0xec4e00))
                   #m embed.set_image(url=transparent)
                    embed.set_footer(text='-'.join(msg_date) + ' - ' + ':'.join(msg_time))
                    webhook.add_embed(embed)
                    webhook.execute()





    return HttpResponse(status=200)


@csrf_exempt
def chat_log(request):
    print(request.POST.get('data'))
    logTime = request.POST.get('time')
    logText = json.loads(request.POST.get('data'))
    print(logTime)


    logtext, created = GameChat.objects.get_or_create(logTime=logTime, defaults={'oldLog': logText})

    if created:
        print('new log is created')
    else:
        print('log is present')


        oldlog = logtext.oldLog
        old = oldlog.splitlines()

        newlog = json.loads(request.POST.get('data'))
        new = newlog.splitlines()
        DF = [x for x in new if x not in old]
        print('df = ', DF)
        logtext.oldLog = newlog
        logtext.save(force_update=True)

        if DF:
            for msg in DF:
                msg = msg.replace(": '", ':').replace("' '", ':').replace("'", '')
                print(msg)
                msg = msg.split(':')
                print('msg2= ', msg[2])
                print('msg4= ', msg[4])
                msg_date = list(reversed(msg[0].split('-')[0].split('.')))
                msg_time = msg[0].split('-')[1].split('.')
                if int(msg_time[0]) + 3 > 23:
                    msg_date[0] = str(int(msg_date[0]) + 1)
                    if int(msg_time[0]) + 3 - 24 < 10:
                        msg_time[0] = '0' + str(int(msg_time[0]) + 3 - 24)
                    else:
                        msg_time[0] = str(int(msg_time[0]) + 3 - 24)
                else:
                    msg_time[0] = str(int(msg_time[0]) + 3)
                if msg[3] == 'Global':
                    server_response = requests.get(
                        'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={}&steamids={}&format=json'.format(
                            bot_settings.STEAM_KEY, msg[1]))
                    json_data = json.loads(server_response.text)
                    print('get user avatar')
                    userAvatar = json_data['response']['players'][0]['avatar']

                    webhook = DiscordWebhook(url=bot_settings.DISCORD_CHAT_WH)
                    embed = DiscordEmbed(title=msg[4], color=0xec4e00)
                    embed.set_author(name=msg[2][:msg[2].find('(')], icon_url='{}'.format(userAvatar))

                    embed.set_footer(text='-'.join(msg_date) + ' - ' + ':'.join(msg_time))
                    webhook.add_embed(embed)
                    webhook.execute()
    return HttpResponse(status=200)


def server_stat(request):
    page_title = 'СТАТИСТИКА'
    total_players = SteamUser.objects.filter(is_staff=False)
    total_rc = 0
    total_drop_rc = 0
    total_deaths = 0
    for player in total_players:
        total_rc += player.wallet
        total_drop_rc += player.total_buys_summ
        total_deaths += player.deaths
    return render(request, 'pages/statistic.html', locals())


def vip(request):
    return render(request, 'pages/vip.html', locals())


def discord(request):
    return HttpResponseRedirect('https://discord.gg/sgUz53k')


def settings(request):
    page_title = 'НАСТРОЙКИ'
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
    return (squad_info)


def support(request):
    return render(request, 'pages/support_new.html', locals())


def index(request):
    page_title = 'ГЛАВНАЯ'
    index_page_active = 'active'
    news = News.objects.all().order_by('-id')[:12]

    page = requests.get(bot_settings.SERVER_URL)
    page1 = requests.get(bot_settings.SERVER1_URL)
    if page:
        tree = html.fromstring(page.content)
        players = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')[0]
        rank = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[1]/text()')[0]
        name = tree.xpath('//*[@id="serverPage"]/h2/text()')
        ip = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[3]/text()')[0]
        status = tree.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[4]/text()')[0]
    if page1:
        tree1 = html.fromstring(page1.content)
        players1 = tree1.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[2]/text()')[0]
        rank1 = tree1.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[1]/text()')[0]
        name1 = tree1.xpath('//*[@id="serverPage"]/h2/text()')
        ip1 = tree1.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[3]/text()')[0]
        status1 = tree1.xpath('//*[@id="serverPage"]/div[1]/div/dl/dd[4]/text()')[0]
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
        server_response = requests.get(
            'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={}&steamid={}&format=json'.format(
                bot_settings.STEAM_KEY, steamid))
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

        server_response = requests.get(
            'http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key={}&steamids={}'.format(bot_settings.STEAM_KEY,
                                                                                                 steamid))
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
                    return render(request, 'pages/profile_new.html', locals())
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
                return render(request, 'pages/profile_new.html', locals())
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


    data = {
        'sender': 'ываывавыа',
        'instruction': ['ываукупамыкцук','qwewqe']
    }


    sock = socket.socket()
    sock.connect(('localhost', 9099))
    raw_data = json.dumps(data, ensure_ascii=False).encode("utf-8")
    sock.send(raw_data)

    data = sock.recv(1024)
    sock.close()





    return render(request, 'pages/about_us_new.html', locals())


def reset_limit(request):
    player = request.user
    player.buys_count = 0
    old_wallet = player.wallet
    player.wallet -= 1000
    player.save(force_update=True)
    new_log = Logs.objects.create(player_id=request.user.id,
                                  player_action='Сброс лимита покупок. До сброса баланс : {}.  После сброса {} '.format(
                                      old_wallet, player.wallet))
    new_log.save()

    messages.add_message(request, messages.SUCCESS, 'Дневной лимит сброшен, приятных покупок;) ')

    return HttpResponseRedirect('/profile/' + request.user.nickname)


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

    webhook = DiscordWebhook(url=bot_settings.SHOP_ADMIN_URL)
    embed = DiscordEmbed(title='ЗАЯВКА НА БОНУС ПАК', color=0xec4e00)
    embed.add_embed_field(name='Заказчик : ', value=player.personaname)
    embed.add_embed_field(name='STEAMID: ', value=player.steamid)

    webhook.add_embed(embed)

    webhook.execute()

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


def buy_vip(request):
    player = request.user
    if player.wallet >= 20000:
        player.vip = True
        player.vip_start = datetime.now()
        old_player_wallet = player.wallet
        player.wallet -= 20000
        player.save(force_update=True)
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Покупка VIP за RC. Баланс кошелька до покупки : {}.'
                                                    ' Баланс кошелька после покупки : {}. '.format(old_player_wallet,
                                                                                                   player.wallet))
        new_log.save()
    else:
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка покупки VIP за RC. Баланс кошелька до покупки : {}.'.format
                                      (player.wallet))
        new_log.save()
    return HttpResponseRedirect('/profile/' + player.nickname)


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
                             'Баланс игрока ' + to_player.personaname + ' успешно пополнен на '
                             + request.POST.get('rc_amount') + ' RC')
    else:
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка перевода {} RC, игроку {} '.format(
                                          request.POST.get('rc_amount'), to_player.nickname))
        new_log.save()
        messages.add_message(request, messages.WARNING, 'Не хватает собственных средств для перевода!')

    return HttpResponseRedirect('/profile/' + to_player.nickname)