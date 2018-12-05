from django.contrib.auth import logout
from django.shortcuts import render
from authentication.models import SteamUser
from django.shortcuts import HttpResponseRedirect


def index(request):
    page_title = 'ГЛАВНАЯ'
    index_page_active = 'active'




    return render(request, 'pages/index.html', locals())


def login(request):
    page_title = 'ГЛАВНАЯ'
    index_page_active = 'active'
    return render(request, 'pages/index.html', locals())


def logout_page(request):

    logout(request)
    return render(request, 'pages/index.html', locals())