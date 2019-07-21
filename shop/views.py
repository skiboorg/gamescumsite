from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from shop.models import *
from authentication.models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from collections import defaultdict
import json
from django.conf import settings
import bot_settings
from discord_webhook import DiscordWebhook, DiscordEmbed


def shop_home(request):
    fav_items_dict = defaultdict(list)
    i = 0
    shop_active = 'active'
    page_title = 'BLACKMARKET'
    order = request.GET.get('order')
    all_categories = Categories.objects.all().filter(active=True)
    items_all = Items.objects.all().filter(active=True)
    sets = Set.objects.all()
    favorites = FavoriteItems.objects.filter(player_id=request.user.id)
    for favorite in favorites:
        try:
            fav_items_dict[i].append({"item_id": favorite.item.id, "subitem_id": 0})
        except:
            pass
        try:
            fav_items_dict[i].append({"item_id": 0, "subitem_id": favorite.subitem.id})
        except:
            pass
        i +=1
    fav_items = json.dumps(dict(fav_items_dict))
    page = request.GET.get('page')




    if request.GET.get('order') == 'price_gte':
        items_qs = items_all.order_by('-price')
        param = 'price_gte'

    elif request.GET.get('order') == 'price_lte':
        items_qs = items_all.order_by('price')
        param = 'price_lte'
    elif request.GET.get('order') == 'age_gte':
        items_qs = items_all.order_by('-created_at')
        param = 'age_gte'
    elif request.GET.get('order') == 'age_lte':
        items_qs = items_all.order_by('created_at')
        param = 'age_lte'
    elif request.GET.get('order') == 'discount':
        items_qs = items_all.order_by('-discount')
        param = 'discount'
    else:
        items_qs = items_all
        param = None

    items_paginator = Paginator(items_qs, 9)

    try:
        items = items_paginator.get_page(page)
    except PageNotAnInteger:
        items = items_paginator.page(1)
    except EmptyPage:
        items = items_paginator.page(items_paginator.num_pages)


    cat_name = 'ВСЕ ПРЕДЛОЖЕНИЯ'
    player = request.user

    hot_items = Items.objects.all().order_by('-buys').filter(active=True)[:6]
    return render(request, 'shop/index_new.html', locals())


def shop_show_cat(request, cat_slug):
    fav_items_dict = defaultdict(list)
    i=0
    page_title = 'BLACKMARKET'
    shop_active = 'active'
    all_categories = Categories.objects.all().filter(active=True)
    sets = Set.objects.all()
    favorites = FavoriteItems.objects.filter(player_id=request.user.id)

    for favorite in favorites:
        try:
            fav_items_dict[i].append({"item_id": favorite.item.id,"subitem_id": 0})
        except:
            pass
        try:
            fav_items_dict[i].append({"item_id": 0, "subitem_id": favorite.subitem.id})
        except:
            pass
        i +=1
    fav_items = json.dumps(dict(fav_items_dict))
    print(json.dumps(fav_items))

    current_cat = all_categories.get(name_slug=cat_slug)
    items = Items.objects.filter(category__name_slug=cat_slug).all().filter(active=True)
    hot_items = Items.objects.all().order_by('-buys').filter(active=True)[:6]
    cat_name = current_cat.name
    print(current_cat)
    return render(request, 'shop/index_new.html', locals())

def search(request):
    fav_items_dict = defaultdict(list)
    i = 0
    sets = Set.objects.all()
    favorites = FavoriteItems.objects.filter(player_id=request.user.id)
    for favorite in favorites:
        try:
            fav_items_dict[i].append({"item_id": favorite.item.id, "subitem_id": 0})
        except:
            pass
        try:
            fav_items_dict[i].append({"item_id": 0, "subitem_id": favorite.subitem.id})
        except:
            pass
        i += 1
    fav_items = json.dumps(dict(fav_items_dict))
    page_title = 'BLACKMARKET'
    all_categories = Categories.objects.all().filter(active=True)
    try:
        query = request.GET.get('query').lower()
    except:
        query = ''
    items = Items.objects.filter(name_lower__contains=query)

    return render(request, 'shop/index_new.html', locals())

