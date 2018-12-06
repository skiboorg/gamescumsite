from django.contrib.auth import logout
from django.shortcuts import render
from news.models import News
from authentication.forms import EditProfileForm
from authentication.models import SteamUser

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
    if request.POST:
        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return render(request, 'pages/profile.html', locals())
        else:
            return render(request, 'pages/profile.html', locals())
    else:

        if request.user.is_authenticated:
            if nickname_req == request.user.nickname:
                own_profile = True
                player = request.user
                form = EditProfileForm(instance=request.user)
            else:
                own_profile = False
                player = SteamUser.objects.filter(nickname=nickname_req).first()

            print(own_profile)
            print(request.user.nickname)
        else:
            own_profile = False
            player = SteamUser.objects.filter(nickname=nickname_req).first()






        return render(request, 'pages/profile.html', locals())
