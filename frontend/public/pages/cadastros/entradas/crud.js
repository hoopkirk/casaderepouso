//Buscar todos os empresa
$(document).on('destroy.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api(settings);
    api.off('order.dt');
    api.off('preDraw.dt');
    api.off('column-visibility.dt');
    api.off('search.dt');
    api.off('page.dt');
    api.off('length.dt ');
    api.off(' xhr.dt ');
});


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

$(document).ready(function () { getAll() });

getAll = () => {
    api.getAllEntradas(function (data) {
        console.log(data)
        $('.zero-configuration').dataTable().fnDestroy();
        $('#itens').html('');
        if (!data.message) {

            data.forEach(element => {

                let mercado = api.getNameEventType(element.eventType) || 'Não identificado'
                //  <td>${element.marketName}</td>

                item = `<tr>
                     <td>${element.marketId}</td>
                     <td>${element.event}</td>
                     <td>${dataFormatada(element.marketStartTime)}</td>
                     <td>${element.available} | ${element.runnerName}</td>
                     <td>${element.oddMin}</td>
                     <td>${element.minutes}</td>
                     <td><a hidden class="primary edit mr-1" onclick="edit(${element.id})"><i
                                 class="la la-edit" ></i></a>
                         <a class="primary edit mr-1" onclick="remove(${element.id})"><i
                                 class="la la-trash"></i></a>
                     </td>
                </tr>`

                $('#itens').append(item)
            });

            $('.zero-configuration').DataTable({
                "responsive": false,
                "lengthChange": true,
                "autoWidth": false, //quebra tudo
                "paging": false,
                "searching": true,
                "ordering": true,
                "info": false,
                "lengthMenu": [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "Todos"]
                ],
                "pageLength": 5,
                // "bDestroy": true
                // scrollY: "200px",
                // scrollX: true,
                // scrollCollapse: true,
            });

        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
    })

}

$("form").submit(async function (event) {
    event.preventDefault();

    let json = $(this).serializeFormJSON()

    runner = document.getElementById('selectionId')
    json['runnerName'] = runner.options[runner.selectedIndex].text
    json['marketStartTime'] = $('#marketStartTime').val()
    json['marketName'] = $('#marketName').val()
    json['marketId'] = $('#marketId').val()
    json['event'] = $('#event').val()

    api.insertEntradas(json, function (data) {
        console.log(data)
        if (data.success) {
            getAll()
            viewTabela()
            clearForm()
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
    })
});

edit = (id) => {

}

remove = (id) => {

    if (!id) return;

    Swal.fire({
        title: 'Deseja realmente excluir?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            api.removeEntradas(id, function (data) {
                console.log(data)
                if (data.status) {
                    getAll()
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
            })
        }
    })


}

consultaMercado = () => {
    if ($('#marketId').val() != '') {
        let json = { eventType: $('#eventType').val(), id: $('#marketId').val() }
        console.log(json)

        api.getMercadoById(json, function (res) {
            if (res.response.length > 0) {
                data = res.response[0]
                console.log(data)

                $('#marketName').val(data.marketName);
                $('#event').val(data.event.name);

                // DATA = '2022-04-14T19:00:00.000Z'
                var d = new Date(data.marketStartTime);
                d.setHours(d.getHours() - 3)
                $('#marketStartTime').val(d.toISOString().replace(/.\d+Z$/g, ""));

                $('#selectionId').html('<option value="">--Selecione--</option>')
                data.runners?.forEach(element => {
                    let name = element.runnerName
                    switch (element.runnerName.toUpperCase()) {
                        case 'HOME OR DRAW':
                            name = 'Casa ou Empate'
                            break;

                        case 'DRAW OR AWAY':
                            name = 'Empate ou Visitante'
                            break;

                        case 'HOME OR AWAY':
                            name = 'Casa ou Visitante'
                            break;

                        default:
                            break;
                    }
                    $('#selectionId').append(`<option value="${element.selectionId}">${name}</option>`);
                });

                document.getElementById('marketId').setAttribute('disabled', true)

            } else {
                Swal.fire(
                    'Erro!',
                    'Não foi encontrado esse mercado',
                    'error'
                )
            }
            console.log(data.response)
        })
    }
}


viewTabela = () => {
    document.getElementById('tabela').removeAttribute('hidden'); document.getElementById('formulario').hidden = true;
    clearForm()
}
viewFormulario = () => {
    document.getElementById('formulario').removeAttribute('hidden'); document.getElementById('tabela').hidden = true;
}
clearForm = () => {
    document.getElementById('marketId').removeAttribute('disabled')
    $('form').trigger("reset");
}

$('#oddMin').inputmask({
    alias: 'numeric',
    allowMinus: false,
    digits: 2,
    max: 999.99
});