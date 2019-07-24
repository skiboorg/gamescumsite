from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponseRedirect
from squads.forms import *
from squads.models import *
from authentication.models import *
# from datetime import datetime
import datetime
from django.core.files.storage import FileSystemStorage
import csv
import os
from django.conf import settings
import bot_settings
from discord_webhook import DiscordWebhook, DiscordEmbed



def create_squad(request):
    if request.POST:
        player = request.user
        if request.POST.get('update'):
            print('upadting')
            squad = Squad.objects.get(leader_id=request.user.id)
            print(request.POST)
            squad_form = UpdateSquadForm(request.POST, request.FILES, instance=squad)
            if squad_form.is_valid():
                squad_form.save()
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Изменение отряда {}'.format(squad.name))
                new_log.save()
                return HttpResponseRedirect('/profile/' + request.user.nickname +'#squad')
        else:
            squad_form = CreateSquadForm(request.POST, request.FILES)
            if squad_form.is_valid():
                instance = Squad(avatar=request.FILES['avatar'])
                squad_form.save()
                old_wallet = player.wallet
                request.user.wallet -= 1000
                request.user.save(force_update=True)
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Создание отряда {}'.format(request.POST['name']))
                new_log.save()
                PlayerLog.objects.create(player_id=player.id,
                                         log_action='Списание RC',
                                         comment='С баланса списано 1000 RC за создание отряда.'
                                                 'Прежний баланс {}, новый баланс {}'.format(old_wallet,
                                                                                             player.wallet)).save()
                return HttpResponseRedirect('/profile/' + request.user.nickname +'#squad')


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
                sector_to_buy.own = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
                messages.add_message(request, messages.SUCCESS, 'СЕКТОР ПРИОБРЕТЕН!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Покупка сектора {} отрядом {}  за {} '.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()
            else:
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Попытка покупка сектора {} отрядом {}  за {}. '
                                                            'Максимально можно иметь 1 сектор'.
                                                            format(sector_to_buy.name,
                                                            squad.name,
                                                            sector_to_buy.price))
                new_log.save()
                messages.add_message(request, messages.INFO, 'На данном уровне отряда можно иметь только 1 сектор!')

        if squad.level == 2:
            if sectors_count < 2:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                sector_to_buy.own = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
                messages.add_message(request, messages.SUCCESS, 'СЕКТОР ПРИОБРЕТЕН!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Покупка сектора {} отрядом {}  за {} '.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()
            else:
                messages.add_message(request, messages.INFO, 'На данном уровне отряда можно иметь только 2 сектора!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Попытка покупка сектора {} отрядом {}  за {}. '
                                                            'Максимально можно иметь 2 сектора'.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()
        if squad.level == 3:
            if sectors_count < 3:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                sector_to_buy.own = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
                messages.add_message(request, messages.SUCCESS, 'СЕКТОР ПРИОБРЕТЕН!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Покупка сектора {} отрядом {}  за {} '.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()
            else:
                messages.add_message(request, messages.INFO, 'На данном уровне отряда можно иметь только 3 сектора!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Попытка покупка сектора {} отрядом {}  за {}. '
                                                            'Максимально можно иметь 3 сектора'.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()

        if squad.level == 4:
            if sectors_count < 4:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                sector_to_buy.own = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
                messages.add_message(request, messages.SUCCESS, 'СЕКТОР ПРИОБРЕТЕН!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Покупка сектора {} отрядом {}  за {} '.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()
            else:
                messages.add_message(request, messages.INFO, 'На данном уровне отряда можно иметь только 4 сектора!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Попытка покупка сектора {} отрядом {}  за {}. '
                                                            'Максимально можно иметь 4 сектора'.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()

        if squad.level == 5:
            if sectors_count < 5:
                squad.balance -= sector_to_buy.price
                sector_to_buy.squad_id = squad.id
                sector_to_buy.own = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                squad.save(force_update=True)
                sector_to_buy.save(force_update=True)
                messages.add_message(request, messages.SUCCESS, 'СЕКТОР ПРИОБРЕТЕН!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Покупка сектора {} отрядом {}  за {} '.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()
            else:
                messages.add_message(request, messages.INFO, 'У отряда максимальное количество покупаемых секторов!')
                new_log = Logs.objects.create(player_id=request.user.id,
                                              player_action='Попытка покупка сектора {} отрядом {}  за {}. '
                                                            'Максимально можно иметь 5 сектор'.
                                              format(sector_to_buy.name,
                                                     squad.name,
                                                     sector_to_buy.price))
                new_log.save()

    else:
        messages.add_message(request, messages.WARNING, 'Нехватает денег для приобретения сектора!')
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка покупка сектора {} отрядом {}  за {}. '
                                                    'Не хватает денег'.
                                      format(sector_to_buy.name,
                                             squad.name,
                                             sector_to_buy.price))
        new_log.save()

    return HttpResponseRedirect('/squad/#sectors_map')


def add_to_balance(request):

    if request.POST:
        player = request.user
        squad = Squad.objects.get(id=request.POST.get('squad_id'))
        if player.wallet >= int(request.POST.get('rc_amount')) and int(request.POST.get('rc_amount')) >= 500:
            squad = Squad.objects.get(id=request.POST.get('squad_id'))
            squad_member = SquadMembers.objects.get(player=player.id)
            squad_member.income += int(request.POST.get('rc_amount'))
            squad_member.save(force_update=True)
            old_wallet = player.wallet
            old_rating = player.rating
            player.wallet -= int(request.POST.get('rc_amount'))
            player.rating += 1
            player.save(force_update=True)
            squad.balance += int(request.POST.get('rc_amount'))
            squad.save(force_update=True)
            messages.add_message(request, messages.SUCCESS,
                                     'Баланс отряда успешно пополнен на ' + request.POST.get('rc_amount') + ' RC')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Баланс отряда {} пополнен на {}'.
                                          format(squad.name,
                                                 request.POST.get('rc_amount')))
            new_log.save()
            PlayerLog.objects.create(player_id=player.id,
                                     log_action='Списание RC',
                                     comment='С баланса списано {} RC за перевод на баланс отряда.'
                                             'Прежний баланс {}, новый баланс {}'.format(request.POST.get('rc_amount'),
                                                                                         old_wallet,
                                                                                         player.wallet)).save()
            PlayerLog.objects.create(player_id=player.id,
                                     log_action='Начисление рейтинга',
                                     comment='За перевод более 500 RC на баланс отряда начислен рейтинг'
                                             'Прежнее значение {}, новое значение {}'.format(old_rating,
                                                                                             player.rating)).save()


        else:
            messages.add_message(request, messages.WARNING, 'Минимальная сумма пополнения 500 RC!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка пополнения баланса отряда {}  на {} '.
                                          format(squad.name,
                                                 request.POST.get('rc_amount')))
            new_log.save()


        return HttpResponseRedirect('/profile/' + request.user.nickname)

def show_squads(request):
    page_title = 'ОТРЯДЫ И ИГРОКИ СЕРВЕРА'
    print('show_squads')
    squad_active = 'active'
    squads = Squad.objects.all()
    players = SteamUser.objects.filter(is_active=True,is_staff=False).order_by('-rating')
    player = request.user
    print(player.id)
    req_disct = []
    sectors_a = SquadSectors.objects.filter(name__startswith='a').order_by('-name')
    sectors_b = SquadSectors.objects.filter(name__startswith='b').order_by('-name')
    sectors_c = SquadSectors.objects.filter(name__startswith='c').order_by('-name')
    sectors_d = SquadSectors.objects.filter(name__startswith='d').order_by('-name')
    wars = SectorWars.objects.all()
    try:
        squad_requests = SquadRequests.objects.filter(player_id=player.id)
    except:
        squad_requests = None
    if squad_requests:
        for req in squad_requests:
            req_disct.append(req.squad.id)
        print(req_disct)

    return render(request, 'squads/index_new.html', locals())

def join_request(request,name_slug):
    try:
        squad = Squad.objects.get(name_slug=name_slug)
    except:
        squad = None

    if squad:
        if request.user.id is not None:
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Подана заявка в отряд ' + squad.name)
            new_log.save()
            new_request = SquadRequests.objects.create(squad_id=squad.id, player_id=request.user.id)
            new_request.save()
            new_message = PrivateMessages.objects.create(to_player_id=squad.leader.id,
                                                         from_player_name=request.user.personaname,
                                                         from_player_name_slug=request.user.nickname,
                                                         from_player_avatar=str(request.user.avatar),
                                                         text='Привет, хочу вступить в твой отряд!')
            new_message.save()
            return HttpResponseRedirect('/squad/')
        else:

            return HttpResponseRedirect('/squad/')
    else:
        if request.user.id is not None:
            new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Подана заявка в несуществующий отряд ')
        else:
            new_log = Logs.objects.create(player_id=1,
                                          player_action='Подана заявка в несуществующий отряд от незареганного юзера ')
        new_log.save()
        return HttpResponseRedirect('/squad/')




def confirm_request(request):
    squad = Squad.objects.get(leader=request.user)
    members_count = SquadMembers.objects.filter(squad=squad).count()
    if squad.level == 1:
        if members_count < 3:
            pass
        else:
            messages.add_message(request, messages.INFO, 'На данном уровне отряда можно иметь только 3 человека в отряде!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка прием в отряд {} уровня игрока {}'
                                          .format(squad.level, request.GET.get('name')))
            new_log.save()
            squad.recruting = False
            squad.save(force_update=True)
    if squad.level == 2:
        if members_count < 4:
            pass
        else:
            messages.add_message(request, messages.INFO,
                                 'На данном уровне отряда можно иметь только 4 человека в отряде!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка прием в отряд {} уровня игрока {}'
                                          .format(squad.level, request.GET.get('name')))
            new_log.save()
            squad.recruting = False
            squad.save(force_update=True)
    if squad.level == 3:
        if members_count < 5:
            pass
        else:
            messages.add_message(request, messages.INFO,
                                 'На данном уровне отряда можно иметь только 5 человек в отряде!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка прием в отряд {} уровня игрока {}'
                                          .format(squad.level, request.GET.get('name')))
            new_log.save()
            squad.recruting = False
            squad.save(force_update=True)

    if squad.level == 4:
        if members_count < 6:
            pass
        else:
            messages.add_message(request, messages.INFO,
                                 'На данном уровне отряда можно иметь только 6 человек в отряде!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка прием в отряд {} уровня игрока {}'
                                          .format(squad.level, request.GET.get('name')))
            new_log.save()
            squad.recruting = False
            squad.save(force_update=True)

    if squad.level == 5:
        if members_count < 7:
            pass
        else:
            messages.add_message(request, messages.INFO,
                                 'В отряда можно иметь 7 человек максимум!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка прием в отряд {} уровня игрока {}'
                                          .format(squad.level, request.GET.get('name')))
            new_log.save()
            squad.recruting = False
            squad.save(force_update=True)

    if squad.recruting:
        req_user = SteamUser.objects.get(nickname=request.GET.get('name'))
        req_squad = SquadMembers.objects.create(squad_id=squad.id, player_id=req_user.id)
        req_squad.save()
        player_req = SquadRequests.objects.filter(player_id=req_user.id)
        player_req.delete()
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Прием в отряд {} уровня игрока {}'
                                      .format(squad.level, request.GET.get('name')))
        new_log.save()
    return HttpResponseRedirect('/profile/' + request.user.nickname)

def reject_request(request):
    req = SquadRequests.objects.get(id=int(request.GET.get('r_id')))
    squad = req.squad
    if request.user.id == squad.leader.id:
        req.delete()
        new_message = PrivateMessages.objects.create(to_player_id=req.player.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.nickname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Заявка на вступление отклонена')
        new_message.save()
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Отклонение заявки в отряд {} уровня игрока {}'
                                      .format(squad.level, req.player.personaname))
        new_log.save()
    return HttpResponseRedirect('/profile/' + request.user.nickname)

def kick_player(request,nickname):
    squad_member = SquadMembers.objects.get(player__nickname=nickname)

    squad = squad_member.squad
    if request.user.id == squad.leader.id:
        squad_member.delete()
        new_message = PrivateMessages.objects.create(to_player_id=squad_member.player.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.nickname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Привет, ты был кикнут из отряда.')
        new_message.save()
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Кик из отряда {}  игрока {}'
                                      .format(squad.name, squad_member.player.personaname))
        new_log.save()
    return HttpResponseRedirect('/profile/' + request.user.nickname)


def level_up(request):
    squad = Squad.objects.get(leader=request.user)

    if squad.level == 1:
        if squad.balance >= 1000:
            squad.balance -= 1000
            squad.level = 2
            squad.save(force_update=True)
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Поднятие уровня отряда {} с 1 до 2 уровня '
                                          .format(squad.name))
            new_log.save()
    elif squad.level == 2:
        if squad.balance >= 3000:
            squad.balance -= 3000
            squad.level = 3
            squad.recruting = True
            squad.save(force_update=True)
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Поднятие уровня отряда {} со 2 до 3 уровня '
                                          .format(squad.name))
            new_log.save()
    elif squad.level == 3:
        if squad.balance >= 5000:
            squad.balance -= 5000
            squad.level = 4
            squad.recruting = True
            squad.save(force_update=True)
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Поднятие уровня отряда {} с 3 до 4 уровня '
                                          .format(squad.name))
            new_log.save()
    elif squad.level == 4:
        if squad.balance >= 10000:
            squad.balance -= 10000
            squad.level = 5
            squad.recruting = True
            squad.save(force_update=True)
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Поднятие уровня отряда {} с 4 до 5 уровня '
                                          .format(squad.name))
            new_log.save()
    elif squad.level == 5:
        if squad.balance >= 15000:
            squad.balance -= 15000
            squad.level = 6
            squad.recruting = True
            squad.vip = True
            squad.save(force_update=True)
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Поднятие уровня отряда {} с 5 до ВИП уровня '
                                          .format(squad.name))
            new_log.save()

    messages.add_message(request, messages.INFO,
                         'Уровень отряда успешно повышен. Открыты новые возможности!')


    return HttpResponseRedirect('/profile/' + request.user.nickname)

