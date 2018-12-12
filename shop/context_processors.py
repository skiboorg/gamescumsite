from .models import Baskets


def items_in_cart(request):
    all_items_in_cart = Baskets.objects.filter(player_id=request.user.id)
    count_items_in_cart = all_items_in_cart.count()
    total_cart_price = 0
    for item in all_items_in_cart:
        total_cart_price += item.total_price

    return locals()