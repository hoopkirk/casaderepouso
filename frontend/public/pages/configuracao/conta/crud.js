(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$(document).ready(function () {
    api.getUser(function (data) {
        console.log(data)
        if (!data.message) {
            $('#usuario').val(data.usuario);
        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
    })
});

$("form").submit(async function (event) {
    $('#saved').prop('disabled', true);
    event.preventDefault();

    let json = $(this).serializeFormJSON()

    console.log(json)
    api.updateUser(json, function (data) {
        console.log(data)
        if (data.success) {
            Swal.fire(
                'Sucesso!',
                data.message,
                'success'
            )
        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
        $('#saved').prop('disabled', false);
    })
});