def delete_squad(request):
    squad_to_delete = Squad.objects.get(leader=request.user)
    # SquadMembers.objects.filter(squad=squad_to_delete).delete()
    # SquadSectors.objects.filter(squad=squad_to_delete).update(squad=None)
    # SquadRequests.objects.filter(squad=squad_to_delete).delete()
    # SectorWars.objects.filter(enemy=squad_to_delete).delete()
    request.user.is_squad_leader = False
    request.user.rank = 'Бывалый'
    request.user.save(force_update=True)
    squad_to_delete.delete()
    new_log = Logs.objects.create(player_id=request.user.id,
                                  player_action='Удаление отряда {} '.format(squad_to_delete.name))
    new_log.save()

    return HttpResponseRedirect('/profile/' + request.user.nickname)


def sector_war(request, sector_name):
    no_war_at_week = False

    today = datetime.date.today()
    if today.weekday() == 6:
        sun = today + datetime.timedelta(7)
    else:
        sun = today + datetime.timedelta((6 - today.weekday()) % 7)
    sat = today + datetime.timedelta((5 - today.weekday()) % 7)

    print(sat)
    print(sun)
    webhook = DiscordWebhook(url=bot_settings.SECTOR_WAR_URL)


    sector = SquadSectors.objects.get(name=sector_name)
    print(sector)
    owner = sector.squad

    enemy = Squad.objects.get(leader=request.user)
    all_wars = SectorWars.objects.all()
    for war in all_wars:
        if war.enemy.id == enemy.id or war.sector.squad.id == owner.id:
            print('war.enemy')
            print(war.enemy.id)
            print(enemy.id)
            print('war.sector.squad')
            print(war.sector.squad.id)
            print(owner.id)
            no_war_at_week = True

    if no_war_at_week:
        messages.add_message(request, messages.WARNING, 'На этой неделе твой отряд или отряд противника'
                                                        ' уже участвует в боевых действиях')
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка оспаривание сектора {} . Отряды {} и {} '
                                                    'уже участвует в боевых действиях'.format(sector_name, owner.name, enemy.name))
        new_log.save()

    else:
        print(all_wars)
        if all_wars.count() == 2:
            print('даты заняты')
            messages.add_message(request, messages.WARNING, 'На этой неделе все даты зяняты!')
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Попытка оспаривание сектора {} . Все даты заняты'.format(sector_name))
            new_log.save()
        elif all_wars.count() == 0:
            new_war = SectorWars.objects.create(sector_id=sector.id,
                                                enemy_id=enemy.id,
                                                war_date=sat,
                                                for_bot_enemy_squad_name=enemy.name,
                                                for_bot_owner_name=owner.name,
                                                for_bot_sector_name=sector.name,
                                                for_bot_owner_discord_id=owner.leader.discord_id)
            sector.in_war = True
            sector.save(force_update=True)
            new_war.save()
            new_message = PrivateMessages.objects.create(to_player_id=sector.squad.leader.id,
                                                         from_player_name=enemy.leader.personaname,
                                                         from_player_name_slug=enemy.leader.nickname,
                                                         from_player_avatar=str(enemy.leader.avatar),
                                                         text='Наш отряд притендует на сектор {} . '
                                                              'По обоюдной договоренности бой состоится {} '
                                                              'в любое время с 17 до 22 МСК. '
                                                              'В случае отказа от боя, сектор переходит под наш контроль '
                                                              'автоматически. ;)'.format(sector.name, sat.strftime('%d-%m-%Y')))
            new_message.save()


            # create embed object for webhook
            embed = DiscordEmbed(title='ОСПАРИВАНИЯ СЕКТОРА : ' + sector_name, color=242424)
            embed.add_embed_field(name='Нападающие', value=enemy.name)
            embed.add_embed_field(name='Обороняющиеся', value=sector.squad.name)

            # add embed object to webhook
            webhook.add_embed(embed)

            webhook.execute()
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Заявка на оспаривание сектора {} . '
                                                        'Владелец : {}  Нападающий : {} Дата : {} '
                                                        'уже участвует в боевых действиях'.format(sector_name,
                                                                                                  owner.name,
                                                                                                  enemy.name,
                                                                                                  sat))
            new_log.save()
        elif all_wars.count() == 1:
            new_war = SectorWars.objects.create(sector_id=sector.id,
                                                enemy_id=enemy.id,
                                                war_date=sun,
                                                for_bot_enemy_squad_name=enemy.name,
                                                for_bot_owner_name=owner.name,
                                                for_bot_sector_name=sector.name,
                                                for_bot_owner_discord_id=owner.leader.discord_id)
            new_war.save()
            sector.in_war = True
            sector.save(force_update=True)
            new_message = PrivateMessages.objects.create(to_player_id=sector.squad.leader.id,
                                                         from_player_name=enemy.leader.personaname,
                                                         from_player_name_slug=enemy.leader.nickname,
                                                         from_player_avatar=str(enemy.leader.avatar),
                                                         text='Наш отряд притендует на сектор {} . '
                                                              'По обоюдной договоренности бой состоится {} '
                                                              'в любое время с 17 до 22 МСК. '
                                                              'В случае отказа от боя, сектор переходит под наш контроль '
                                                              'автоматически. ;)'.format(sector.name,
                                                                                         sun.strftime('%d-%m-%Y')))
            new_message.save()
            embed = DiscordEmbed(title='ОСПАРИВАНИЯ СЕКТОРА : ' + sector_name, color=242424)
            embed.add_embed_field(name='Нападающие', value=enemy.name)
            embed.add_embed_field(name='Обороняющиеся', value=sector.squad.name)

            # add embed object to webhook
            webhook.add_embed(embed)

            webhook.execute()
            new_log = Logs.objects.create(player_id=request.user.id,
                                          player_action='Заявка на оспаривание сектора {} . '
                                                        'Владелец : {}  Нападающий : {} Дата : {} '
                                                        'уже участвует в боевых действиях'.format(sector_name,
                                                                                                  owner.name,
                                                                                                  enemy.name,
                                                                                                  sun))
            new_log.save()

    return HttpResponseRedirect('/squad/#sectors_map')


