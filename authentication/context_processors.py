from authentication.models import PrivateMessages
from squads.models import Squad,SquadMembers,SquadSectors,SectorWars
from shop.models import Orders
from datetime import datetime, timedelta

def check_profile(request):
    if request.user.is_authenticated:

        player = request.user
        last_login = player.last_vizit
        time_now = datetime.now().date()

        pm = PrivateMessages.objects.filter(to_player_id=player.id).order_by('-created')
        orders_count = Orders.objects.filter(player_id=player.id, is_complete=False).count()

        if player.rating > player.level * 99:
            player.level += 1
            player.save(force_update=True)

        if not player.vip and player.rating > 500:
            player.vip = True
            player.rank = 'VIP'
            player.save(force_update=True)


        if time_now > player.last_buy:
            player.buys_count = 0

        # проверка последнего входа на сайт и начисление ЗП

        if time_now > last_login:
            if player.vip:
                player.rating += 5
                player.wallet += 60
                player.last_vizit = datetime.now().date()
                player.save(force_update=True)
            else:

                if not player.outlaw:
                    player.rating += 1
                    player.wallet += 30
                    player.last_vizit = datetime.now().date()
                    player.save(force_update=True)

        #проверка срока действия вип статуса

        if player.vip:
            if player.vip_start + timedelta(days=30) < time_now:
                print('is_not_vip')
                player.vip = False
                player.save(force_update=True)
                is_vip = False
            else:
                print('is_vip')
                print(time_now)
                print(player.vip_start + timedelta(days=30))
                print(player.vip_start)
                is_vip = True

        # проверка активирован ли аккаунт через дискорд

        if player.discord_id == None:
            profile_bad = True
        else:
            profile_bad = False

    return locals()

def get_player_squad_info(request):
    in_war = False
    if request.user.is_authenticated:
        player = request.user
        try:
            player_squad_member = SquadMembers.objects.get(player=player.id)
            player_squad = player_squad_member.squad
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