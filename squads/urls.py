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
    path('', views.show_squads, name='all_squads'),
    path('<name_slug>', views.join_request, name='join_request'),
    path('create_squad/', views.create_squad, name='create_squad'),
    path('confirm_request/', views.confirm_request, name='confirm_request'),
    path('reject_request/', views.reject_request, name='reject_request'),
    path('add_to_balance/', views.add_to_balance, name='add_to_balance'),
    path('kick_player/<nickname>', views.kick_player, name='kick_player'),
    path('level_up/', views.level_up, name='level_up'),
    path('delete_squad/', views.delete_squad, name='delete_squad'),
    path('buy_sector/', views.buy_sector, name='buy_sector'),
    path('sector_war/<sector_name>', views.sector_war, name='sector_war'),
    path('stat/', views.stat, name='stat'),


]