def stat(request):
    if request.method =='GET':
        amount = request.GET.get('amount')
        if amount:
            users = SteamUser.objects.all()
            for u in users:
                old_wallet = u.wallet
                u.wallet += int(amount)
                u.save(force_update=True)
                PlayerLog.objects.create(player_id=u.id,
                                         log_action='Начисление RC',
                                         comment='На баланс начислено {} RC. Щедрость Андрея не знает границ;)'
                                                 'Прежний баланс {}, новый баланс {}'.format(amount,
                                                                                             old_wallet,
                                                                                             u.wallet)).save()

            webhook = DiscordWebhook(url=bot_settings.TIME_PAY_URL)
            embed = DiscordEmbed(title='Массовая выдача ЗП',
                                 description='', color=242424)

            embed.add_embed_field(name='Всем игрокам начислено :', value=amount + ' RC')

            webhook.add_embed(embed)

            webhook.execute()


    if request.method == 'POST' and request.FILES:
        kills_file = request.FILES['kills_file']
        deaths_file = request.FILES['deaths_file']
        time_file = request.FILES['time_file']
        fs = FileSystemStorage()

        filename = fs.save(kills_file.name, kills_file)
        uploaded_kills_file_url = fs.url(filename)

        filename = fs.save(deaths_file.name, deaths_file)
        uploaded_deaths_file_url = fs.url(filename)

        filename = fs.save(time_file.name, time_file)
        uploaded_time_file_url = fs.url(filename)

        # print(os.path.join(settings.BASE_DIR,uploaded_kills_file_url[1:]))

        with open(os.path.join(settings.BASE_DIR, uploaded_kills_file_url[1:])) as csvfile:
            reader = csv.DictReader(csvfile)
            k = 0
            for row in reader:
                k +=1
                r = row['steamid;kills'].split(';')
                try:
                    u = SteamUser.objects.get(steamid=r[0])
                    u.kills += int(r[1])
                    u.save(force_update=True)
                except:
                    pass
        with open(os.path.join(settings.BASE_DIR, uploaded_deaths_file_url[1:])) as csvfile:
            reader = csv.DictReader(csvfile)
            d = 0
            for row in reader:
                d += 1
                r = row['steamid;deaths'].split(';')
                try:
                    u = SteamUser.objects.get(steamid=r[0])
                    u.deaths += int(r[1])
                    u.save(force_update=True)
                except:
                    pass

        with open(os.path.join(settings.BASE_DIR, uploaded_time_file_url[1:])) as csvfile:
            reader = csv.DictReader(csvfile)
            p = 0
            total_players = 0
            total_rc = 0
            for row in reader:
                p += 1
                r = row['SteamID;DayPay;Rate'].split(';')
                try:
                    u = SteamUser.objects.get(steamid=r[0])
                    old_wallet = u.wallet
                    old_rating = u.rating
                    u.wallet += int(r[1])
                    u.rating += int(r[2])
                    u.save(force_update=True)
                    total_players +=1
                    total_rc +=int(r[1])
                    PlayerLog.objects.create(player_id=u.id,
                                             log_action='Начисление RC и рейтинга',
                                             comment='На баланс начислено {} RC и увеличен рейтинг на {} за время, проведенное в игре)'
                                                     'Прежний баланс {}, новый баланс {}. Прежний рейтинг {}, '
                                                     'Новый рейтинг {}'.format(r[1],
                                                                               r[2],
                                                                               old_wallet,
                                                                               u.wallet,
                                                                               old_rating,
                                                                               u.rating)).save()

                except:
                    pass

        webhook = DiscordWebhook(url=bot_settings.TIME_PAY_URL)
        embed = DiscordEmbed(title='Выдача премии за время в игре',
                             description='', color=242424)

        embed.add_embed_field(name='Количество игроков :' + str(total_players), value='Общая сумма : ' + str(total_rc) + ' RC. Проверяйте логи на сайте в ЛК ',  inline=False)
        webhook.add_embed(embed)
        webhook.execute()





        fs.delete(os.path.join(settings.BASE_DIR,uploaded_kills_file_url[1:]))
        fs.delete(os.path.join(settings.BASE_DIR, uploaded_deaths_file_url[1:]))
        fs.delete(os.path.join(settings.BASE_DIR, uploaded_time_file_url[1:]))

        return render(request, 'squads/stat.html', locals())
    return render(request, 'squads/stat.html', locals())

