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



$('#modal-activate').modal('show');
$( document ).ready(function() {
    console.log( "ready!" );
    let modal = document.getElementById('myModal');


      modal.style.display = "block";


});

function copyToClipboardSteamId() {
        var btn = $('#copy_activate');
        var $temp = $('#activate_command');


        console.log($temp.val());
        $temp.select();
        document.execCommand("copy");


        // $(btn).removeClass('btn-danger');
        // $(btn).addClass('btn-success');
        $(btn).html('Скопировано');
    }



var cur_balance = parseInt($('#player_wallet').html());
var cur_squad_balance = parseInt($('#squad_balance').html());
var need_for_level_up = parseInt($('#level_up_cost').html());
var btn = $('#add_to_bal_btn');
var create_squad_btn = $('#create_squad_btn');
var level_up_btn = $('#level_up_btn');
if (cur_squad_balance < need_for_level_up){
    level_up_btn.addClass('a_not_active');
    level_up_btn.html('НЕ ХВАТАЕТ ДЕНЕГ ЧТОБЫ ПОДНЯТЬ УРОВЕНЬ ОТРЯДА ');
}
if (cur_balance < 1000){
    create_squad_btn.attr( "disabled",'disabled' );
    create_squad_btn.html('НЕ ХВАТАЕТ ДЕНЕГ ДЛЯ СОЗДАНИЯ ОТРЯДА (1000 RC)');
}

$("#amount").bind('keyup', function (e) {
    var amount = parseInt($("#amount").val());
    if (amount > cur_balance){
        btn.attr( "disabled",'disabled' );
        btn.html('НЕ ХВАТАЕТ ДЕНЕГ');

    }
    if (amount <= cur_balance){
        btn.removeAttr("disabled");
        btn.html('Пополнить баланс отряда');

    }
});
