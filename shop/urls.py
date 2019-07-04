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
    path('', views.shop_home, name='shop_home'),
    path('category/<cat_slug>', views.shop_show_cat, name='shop_show_cat'),
    path('item/<item_slug>', views.shop_show_item, name='shop_show_item'),
    path('set/<set_slug>', views.shop_show_set, name='shop_show_set'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('delete_from_cart/', views.delete_from_cart, name='delete_from_cart'),
    path('place_order/', views.place_order, name='place_order'),

]