def shop_show_item(request, item_slug):
    item = Items.objects.get(name_slug=item_slug, active=True )
    favorites = FavoriteItems.objects.filter(player_id=request.user.id)
    favorites_id = []
    favorites_subitem_id = []
    for favorite in favorites:
        try:
            favorites_id.append(favorite.item.id)
        except:
            pass
        try:
            favorites_subitem_id.append(favorite.subitem.id)
        except:
            pass

    print(favorites_id)

    subitems = SubItem.objects.filter(item=item)

    return render(request, 'shop/item.html', locals())

def shop_show_set(request, set_slug):
    all_set_items = defaultdict(list)
    i=0
    set_item = Set.objects.get(name_slug=set_slug)
    set_items = set_item.items_set.all()
    set_subitems = set_item.subitem_set.all()
    for item in set_items:
        all_set_items[i].append({"item_id": item.id,"subitem_id": 0})
        i += 1
    for item in set_subitems:
        all_set_items[i].append({"item_id": 0,"subitem_id":  item.id})
        i += 1
        i +=1
    total_set_items = json.dumps(dict(all_set_items))

    print(total_set_items)
    return render(request, 'shop/set.html', locals())

def mass_to_cart(request):
    return_dict = {}
    data = request.POST
    items = []
    subitems = []
    return_dict['new_items'] = list()


    f_items = json.loads(data['fav_items'])
    print('FAVORITE ITEMS')
    print(f_items)

    for i in f_items:
        if f_items[i][0]['item_id'] != 0:
            items.append(f_items[i][0]['item_id'])
        if f_items[i][0]['subitem_id'] != 0:
            subitems.append(f_items[i][0]['subitem_id'])
    print(items)
    print(subitems)

    for item in items:
        items_dict = dict()
        item_fetch = Items.objects.get(id=item)
        items_dict['name'] = item_fetch.name
        items_dict['image'] = str(item_fetch.image)
        return_dict['new_items'].append(items_dict)
        addtocart, created = Baskets.objects.get_or_create(player_id=request.user.id,item_id=item, defaults={'number': 1})
        if not created:
            addtocart.number += 1
            addtocart.save(force_update=True)
    for subitem in subitems:
        subitems_dict = dict()
        item_fetch = SubItem.objects.get(id=subitem)
        subitems_dict['name'] = item_fetch.item.name + ' ' + item_fetch.color_name
        subitems_dict['image'] = str(item_fetch.image)
        return_dict['new_items'].append(subitems_dict)
        addtocart, created = Baskets.objects.get_or_create(player_id=request.user.id,subitem_id=subitem, defaults={'number': 1})
        if not created:
            addtocart.number += 1
            addtocart.save(force_update=True)

    all_items_in_cart = Baskets.objects.filter(player_id=request.user.id)
    count_items_in_cart = all_items_in_cart.count()
    total_cart_price = 0

    return_dict['total_items_in_cart'] = count_items_in_cart
    return_dict['all_items'] = list()
    for item in all_items_in_cart:

        total_cart_price += item.total_price

        item_dict = dict()
        try:
            print('item id {}'.format(item.item.id))
            item_dict['id'] = item.item.id
            item_dict['name'] = item.item.name
            item_dict['category'] = item.item.category.name
            item_dict['price'] = item.current_price
            item_dict['total_price'] = item.total_price
            item_dict['number'] = item.number
            item_dict['subitem'] = 'no'
            item_dict['image'] = str(item.item.image)
            return_dict['all_items'].append(item_dict)
        except:
            print('item id none')
        try:
            print('subitem id {}'.format(item.subitem.id))
            item_dict['id'] = item.subitem.id
            item_dict['name'] = item.subitem.item.name + ' ' + item.subitem.color_name
            item_dict['category'] = item.subitem.item.category.name
            item_dict['price'] = item.current_price
            item_dict['total_price'] = item.total_price
            item_dict['number'] = item.number
            item_dict['subitem'] = 'yes'
            item_dict['image'] = str(item.subitem.image)
            return_dict['all_items'].append(item_dict)
        except:
            print('subitem id none')

    return_dict['total_cart_price'] = total_cart_price
    return_dict['player_wallet'] = request.user.wallet
    return JsonResponse(return_dict)

