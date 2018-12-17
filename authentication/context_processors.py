from authentication.models import PrivateMessages
from squads.models import Squad,SquadMembers,SquadSectors

def check_profile(request):
    if request.user.is_authenticated:
        pm = PrivateMessages.objects.filter(to_player_id=request.user.id)
        if request.user.discord_id == '':
            profile_bad = True
        else:
            profile_bad = False

    return locals()

def get_player_squad_info(request):
    if request.user.is_authenticated:
        try:
            player_squad_member = SquadMembers.objects.get(player=request.user.id)
            player_squad = player_squad_member.squad
            player_squad_sector = SquadSectors.objects.filter(squad=player_squad.id)
            print(player_squad_sector)

        except:
            player_squad_member = None

    return locals()