from django.contrib.auth import logout
from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from django.views.decorators.csrf import csrf_exempt

from news.models import News
from authentication.forms import EditProfileForm
from squads.forms import *
from authentication.models import *
from squads.models import *
from shop.models import Orders
import json
from django.contrib import messages
#from datetime import datetime , time
from lxml import html
import requests
import bot_settings
from django.http import JsonResponse
from pages.models import *
from datetime import datetime, timedelta
import bot_settings
from discord_webhook import DiscordWebhook, DiscordEmbed


@csrf_exempt
def kill_log(request):
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
        killerNick = ''
        killerID = ''
        killerGameX = ''
        killerGameY = ''
        victimNick = ''
        victimID = ''
        victimGameX = ''
        victimGameY = ''
        isEventKill = False
        if DF:
            for msg in DF:
                msg = msg.replace(': ',',').replace('S[',',').replace('C[',',').replace('] (killer',',').split(',')
                print('kill log=' , msg)
                victimNick = msg[2].replace(' ','')[:msg[2].find('(')-1]
                victimID = msg[2].replace(' ','')[msg[2].find('('):msg[2].find(')')-1]
                killerNick = msg[4].replace(' ', '')[:msg[4].find('(') - 1]
                victimID = msg[4].replace(' ', '')[msg[4].find('('):msg[4].find(')') - 1]
                killerGameX = msg[6]
                killerGameY = msg[7]
                victimGameX = msg[10]
                victimGameY = msg[11]




                try:
                    if msg[22]:
                        isEventKill = True
                except:
                    pass


    return HttpResponse(status=200)

@csrf_exempt
def chat_log(request):

    steam_url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=BD1EBFF1F1644726E7F1399B2E9FF8B4&steamids=76561198031013162'

    # test=["2019.08.26-07.10.37: '76561198005560814:Non(2495)' 'Local: уже идем'", "2019.08.26-07.10.44: '76561198294173616:CTAPOBEP(34)' 'Global: за тобой)'", "2019.08.26-07.10.46: '76561198836595365:Alpha(2736)' 'Global: сервак пвп да?'", "2019.08.26-07.10.49: '76561198005560814:Non(2495)' 'Local: )'", "2019.08.26-07.10.52: '76561198119304883:Djony Falcony(2046)' 'Global: Так точно!'"]
    # for msg in test:
    #     msg = msg.replace(": '", ':').replace("' '",':').replace("'",'')
    #     print (msg)
    logTime = request.POST.get('time')
    logText = json.loads(request.POST.get('data'))
    print(logTime)


    logtext, created = GameChat.objects.get_or_create(logTime=logTime,defaults={'oldLog':logText})

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

        # server_response = requests.get(
        #     'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=BD1EBFF1F1644726E7F1399B2E9FF8B4&steamids={}&format=json'.format(
        #        '76561198031013162'))
        # json_data = json.loads(server_response.text)
        # print('get user avatar')

        # userAvatar = json_data['response']['players'][0]['avatar']


        # webhook_url = 'https://discordapp.com/api/webhooks/614005912662835215/Un9HD3x5x6XZWGYhgdHzLrwfM4EF9uYA8RfLTniCssIUnsvzFZE8wKaUxaNsmWJvBTQR'
        # webhook = DiscordWebhook(url=webhook_url)
        # embed = DiscordEmbed(title="Сообщение из чата")
        # embed.set_author(name="автор", icon_url='{}'.format(userAvatar))
        #
        # embed.set_footer(text="12.23.2333 12:32:23")
        # webhook.add_embed(embed)
        # webhook.execute()


        if DF:
            for msg in DF:
                msg = msg.replace(": '", ':').replace("' '", ':').replace("'", '')
                print(msg)
                msg = msg.split(':')
                print('msg2= ', msg[2])
                print('msg4= ', msg[4])
                msg_date = list(reversed(msg[0].split('-')[0].split('.')))
                msg_time = msg[0].split('-')[1].split('.')
                msg_time[0] = str(int(msg_time[0]) + 3)

                server_response = requests.get(
                    'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=BD1EBFF1F1644726E7F1399B2E9FF8B4&steamids={}&format=json'.format(
                        msg[1]))
                json_data = json.loads(server_response.text)
                print('get user avatar')

                userAvatar = json_data['response']['players'][0]['avatar']

                webhook_url = 'https://discordapp.com/api/webhooks/614005912662835215/Un9HD3x5x6XZWGYhgdHzLrwfM4EF9uYA8RfLTniCssIUnsvzFZE8wKaUxaNsmWJvBTQR'
                webhook = DiscordWebhook(url=webhook_url)
                # embed = DiscordEmbed(title='-'.join(msg_date) + ' - ' + ':'.join(msg_time))
                # embed.add_embed_field(name=msg[2][:msg[2].find('(')], value=msg[4])
                # webhook.add_embed(embed)
                # webhook.execute()

                embed = DiscordEmbed(title=msg[4], color=0xec4e00)
                embed.set_author(name=msg[2][:msg[2].find('(')], icon_url='{}'.format(userAvatar))

                embed.set_footer(text='-'.join(msg_date) + ' - ' + ':'.join(msg_time))
                webhook.add_embed(embed)
                webhook.execute()

    #if request.GET:

        #print(json.loads(request.GET.get('data')))


        # newlog = json.loads(request.GET.get('data'))
        # Dict1 = newlog.readlines()
        # Dict2 = oldlog.readlines()
        # DF = [x for x in Dict1 if x not in Dict2]
        # print(DF)





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
    return(squad_info)


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
                player_logs = PlayerLog.objects.filter(player_id=request.user.id).order_by('-created')

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
    PlayerLog.objects.create(player_id=player.id,
                             log_action='Списание RC',
                             comment='С баланса списано 1000 RC за сброс лимита на покупки.'
                                     'Прежний баланс {}, новый баланс {}'.format(old_wallet,
                                                                                 player.wallet)).save()

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
    PlayerLog.objects.create(player_id=player.id,
                             log_action='Запрос',
                             comment='Запрос на бонус-пак успешно отправлен').save()

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
        PlayerLog.objects.create(player_id=player.id,
                                 log_action='Списание RC',
                                 comment='С баланса списано 20000 RC за покупку VIP.'
                                         'Прежний баланс {}, новый баланс {}'.format(old_player_wallet,
                                                                                     player.wallet)).save()
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
        old_player_wallet = player.wallet
        old_to_player_wallet = to_player.wallet
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
        PlayerLog.objects.create(player_id=player.id,
                                 log_action='Списание RC',
                                 comment='С баланса списано {} RC за перевод игроку {}.'
                                         'Прежний баланс {}, новый баланс {}'.format(request.POST.get('rc_amount'),
                                                                                     to_player.personaname,
                                                                                     old_player_wallet,
                                                                                     player.wallet)).save()
        PlayerLog.objects.create(player_id=to_player.id,
                                 log_action='Пополнение RC',
                                 comment='На баланс зачислено {} RC от игрока {}'
                                         'Прежний баланс {}, новый баланс {}'.format(request.POST.get('rc_amount'),
                                                                                     player.personaname,
                                                                                     old_to_player_wallet,
                                                                                     to_player.wallet)).save()
    else:
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка перевода {} RC, игроку {} '.format(
                                          request.POST.get('rc_amount'), to_player.nickname))
        new_log.save()
        messages.add_message(request, messages.WARNING, 'Не хватает собственных средств для перевода!')

    return HttpResponseRedirect('/profile/' + to_player.nickname)