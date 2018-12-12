function place_order(instance){

    var url = $(instance).attr('href');
    var total_price = $(instance).data('total_price');
    var csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();

      var data = {};
        data['csrfmiddlewaretoken'] = csrf_token;
        data['total_price'] = total_price;
        $.ajax({
            url:url,
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
            console.log('OK');
            if (data.place_order_status == '0'){
                    $.amaran({
                        content:{
                            bgcolor:'#f34141',
                            color:'#fff',
                            message:'Не хватает : '+ data.money_need +' RC на покупку. '
                           },
                        theme:'colorful'
                    });
            }
            else
                {
                    $('.header-cart').empty();
                    $('#count_items_in_cart').html('(0)');
                    $('.info-block__cart-sum').html('0 RC');
                    $.amaran({
                        content:{
                            bgcolor:'#24d9b0',
                            color:'#fff',
                            message:'Заказ успешно оплачен. Администрация сервера свяжется в дискорде. '
                           },
                        theme:'colorful'
                    });

                }



            },
            error: function () {
            console.log('ERROR')
            }
        });



}
