from django.shortcuts import render
from django.shortcuts import render
from shop.models import Categories,Items


def shop_home(request):
    order = request.GET.get('order')

    all_categories = Categories.objects.all()
    items_all = Items.objects.all()
    if request.GET.get('order') == 'price_gte':
         items = items_all.order_by('-price')
    elif request.GET.get('order') == 'price_lte':
         items = items_all.order_by('price')
    elif request.GET.get('order') == 'age_gte':
         items = items_all.order_by('-created_at')
    elif request.GET.get('order') == 'age_lte':
         items = items_all.order_by('created_at')
    elif request.GET.get('order') == 'discount':
         items = items_all.order_by('discount')
    else:
        items = items_all
    cat_name = 'ВСЕ ПРЕДЛОЖЕНИЯ'
    hot_items = Items.objects.all().order_by('buys')[:4]
    return render(request, 'shop/index.html', locals())

def shop_show_cat(request,cat_slug):

    all_categories = Categories.objects.all()
    current_cat = Categories.objects.filter(name_slug=cat_slug).first()

    items = Items.objects.filter(category__name_slug=cat_slug).all()
    hot_items = Items.objects.all().order_by('buys')[:4]
    cat_name = current_cat.name

    return render(request, 'shop/index.html', locals())

