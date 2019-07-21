function del_pm(pm_id)
{
    var url = '/del_message/';
    var csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
    var data = {};
    var total_pms = parseInt($('#pm_count').html());
    data.pm_id = pm_id;
    data['csrfmiddlewaretoken'] = csrf_token;
    console.log(data);
    $.ajax({
        url:url,
        type:'POST',
        data: data,
        cache:true,
        success: function (data) {
            console.log('OK');
            $('#pm_message_' + pm_id).remove();
            total_pms -= 1;
            $('#pm_count').html(total_pms);
            if (total_pms == 0){
                $('#player_mark').css('display','none');
            }




        },
        error: function () {
            console.log('ERROR')
        }
    });


}


$('#squad_form_wear').on('change', function() {
    var image_url = this.selectedOptions[0].getAttribute('data-image');
    $('#squad_wear_sample').attr('src', image_url);
});



//$('#modal-activate').modal('show');
$( document ).ready(function() {
    console.log( "ready!" );
    let modal = document.getElementById('modal-activate');


    modal.style.display = "block";


});


function copyToClipboardSteamId() {
    var btn = $('#copy_activate');
    var $temp = $('#activate_command');
    let modal = document.getElementById('modal-activate');


    console.log($temp.val());
    $temp.select();
    document.execCommand("copy");


    // $(btn).removeClass('btn-danger');
    // $(btn).addClass('btn-success');
    $(btn).html('Скопировано');
    function func() {
        modal.style.display = "none";
    }

    setTimeout(func, 2000);

}

function closeActivateModal() {
    let modal = document.getElementById('modal-activate');
    modal.style.display = "none";
}

var cur_balance = parseInt($('#player_wallet').html());
var cur_squad_balance = parseInt($('#squad_balance').html());
var need_for_level_up = parseInt($('#level_up_cost').html());
var btn = $('#add_to_bal_btn');
var create_squad_btn = $('#create_squad_btn');
var level_up_btn = $('#level_up_btn');
if (cur_squad_balance < need_for_level_up){
    level_up_btn.attr('href','#')
    level_up_btn.html('НЕ ХВАТАЕТ ДЕНЕГ ЧТОБЫ ПОДНЯТЬ УРОВЕНЬ ОТРЯДА ');
}
if (cur_balance < 1000){
    create_squad_btn.attr( "disabled",'disabled' );
    create_squad_btn.html('НЕ ХВАТАЕТ ДЕНЕГ ДЛЯ СОЗДАНИЯ ОТРЯДА (1000 RC)');
}

$("#amount").bind('keyup', function (e) {
    var amount = parseInt($("#amount").val());
    console.log(amount)
    if (amount > cur_balance){
        btn.attr( "disabled",'disabled' );
        btn.html('НЕ ХВАТАЕТ ДЕНЕГ');

    }
    if (amount <= cur_balance){
        btn.removeAttr("disabled");
        btn.html('Пополнить баланс отряда');

    }
});


