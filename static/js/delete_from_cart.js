function delete_from_cart(del){
    var item_id = $(del).data('item_id');
    var subitem_id = $(del).data('subitem_id');
    var url = '/blackmarket/delete_from_cart/';
    var csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
console.log(csrf_token);
      var data = {};
        data.item_id = item_id;
        data.subitem_id = subitem_id;
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
                    if (v.subitem === 'no'){
                        $('.header-cart').append(' <li>\n' +
                          '                                                        <div class="edgtf-item-image-holder">\n' +
                          '                                                            <a itemprop="url" href="#">\n' +
                          '                                                                <img width="300" height="300" src="/media/' + v.image + '" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail wp-post-image" alt="a" /> </a>\n' +
                          '                                                        </div>\n' +
                          '                                                        <div class="edgtf-item-info-holder">\n' +
                          '                                                            <h5 itemprop="name" class="edgtf-product-title">\n' +
                          '                                                                <a itemprop="url" href="#">'+ v.name +'</a>\n' +
                          '                                                            </h5>\n' +
                          '                                                            <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span>'+ v.price +' RC</span> <span class="edgtf-quantity"> x '+ v.number +' = '+ v.total_price +' RC</span>\n' +
                          '                                                            <a href="#" class="remove" data-item_id="'+ v.id +'" data-subitem_id="0" onclick="delete_from_cart(this);return false;">&#215;</a> </div>\n' +
                          '                                                    </li>')
                    }

                     if (v.subitem === 'yes'){
                        $('.header-cart').append(' <li>\n' +
                          '                                                        <div class="edgtf-item-image-holder">\n' +
                          '                                                            <a itemprop="url" href="#">\n' +
                          '                                                                <img width="300" height="300" src="/media/' + v.image + '" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail wp-post-image" alt="a" /> </a>\n' +
                          '                                                        </div>\n' +
                          '                                                        <div class="edgtf-item-info-holder">\n' +
                          '                                                            <h5 itemprop="name" class="edgtf-product-title">\n' +
                          '                                                                <a itemprop="url" href="#">'+ v.name +'</a>\n' +
                          '                                                            </h5>\n' +
                          '                                                            <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol"></span>'+ v.price +' RC</span> <span class="edgtf-quantity"> x '+ v.number +' = '+ v.total_price +' RC</span>\n' +
                          '                                                            <a href="#" class="remove" data-item_id="0" data-subitem_id="'+ v.id +'" onclick="delete_from_cart(this);return false;">&#215;</a> </div>\n' +
                          '                                                    </li>')
                    }


                })
                     $('.header-cart').append('<li class="edgtf-cart-bottom">\n' +
                    '                                                <div class="edgtf-subtotal-holder clearfix">\n' +
                    '                                                    <span class="edgtf-total">Итого:</span>\n' +
                    '                                                        <span class="edgtf-total-amount">\n' +
                    '\t\t\t\t\t\t\t\t\t\t                 <span class="woocommerce-Price-amount amount">'+ data.total_cart_price +' RC</span>\n' +
                    '                                                        </span>\n' +
                    '                                                </div>\n' +
                    '\n' +
                    '\n' +
                    '                                                <a itemprop="url" href="" class="btn-outline cart-btn  btn-xs">Оформить заказ</a>\n' +
                    '\n' +
                    '                                            </li> ')
                   $('#count_items_in_cart').html( data.total_items_in_cart );
                   $('.info-block__cart-sum').html(data.total_cart_price + ' RC');

                }
                else
                {
                    $('#count_items_in_cart').html('(0)');
                    $('.info-block__cart-sum').html('0 RC');
                    $('.header-cart').append('  <li > КОРЗИНА ПУСТА</li>')
                }


            },
            error: function () {
                console.log('ERROR')
            }
        });


console.log($(del).data('item_id'));
 $(del).closest('li').remove();
}
