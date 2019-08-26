"""untitled1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),

    path('login/', views.login, name='login'),
    path('logout/', views.logout_page, name='logout'),
    path('profile/<nickname_req>', views.profile, name='profile'),
    path('del_message/', views.del_message, name='del_message'),
    path('bonus_pack/', views.bonus_pack, name='bonus_pack'),
    path('reset_limit/', views.reset_limit, name='reset_limit'),
    path('about_us/', views.about_us, name='about_us'),
    path('rules/', views.rules, name='rules'),
    path('support/', views.support, name='support'),
    path('add_to_player_balance/', views.add_to_player_balance, name='add_to_player_balance'),
    path('about_bonus_pack/', views.about_bonus_pack, name='about_bonus_pack'),
    path('players/', views.players, name='players'),
    path('settings/', views.settings, name='settings'),
    path('server_stat/', views.server_stat, name='server_stat'),
    path('discord/', views.discord, name='discord'),
    path('vip/', views.vip, name='vip'),
    path('buy_vip/', views.buy_vip, name='buy_vip'),
    path('chat_log/', views.chat_log, name='chat_log'),
    path('kill_log/', views.kill_log, name='kill_log'),




    # path('statistic/', views.statistic, name='statistic'),

]