def add_to_cart(request):
    return_dict = {}
    data = request.POST
    item_id = int(data.get('item_id'))
    item_number = int(data.get('item_number'))
    item_subitem = int(data.get('item_subitem'))
    if item_subitem == 0:
        addtocart, created = Baskets.objects.get_or_create(player_id=request.user.id,
                                                           item_id=item_id, defaults={'number': item_number})
        if not created:
            addtocart.number += int(item_number)
            addtocart.save(force_update=True)
    else:
        addtocart, created = Baskets.objects.get_or_create(player_id=request.user.id,
                                                            subitem_id=item_subitem, defaults={'number': item_number})
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
        try:
            print('item id {}'.format(item.item.id))
            item_dict['id'] = item.item.id
            item_dict['name'] = item.item.name
            item_dict['category'] = item.item.category.name
            item_dict['price'] = item.current_price
            item_dict['total_price'] = item.total_price
            item_dict['number'] = item.number
            item_dict['subitem'] = 'no'
            item_dict['image'] = str(item.item.image)
            return_dict['all_items'].append(item_dict)
        except:
            print('item id none')
        try:
            print('subitem id {}'.format(item.subitem.id))
            item_dict['id'] = item.subitem.id
            item_dict['name'] = item.subitem.item.name + ' ' + item.subitem.color_name
            item_dict['category'] = item.subitem.item.category.name
            item_dict['price'] = item.current_price
            item_dict['total_price'] = item.total_price
            item_dict['number'] = item.number
            item_dict['subitem'] = 'yes'
            item_dict['image'] = str(item.subitem.image)
            return_dict['all_items'].append(item_dict)
        except:
            print('subitem id none')




    return_dict['total_cart_price'] = total_cart_price
    return_dict['player_wallet'] = request.user.wallet
    return JsonResponse(return_dict)


def add_to_favorite(request):
    return_dict = {}
    data = request.POST
    item_id = int(data.get('item_id'))
    subitem_id = int(data.get('subitem_id'))

    if item_id != 0:
        #newitem = FavoriteItems.objects.create(player_id=request.user.id,item_id=item_id)
        addtofav, created = FavoriteItems.objects.get_or_create(player_id=request.user.id, item_id=item_id)
        if not created:
            addtofav.delete()
            return_dict['action'] = 'deleted'
        else:
            return_dict['action'] = 'added'
    if subitem_id != 0:
        addtofav, created = FavoriteItems.objects.get_or_create(player_id=request.user.id, subitem_id=subitem_id)
        if not created:
            addtofav.delete()
            return_dict['action'] = 'deleted'
        else:
            return_dict['action'] = 'added'


    return JsonResponse(return_dict)

def delete_from_cart(request):
    return_dict = {}
    data = request.POST
    item_id = int(data.get('item_id'))
    subitem_id = int(data.get('subitem_id'))
    if item_id != 0:
        Baskets.objects.filter(player_id=request.user.id, item_id=item_id).delete()
    if subitem_id != 0:
        Baskets.objects.filter(player_id=request.user.id, subitem_id=subitem_id).delete()
    all_items_in_cart = Baskets.objects.filter(player_id=request.user.id)
    count_items_in_cart = all_items_in_cart.count()
    total_cart_price = 0

    return_dict['total_items_in_cart'] = count_items_in_cart
    return_dict['all_items'] = list()
    for item in all_items_in_cart:
        total_cart_price += item.total_price
        item_dict = dict()
        try:
            print('item id {}'.format(item.item.id))
            item_dict['id'] = item.item.id
            item_dict['name'] = item.item.name
            item_dict['category'] = item.item.category.name
            item_dict['price'] = item.current_price
            item_dict['total_price'] = item.total_price
            item_dict['number'] = item.number
            item_dict['subitem'] = 'no'
            item_dict['image'] = str(item.item.image)
            return_dict['all_items'].append(item_dict)
        except:
            print('item id none')
        try:
            print('subitem id {}'.format(item.subitem.id))
            item_dict['id'] = item.subitem.id
            item_dict['name'] = item.subitem.item.name + ' ' + item.subitem.color_name
            item_dict['category'] = item.subitem.item.category.name
            item_dict['price'] = item.current_price
            item_dict['total_price'] = item.total_price
            item_dict['number'] = item.number
            item_dict['subitem'] = 'yes'
            item_dict['image'] = str(item.subitem.image)
            return_dict['all_items'].append(item_dict)
        except:
            print('subitem id none')

    return_dict['total_cart_price'] = total_cart_price
    return_dict['player_wallet'] = request.user.wallet

    return JsonResponse(return_dict)

