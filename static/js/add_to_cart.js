function add_to_cart(form) {


        console.log(form.elements["items_number"].value);
        console.log(form.elements["item_id"].value);
        console.log(form.elements["item_name"].value);
        console.log(form.elements["item_price"].value);
        console.log(form.elements["item_image"].value);
        var item_number = form.elements["items_number"].value
        var item_id = form.elements["item_id"].value
        var item_name = form.elements["item_name"].value
        var item_price = form.elements["item_price"].value
        var item_image = form.elements["item_image"].value
        var item_subitem = form.elements["item_subitem"].value
        var csrf_token = form.elements["csrfmiddlewaretoken"].value



    console.log($(form).attr('action'));
     console.log(item_subitem);
        var data = {};
        data.item_id = item_id;
        data.item_number = item_number;
        data.item_subitem = item_subitem;
        data['csrfmiddlewaretoken'] = csrf_token;
        var url = $(form).attr('action');
  console.log(data);
        $.ajax({
            url:url,
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
                console.log('OK');
                console.log(data.total_items_in_cart);
                console.log(data.all_items);
                $('.header-cart').empty();
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
                    '                                                <a itemprop="url" href="/blackmarket/order/" class="btn-outline cart-btn btn-xs">Оформить заказ</a>\n' +
                    '\n' +
                    '                                            </li> ')

                $('#count_items_in_cart').html( data.total_items_in_cart );
                $('.info-block__cart-sum').html(data.total_cart_price + ' RC');
                if (!data.max_items){
                   $.amaran({
                        'theme'     :'user blue',
                        'content'   :{
                            img:'/media/'+item_image,
                            user:'Добавлено :',
                            message: item_number + ' шт. - ' + item_name
                        },
                        'position'  :'bottom right',
                        'outEffect' :'slideBottom'
                    });
                }else{
                      $.amaran({
                        'theme'     :'user blue',
                        'content'   :{
                            img:'/media/stop.jpg',
                            user:'Достигнут лимит :',
                            message: 'Максимум 5 ед. товара в корзине'
                        },
                        'position'  :'bottom right',
                        'outEffect' :'slideBottom'
                    });
                }

            },
            error: function () {
                console.log('ERROR')
            }
        }





           )
    }

