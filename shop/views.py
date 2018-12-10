from django.shortcuts import render
from django.shortcuts import render
from shop.models import Categories,Items


def shop_home(request):
    all_categories = Categories.objects.all()
    items = Items.objects.all()
    cat_name = 'ВСЕ ПРЕДЛОЖЕНИЯ'
    return render(request, 'shop/index.html', locals())

def shop_show_cat(request,cat_slug):
    all_categories = Categories.objects.all()
    current_cat = Categories.objects.filter(name_slug=cat_slug).first()
    items = Items.objects.filter(category__name_slug=cat_slug).all()
    cat_name = current_cat.name
    return render(request, 'shop/index.html', locals())

