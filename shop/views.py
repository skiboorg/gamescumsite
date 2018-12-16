from django.http import JsonResponse
from django.shortcuts import render
from shop.models import *
from authentication.models import SteamUser


def shop_home(request):
    shop_active = 'active'
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
    player = request.user

    hot_items = Items.objects.all().order_by('-buys')[:4]
    return render(request, 'shop/index.html', locals())


def shop_show_cat(request, cat_slug):
    shop_active = 'active'
    all_categories = Categories.objects.all()
    current_cat = Categories.objects.filter(name_slug=cat_slug).first()
    items = Items.objects.filter(category__name_slug=cat_slug).all()
    hot_items = Items.objects.all().order_by('-buys')[:4]
    cat_name = current_cat.name
    return render(request, 'shop/index.html', locals())


def add_to_cart(request):
    return_dict = {}
    data = request.POST
    item_id = int(data.get('item_id'))
    item_number = int(data.get('item_number'))
    addtocart, created = Baskets.objects.get_or_create(player_id=request.user.id,
                                                       item_id=item_id, defaults={'number': item_number})
    if not created:
        addtocart.number += int(item_number)
        addtocart.save(force_update=True)
    all_items_in_cart = Baskets.objects.filter(player_id=request.user.id)
    count_items_in_cart = all_items_in_cart.count()
    total_cart_price = 0

    return_dict['total_items_in_cart'] = count_items_in_cart
    return_dict['all_items'] = list()
    for item in all_items_in_cart:
        total_cart_price += item.total_price
        item_dict = dict()
        item_dict['id'] = item.item.id
        item_dict['name'] = item.item.name
        item_dict['category'] = item.item.category.name
        item_dict['price'] = item.current_price
        item_dict['total_price'] = item.total_price
        item_dict['number'] = item.number
        item_dict['image'] = str(item.item.image)
        return_dict['all_items'].append(item_dict)

    return_dict['total_cart_price'] = total_cart_price
    return_dict['player_wallet'] = request.user.wallet
    return JsonResponse(return_dict)


def delete_from_cart(request):
    return_dict = {}
    data = request.POST
    item_id = int(data.get('item_id'))
    Baskets.objects.filter(player_id=request.user.id, item_id=item_id).delete()
    all_items_in_cart = Baskets.objects.filter(player_id=request.user.id)
    count_items_in_cart = all_items_in_cart.count()
    total_cart_price = 0

    return_dict['total_items_in_cart'] = count_items_in_cart
    return_dict['all_items'] = list()
    for item in all_items_in_cart:
        total_cart_price += item.total_price
        item_dict = dict()
        item_dict['id'] = item.item.id
        item_dict['name'] = item.item.name
        item_dict['category'] = item.item.category.name
        item_dict['price'] = item.current_price
        item_dict['total_price'] = item.total_price
        item_dict['number'] = item.number
        item_dict['image'] = str(item.item.image)
        return_dict['all_items'].append(item_dict)

    return_dict['total_cart_price'] = total_cart_price
    return_dict['player_wallet'] = request.user.wallet

    return JsonResponse(return_dict)


def place_order(request):
    return_dict = {}
    data = request.POST
    total_price = int(data.get('total_price'))
    if total_price > request.user.wallet:
        return_dict['place_order_status'] = '0'
        return_dict['money_need'] = total_price - request.user.wallet
    else:
        order = Orders.objects.create(player_id=request.user.id, total_price=total_price)
        all_cart_items = Baskets.objects.filter(player_id=request.user.id)
        for item in all_cart_items:
            ItemsInOrder.objects.create(order_id=order.id, item_id=item.item.id, number=item.number, current_price=item.item.price)
            item.item.buys = item.item.buys + 1
            item.item.save(force_update=True)

        all_cart_items.delete()
        player = SteamUser.objects.get(id=request.user.id)
        player.wallet = player.wallet - order.total_price
        player.save(force_update=True)

        return_dict['place_order_status'] = '1'



    return JsonResponse(return_dict)