def leave_squad(request):
    squad_member = SquadMembers.objects.get(player_id=request.user.id)
    new_message = PrivateMessages.objects.create(to_player_id=squad_member.squad.leader.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.nickname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Я покинул отряд.')
    new_message.save()
    squad_member.delete()
    new_log = Logs.objects.create(player_id=request.user.id,
                                  player_action='Игрок {} покинул отряд {}'.format(request.user.personaname,
                                                                                   squad_member.squad.name))
    new_log.save()
    return HttpResponseRedirect('/profile/' + request.user.nickname)


def accept_war(request, sector_name):
    try:
        sector = SquadSectors.objects.get(name=sector_name)
    except:
        sector = None

    if sector:
        print(sector)
        webhook = DiscordWebhook(url=bot_settings.SECTOR_WAR_URL)
        war_sector = SectorWars.objects.get(sector=sector)
        enemy = war_sector.enemy
        war_sector.owner_agreed = True
        war_sector.save(force_update=True)
        new_message = PrivateMessages.objects.create(to_player_id=enemy.leader.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.nickname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Мы принимаем ваш вызов в секторе {} на {}'
                                                     .format(sector_name, war_sector.war_date.strftime('%d-%m-%Y')))
        new_message.save()
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Согласие на войну в секторе {} {}'
                                      .format(sector_name, war_sector.war_date.strftime('%d-%m-%Y')))
        new_log.save()
        embed = DiscordEmbed(title='ОСПАРИВАНИЯ СЕКТОРА {} СОСТОИТСЯ'.format(sector_name),
                             description='Дата : ' + war_sector.war_date.strftime('%d-%m-%Y'), color=242424)
        embed.add_embed_field(name='Нападающий отряд', value=enemy.name)
        embed.add_embed_field(name='Обороняющийся отряд', value=sector.squad.name)

        # add embed object to webhook
        webhook.add_embed(embed)

        webhook.execute()
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Отряд {} принял оспаривание сектора от отряда {} в секторе {}'
                                      .format(sector.squad.name,
                                              enemy.name,
                                              sector_name))
        new_log.save()
    else:
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка согласия на войну в секторе {}'
                                      .format(sector_name))
        new_log.save()

    return HttpResponseRedirect('/squad/#sectors_map')


