
        $('#modal-activate').modal('show');


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
