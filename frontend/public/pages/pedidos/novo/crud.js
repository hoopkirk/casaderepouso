var edit = 0
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

$(document).ready(function () {



    $('#select-prod').selectize({
        sortField: 'text',
        onChange: function (value, isOnInitialize) {
            console.log('Selectize changed: ' + value);
            getProd(value)
        }
    });

    $('#select-cli').selectize({
        sortField: 'text',
        onChange: function (value, isOnInitialize) {
            console.log('Selectize changed: ' + value);
            // getProd(value)
        }
    });

    $('.zero-configuration').dataTable().fnDestroy();

    $('.zero-configuration').DataTable({
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false, //quebra tudo
        "paging": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "Todos"]
        ],
        "pageLength": 5,
        // "bDestroy": true
        scrollY: "200px",
        scrollX: true,
        // scrollCollapse: true,
    });

    $('#itens').html('')

    $('.zero-configuration').on('click', '.remove', function () {
        $(this).parent().parent().remove();
        vlrTotal()
    });

    getAll()

});


getAll = () => {
    api.getAllProdutos(function (data) {
        console.log(data)

        if (!data.message) {



            let selectize_element = $("#select-prod")[0].selectize;

            data.forEach(element => {

                selectize_element.addOption({
                    text: element.nome,
                    value: element.id,
                });
                // selectize_element.refreshOptions();
                selectize_element.addItem(element.nome);

            });

        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
    })

    api.getAllClientes(function (data) {
        console.log(data)

        if (!data.message) {

            let selectize_element2 = $("#select-cli")[0].selectize;

            data.forEach(element => {

                selectize_element2.addOption({
                    text: element.nome + ' - ' + element.cpf,
                    value: element.id,
                });
                // selectize_element2.refreshOptions();
                selectize_element2.addItem(element.nome + ' - ' + element.cpf);

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
    console.log(json)

    if (json.id > 0 && json.nome != '' && json.preco > 0) {


        // $('#itens').html('');
        item = `<tr>
                     <td>${json.id}</td>
                     <td>${json.nome}</td>
                     <td>${json.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                     <td>
                         <a class="primary edit mr-1 remove"><i
                                 class="la la-trash"></i></a>
                     </td>
                </tr>`

        $('#itens').append(item)
        vlrTotal()

    } else {
        console.log('nao')
    }
});

getProd = (id) => {

    if (!id) return

    api.getProduto(id, function (data) {
        console.log(data)
        if (!data.message) {
            $('#id').val(data.id)
            $('#nome').val(data.nome)
            $('#preco').val(data.preco)
            edit = data.id
        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
    })
}

vlrTotal = () => {
    let table = document.getElementById('DataTables_Table_0');

    let data2 = [...table.rows].map(row => [...row.cells].map(td => td.innerText));

    let prod = []
    let vlr_total = 0

    for (let index = 1; index < data2.length; index++) {
        const element = data2[index];
        console.log(element)
        prod.push({ id: element[0], preco: element[2] })
        vlr_total += parseFloat(element[2])
    }
    $('#vlr_total').html(' Valor Total: R$' + vlr_total.toFixed(2))
}

finalizar = async () => {

    let json = {}

    let cli_id = parseInt(document.getElementById('select-cli').value)

    if (!cli_id > 0) {
        Swal.fire(
            'Preencha o cliente!',
            'O cliente não foi informado',
            'info'
        )
    }

    let table = document.getElementById('DataTables_Table_0');

    let data2 = [...table.rows].map(row => [...row.cells].map(td => td.innerText));

    let prod = []
    let vlr_total = 0

    for (let index = 1; index < data2.length; index++) {
        const element = data2[index];
        console.log(element)
        prod.push({ id: element[0], preco: element[2] })
        vlr_total += parseFloat(element[2])
    }

    console.log(prod)

    if (prod.length) {

        const { value: pg } = await Swal.fire({
            title: 'Finalizar Pedido',
            input: 'select',
            inputOptions: {
                1: 'Pagamento recebido',
                0: 'Á receber'
            },
            inputPlaceholder: '--Selecione--',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    resolve()
                })
            }
        })

        if (pg) {


            json = {
                cli_id: cli_id,
                vlr_total: vlr_total.toFixed(2),
                desconto: 0,
                pago: pg,
                prod: prod
            }

            api.insertPedidos(json, async function (data) {
                console.log(data)
                if (data.success) {
                    socket.emit("atualizarAll", true);
                    await Swal.fire(
                        'Pedido realizado!',
                        data.message,
                        'success'
                    )
                    clearForm()
                } else {
                    Swal.fire(
                        'Erro!',
                        data.message,
                        'error'
                    )
                }
            })
        }

    } else {
        Swal.fire(
            'Pedido sem produto!',
            'Selecione os itens do pedido',
            'info'
        )
    }

    console.log(json)


}


clearForm = () => {
    // document.getElementById('marketId').removeAttribute('disabled')
    $('form').trigger("reset");
    $('#itens').html('')
    window.location = window.location
}

$('#preco').inputmask({
    alias: 'numeric',
    allowMinus: false,
    digits: 2,
    max: 99999.99
});

vlrTotal()


socket.on("atualizar", async function (data) {
    if (data) {
        getAll();
    }
});