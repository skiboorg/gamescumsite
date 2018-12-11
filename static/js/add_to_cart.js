$(document).ready(function () {
    function test(f) {
        alert('ddd');
        console.log(self);
    }

    var form = $('#add-in-cart-form');
    console.log(form);
    form.on('submit',function (e) {
        e.preventDefault();
        console.log('111');
    });




});