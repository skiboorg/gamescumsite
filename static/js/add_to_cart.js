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
        var csrf_token = form.elements["csrfmiddlewaretoken"].value



    console.log($(form).attr('action'));
     console.log(csrf_token);
        var data = {};
        data.item_id = item_id;
        data.item_number = item_number;
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
                   '                                <li class="header-cart__item header-cart__item--action"><a href="#" class="btn btn-warning btn-outline">БАЛАНС : '+ data.player_wallet +'</a> <a href="/blackmarket/place_order/" onclick="place_order(this);return false;" data-total_price="'+ data.total_cart_price +'" class="btn btn-warning btn-block">ОПЛАТИТЬ</a></li>')

                $('#count_items_in_cart').html('('+ data.total_items_in_cart +')');
                $('.info-block__cart-sum').html(data.total_cart_price + ' RC');
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
            },
            error: function () {
                console.log('ERROR')
            }
        }





           )
    }