function add_to_favorite(el) {
    item_id = '0'
    subitem_id = '0'

    let btn = $(el)
    item_id = btn.attr('data-item_id')
    subitem_id = btn.attr('data-subitem_id')

    let url = '/blackmarket/add_to_favorite/';
    let csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();

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
            console.log(data);
            if (data.action === 'added'){
                console.log('added');
                if (parseInt(item_id) !== 0){
                    $('#main_item').attr('data-in_fav','1')
                }
                 if (parseInt(subitem_id) !== 0){
                    $('#subitem_'+subitem_id).attr('data-in_fav','1')
                }
                btn.html('УДАЛИТЬ ИЗ ИЗБРАННОГО')

                $.amaran({
                    'theme'     :'colorful',
                    'content'   :{
                        bgcolor:'#27ae60',
                        color:'#fff',
                        message:'Товар добавлен в избранное'
                    },
                    'position'  :'bottom right',
                    'outEffect' :'slideBottom'
                });


            }

            if (data.action === 'deleted'){
                console.log('deleted');
                btn.html('В ИЗБРАННОЕ')
                if (parseInt(item_id) !== 0){
                    $('#main_item').attr('data-in_fav','0')
                }
                 if (parseInt(subitem_id) !== 0){
                    $('#subitem_'+subitem_id).attr('data-in_fav','0')
                }

                $.amaran({
                    'theme'     :'colorful',
                    'content'   :{
                        bgcolor:'#ae1737',
                        color:'#fff',
                        message:'Товар удален из избранного'
                    },
                    'position'  :'bottom right',
                    'outEffect' :'slideBottom'
                });


            }



        },
        error: function () {
            console.log('ERROR')
        }
    });


}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function changeItem(i) {

    let subitem_id = i.dataset.id
    let main_item = i.dataset.main_item
    let subitem_level = i.dataset.level
    let subitem_price = i.dataset.price
    let subitem_image = i.dataset.image
    let subitem_image_big = i.dataset.image_big
    let subitem_description = i.dataset.description
    let subitem_discount = i.dataset.discount
    let subitem_discount_vip = i.dataset.discount_vip
    let subitem_discount_percent = i.dataset.discount_percent
    let subitem_color_name = i.dataset.color_name
    let subitem_in_fav = i.dataset.in_fav

    $('.subitem-image').each(function () {
        $(this).removeClass('subitem-image-active')
    })
    $(i).addClass('subitem-image-active')
    $('#item_image_big').attr('src',subitem_image_big)

    if ($('#is_vip').html() === 'True'){
        $('#discount_vip').html(subitem_discount_vip + ' RC')
        $('#price').html(subitem_price + ' RC')
        $('#discount_vip_label').html('-30% VIP')
        $('#item_name').val(subitem_color_name)
        $('#item_price').val(subitem_discount_vip)
        $('#item_image').val(subitem_image)
        $('#item_subitem').val(subitem_id)
    }else {

        if (parseInt($('#level').html()) < parseInt(subitem_level)){
            $('#cart_form').css('display','none');
            $('#low_level').css('display','block');
        }
        else{
            $('#cart_form').css('display','block');
            $('#low_level').css('display','none');
        }

        if (subitem_discount_percent > 0){
            $('#discount').html(subitem_discount + ' RC')
            $('#discount').css('display','inline-block')
            $('#price').html(subitem_price + ' RC')
            $('#price').removeClass('main-color')
            $('#price').css('text-decoration', 'line-through')
            $('#discount_label').html('- '+ subitem_discount_percent + '%')
            $('#price').css('display','inline-block')
            $('.edgtf-onsale').css('display','block')
            $('#item_price').val(subitem_discount)
        }
        else{
            $('#discount').css('display','none')
            $('#discount').html(subitem_price + ' RC')
            $('#price').css('display','block')
            $('#price').html(subitem_price + ' RC')
            $('#price').addClass('main-color')
            $('#price').css('text-decoration', 'none')
            $('.edgtf-onsale').css('display','none')
            $('#item_price').val(subitem_price)
        }

        $('#item_name').val(subitem_color_name)
        $('#item_image').val(subitem_image)
    }

    if (main_item === '0'){
        console.log(subitem_id)
        $('#item_subitem').val(subitem_id)
        $('#item_color').css('display','block')
        $('#addtofav').attr('data-item_id',0)
        $('#addtofav').attr('data-subitem_id',subitem_id)

    }else{
        console.log(subitem_id)
        $('#item_subitem').val('0')
        $('#item_color').css('display','none')
        $('#item_id').val(subitem_id)
        $('#addtofav').attr('data-item_id',subitem_id)
        $('#addtofav').attr('data-subitem_id',0)
    }

    if (subitem_in_fav === '1'){
        $('#addtofav').html('УДАЛИТЬ ИЗ ИЗБРАННОГО')
    }
    else{
        $('#addtofav').html('В Избранное')
    }

    $('#item_description').html(subitem_description)

    $('#item_color').html(subitem_color_name)
}

function massInCart() {

    let fav_items = $('#fav_items').html()
    var data = {};
    data.fav_items = fav_items;
    data['csrfmiddlewaretoken'] = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
    var url = '/blackmarket/mass_to_cart/';
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
                console.log(data.new_items);
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



                $.each(data.new_items,function (k,v) {

                    $.amaran({
                        'theme'     :'user blue',
                        'content'   :{
                            img:'/media/'+ v.image,
                            user:'Добавлено :',
                            message: '1 шт. - ' + v.name
                        },
                        'position'  :'bottom right',
                        'outEffect' :'slideBottom'
                    });

                })






            },
            error: function () {
                console.log('ERROR')
            }
        }
    )

}



$( document ).ready(function() {
    console.log( "ready!" );



    if(getUrlParameter('i') !== undefined){
        console.log(getUrlParameter('i'));
        document.getElementById('subitem_'+getUrlParameter('i')).click();
    }



});


