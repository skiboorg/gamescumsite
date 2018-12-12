function delete_from_cart(del){
    var item_id = $(del).data('item_id');
    var url = '/blackmarket/delete_from_cart/';
    var csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
console.log(csrf_token);
      var data = {};
        data.item_id = item_id;
        data['csrfmiddlewaretoken'] = csrf_token;

        console.log(data);
        $.ajax({
            url:url,
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
                console.log('OK');
                console.log(data.all_items);
                $('.header-cart').empty();
                if (data.all_items.length > 0) {
                     $.each(data.all_items,function (k,v) {
                    $('.header-cart').append('   <li class="header-cart__item">\n' +
            '                                    <figure style="width: 100px;" class="header-cart__product-thumb">\n' +
            '                                        <a href="#"><img src="/media/' + v.image + '" alt=""></a>\n' +
            '                                    </figure>\n' +
            '                                    <div class="header-cart__inner"><span class="header-cart__product-cat">'+ v.category +'</span>\n' +
            '                                        <h5 class="header-cart__product-name"><a href="#">'+ v.name +'</a></h5>\n' +
            '                                        <div class="header-cart__product-sum"><span class="header-cart__product-price">'+ v.price +'</span> x <span class="header-cart__product-count">'+ v.number +'</span>= <span class="header-cart__product-count">'+ v.total_price +' RC</span> </div>\n' +
            '                                         <a class="fa fa-times header-cart__close" href="#" data-item_id="'+ v.id +'" onclick="delete_from_cart(this);return false;"></a>\n' +
            '                                    </div>\n' +
            '                                </li>')


                })
                    $('.header-cart').append('  <li class="header-cart__item header-cart__item--subtotal"><span class="header-cart__subtotal">ИТОГО</span> <span class="header-cart__subtotal-sum">'+ data.total_cart_price +' RC</span></li>\n' +
                   '                                <li class="header-cart__item header-cart__item--action"><a href="#" class="btn btn-warning btn-outline">БАЛАНС : '+ data.player_wallet +'</a> <a href="/blackmarket/place_order/" onclick="place_order(this);return false;" data-total_price="' + data.total_cart_price + '" class="btn btn-warning btn-block">ОПЛАТИТЬ</a></li>')

                   $('#count_items_in_cart').html('('+ data.total_items_in_cart +')');
                   $('.info-block__cart-sum').html(data.total_cart_price + ' RC');

                }
                else
                {
                    $('#count_items_in_cart').html('(0)');
                    $('.info-block__cart-sum').html('0 RC');
                    $('.header-cart').append('  <li class="header-cart__item header-cart__item--subtotal"> КОРЗИНА ПУСТА</li>')
                }


            },
            error: function () {
                console.log('ERROR')
            }
        });


console.log($(del).data('item_id'));
 $(del).closest('li').remove();
}
