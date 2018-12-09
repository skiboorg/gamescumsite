from django.shortcuts import render
from django.shortcuts import render


def shop_home(request):
    return render(request, 'shop/index.html', locals())

