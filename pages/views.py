from django.contrib.auth import logout
from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from news.models import News
from authentication.forms import EditProfileForm
from authentication.models import SteamUser
import json
import requests




def index(request):
    page_title = 'ГЛАВНАЯ'
    index_page_active = 'active'
    news = News.objects.all()
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
        for i in json_data['response']['games']:
            if i['appid'] == 513710:
                played_time = int(i['playtime_forever']) / 60
        return played_time

    if request.POST:

        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()

        return render(request, 'pages/ownprofile.html', locals())


    else:
        if request.user.is_authenticated:
            if nickname_req == request.user.nickname:
                own_profile = True
                player = request.user
                form = EditProfileForm(instance=request.user)
                return render(request, 'pages/ownprofile.html', locals())
            else:
                own_profile = False
                player = SteamUser.objects.filter(nickname=nickname_req).first()
                return render(request, 'pages/profile.html', locals())
        else:
            own_profile = False
            player = SteamUser.objects.filter(nickname=nickname_req).first()
            print(get_play_time(player.steamid))
            return render(request, 'pages/profile.html', locals())



def own_profile(request):
    own_profile = True
    player = request.user
    form = EditProfileForm(instance=request.user)
    return render(request, 'pages/ownprofile.html', locals())