def deny_war(request, sector_name):
    try:
        sector = SquadSectors.objects.get(name=sector_name)
    except:
        sector = None

    if sector:
        print(sector)
        webhook = DiscordWebhook(url=bot_settings.SECTOR_WAR_URL)
        war_sector = SectorWars.objects.get(sector=sector)
        enemy = war_sector.enemy


        new_message = PrivateMessages.objects.create(to_player_id=enemy.leader.id,
                                                     from_player_name=request.user.personaname,
                                                     from_player_name_slug=request.user.nickname,
                                                     from_player_avatar=str(request.user.avatar),
                                                     text='Мы не принимаем ваш вызов в секторе {} на {}'
                                                     .format(sector_name, war_sector.war_date.strftime('%d-%m-%Y')))
        new_message.save()
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Отказ от войны в секторе {} {}'
                                      .format(sector_name, war_sector.war_date.strftime('%d-%m-%Y')))
        new_log.save()
        # war_sector.delete()
        embed = DiscordEmbed(title='ОСПАРИВАНИЯ СЕКТОРА {} НЕ СОСТОИТСЯ'.format(sector_name),
                             description='Отряд {} не принял вызов от отряда {} . Сектор {} переходит к отряду {} !'
                             .format(sector.squad.name, enemy.name, sector_name, enemy.name), color=242424)


        # add embed object to webhook
        webhook.add_embed(embed)

        webhook.execute()
        sector.squad = enemy
        sector.in_war = False
        sector.save(force_update=True)
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Отряд {} не принял оспаривание сектора от отряда {} в секторе {}'
                                      .format(sector.squad.name,
                                              enemy.name,
                                              sector_name))
        new_log.save()
    else:
        new_log = Logs.objects.create(player_id=request.user.id,
                                      player_action='Попытка отказа от войны в секторе {}'
                                      .format(sector_name))
        new_log.save()

    return HttpResponseRedirect('/squad/#sectors_map')
