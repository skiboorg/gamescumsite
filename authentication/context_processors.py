from .models import SteamUser

def check_profile(request):
    if request.user.is_authenticated:
        if request.user.discord_id == '':
            profile_bad = True
        else:
            profile_bad = False

    return locals()