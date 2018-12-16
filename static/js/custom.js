
var cur_balance = parseInt($("#cur_bal").val());
var btn = $('#add_to_bal_btn');
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
