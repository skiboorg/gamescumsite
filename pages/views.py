from django.contrib.auth import logout
from django.shortcuts import render
from news.models import News




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