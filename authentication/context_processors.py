from authentication.models import PrivateMessages, PlayerLog
from squads.models import Squad,SquadMembers,SquadSectors,SectorWars
from shop.models import Orders
from datetime import datetime, timedelta

def check_profile(request):
    if request.user.is_authenticated:

        player = request.user
        player_wallet = player.wallet
        last_login = player.last_vizit
        time_now = datetime.now().date()

        pm = PrivateMessages.objects.filter(to_player_id=player.id).order_by('-created')
        print('PM')
        print(pm)
        orders_count = Orders.objects.filter(player_id=player.id, is_complete=False).count()
        print('or_count: {}'.format(orders_count))

        if player.rating > player.level * 99:
            player.level += 1
            player.save(force_update=True)
            PlayerLog.objects.create(player_id=player.id,
                                     log_action='Поднятие уровня',
                                     comment='Твой уровень был увеличен на 1').save()

        # if not player.vip and player.rating > 500:
        #     player.vip = True
        #     player.rank = 'VIP'
        #     player.save(force_update=True)

        # проверка активирован ли аккаунт через дискорд
        if player.discord_id == None:
            profile_bad = True
        else:
            profile_bad = False

            if time_now > last_login:
                if player.vip:
                    old_rating = player.rating
                    old_wallet = player.wallet
                    player.rating += 2
                    player.wallet += 50
                    player.last_vizit = datetime.now().date()
                    player.save(force_update=True)
                    PlayerLog.objects.create(player_id=player.id,
                                             log_action='Начисление рейтинга и RC (с учетом VIP) за ежедневный вход на сайт',
                                             comment='Прежний рейтинг {} , новый рейтинг {}. Прежний баланс {} ,'
                                                     ' новый баланс {}'.format(old_rating,
                                                                               player.rating,
                                                                               old_wallet,
                                                                               player.wallet)).save()
                else:
                    if not player.outlaw:
                        old_rating = player.rating
                        old_wallet = player.wallet
                        player.rating += 1
                        player.wallet += 25
                        player.last_vizit = datetime.now().date()
                        player.save(force_update=True)
                        PlayerLog.objects.create(player_id=player.id,
                                                 log_action='Начисление рейтинга и RC за ежедневный вход на сайт',
                                                 comment='Прежний рейтинг {} , новый рейтинг {}. Прежний баланс {} ,'
                                                         ' новый баланс {}'.format(old_rating,
                                                                                   player.rating,
                                                                                   old_wallet,
                                                                                   player.wallet)).save()

            # проверка срока действия вип статуса

            if player.vip:
                if player.vip_start + timedelta(days=30) < time_now:
                    print('is_not_vip')
                    player.vip = False
                    player.save(force_update=True)
                    is_vip = False
                    PlayerLog.objects.create(player_id=player.id,
                                             log_action='Отмена VIP',
                                             comment='VIP статус был отменен, т.к. закончен срок его действия').save()
                else:
                    print('is_vip')
                    print(time_now)
                    print(player.vip_start + timedelta(days=30))
                    print(player.vip_start)
                    is_vip = True



        if time_now > player.last_buy:
            player.buys_count = 0
            player.save(force_update=True)

        # проверка последнего входа на сайт и начисление ЗП
        #todo добавить начисление ЗП от уровня отряда Если игрок (Pl1) в отряде (SQ1) ур. zp = 35 + ур. SQ1*5





    return locals()

def get_player_squad_info(request):
    in_war = False
    if request.user.is_authenticated:
        player = request.user
        try:
            player_squad_member = SquadMembers.objects.get(player=player.id)
            player_squad = player_squad_member.squad

            player_squad_server = player_squad_member.squad.server
            if player_squad_server == 0:
                player_squad_server_name = 'Сервер #1 (Общий)'
            elif player_squad_server == 1:
                player_squad_server_name = 'Сервер #2 (Приватный)'

            player_squad_sector = SquadSectors.objects.filter(squad=player_squad.id)
            for sect in player_squad_sector:
                if sect.in_war:
                    in_war = True
            if player.id == player_squad.leader.id:
                sector_wars = SectorWars.objects.filter(sector__in=player_squad_sector)
            print(player_squad_sector)

        except:
            player_squad_member = None

    return locals()