def order(request):
    player = request.user
    cart_items = Baskets.objects.filter(player_id=player.id)
    print('cart_items')
    print(cart_items)
    total_cart_price = 0
    buy_count = 0
    buy_limit = False
    for item in cart_items:
        total_cart_price += item.total_price
    if player.wallet < total_cart_price:
        no_money = True
    else:
        no_money = False
    if player.vip:
        if player.buys_count >= 5:
            buy_limit = True
        else:
            buy_count = 5 - player.buys_count
    else:
        if player.buys_count >= 3:
            buy_limit = True
        else:
            buy_count = 3 - player.buys_count


    print('total_cart_price')
    print(total_cart_price)
    return render(request, 'shop/order.html', locals())


def place_order(request):
    player = request.user
    all_cart_items = Baskets.objects.filter(player_id=player.id)
    total_price = 0
    print(request.POST)
    for item in all_cart_items:
        total_price += item.total_price
    data = request.POST
    server = int(data.get('server'))

    spawn_txt = '#teleportto ' + player.steamid + '\n'



    order = Orders.objects.create(player_id=player.id, server=server , total_price=total_price)

    for item in all_cart_items:

        try:
            print(item)
            ItemsInOrder.objects.create(order_id=order.id, item_id=item.item.id, number=item.number, current_price=item.item.price)
            item.item.buys = item.item.buys + 1
            item.item.save(force_update=True)
            spawn_txt += '#spawnItem ' + item.item.item_spawn_name + ' ' + str(item.number) + '\n'
        except:
            print(item)
            ItemsInOrder.objects.create(order_id=order.id, subitem_id=item.subitem.id, number=item.number,
                                        current_price=item.subitem.price)
            item.subitem.buys = item.subitem.buys + 1
            item.subitem.save(force_update=True)
            spawn_txt += '#spawnItem ' + item.subitem.item_spawn_name + ' ' + str(item.number) + '\n'



    all_cart_items.delete()
    order.spawn_text = spawn_txt
    order.save(force_update=True)
    player.wallet = player.wallet - order.total_price
    player.total_buys_count += 1
    player.buys_count += 1
    player.last_buy = datetime.now().date()

    if player.vip and order.total_price >= 500:
        player.rating += 3
    if not player.vip and order.total_price >= 500:
        player.rating += 1

    player.total_buys_summ += order.total_price
    player.save(force_update=True)

    admins = SteamUser.objects.filter(is_staff=True)
    for admin in admins:
        new_message = PrivateMessages.objects.create(to_player_id=admin.id,
                                                     from_player_name=player.personaname,
                                                     from_player_name_slug=player.nickname,
                                                     from_player_avatar=str(player.avatar),
                                                     text='Я сделал заказ в магазине. '
                                                          'Номер заказа : {} . Мой дискорд {} '
                                                          .format(str(order.id), player.discord_nickname))
        new_message.save()

    webhook = DiscordWebhook(url=bot_settings.SHOP_ADMIN_URL)
    embed = DiscordEmbed(title='НОВЫЙ ЗАКАЗ №{}'.format(order.id),
                         description='Дата заказа : ' + order.created_at.strftime('%d-%m-%Y'), color=0xec4e00)
    embed.add_embed_field(name='Заказчик : ', value=order.player.personaname)
    embed.add_embed_field(name='STEAMID: ', value=order.player.steamid)
    if order.server == 0:
        embed.add_embed_field(name='Сервер: ', value="#1 ОБЩИЙ")
    if order.server == 1:
        embed.add_embed_field(name='Сервер: ', value="#2 ПРИВАТНЫЙ")

    embed.add_embed_field(name='SPAWN', value=order.spawn_text)

    # add embed object to webhook
    webhook.add_embed(embed)

    webhook.execute()

    webhook = DiscordWebhook(url=bot_settings.SHOP_PLAYERS_URL)
    embed = DiscordEmbed(title='ЗАКАЗ №{} УСПЕШНО СФОРМИРОВАН'.format(order.id),
                         description='Дата заказа : ' + order.created_at.strftime('%d-%m-%Y'), color=0xec4e00)
    if order.server == 0:
        embed.add_embed_field(name='Сервер: ', value="#1 ОБЩИЙ")
    if order.server == 1:
        embed.add_embed_field(name='Сервер: ', value="#2 ПРИВАТНЫЙ")

    embed.add_embed_field(name='Заказчик : ', value="Кто-то ;)")
    embed.add_embed_field(name='Сумма заказа : ', value=order.total_price)
    embed.set_footer(text="Ожидайте доставки")
    webhook.add_embed(embed)
    webhook.execute()


    return HttpResponseRedirect('/')
