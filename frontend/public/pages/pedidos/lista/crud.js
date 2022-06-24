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

$(document).ready(function () { getAll() });

getAll = () => {
    api.getAllPedidos(function (data) {
        console.log(data)
        data = data[0]
        $('.zero-configuration').dataTable().fnDestroy();
        $('#itens').html('');
        if (!data.message) {

            data.forEach(element => {

                let tr = '<tr>'

                if (element.pago == 1) {
                    tr = '<tr style="background-color:#96fe96">'
                }

                item = `${tr}
                     <td>${element.id}</td>
                     <td>${element.nome}</td>
                     <td>${element.cpf}</td>
                     <td>${parseFloat(element.vlr_total).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                     <td>${dataFormatada(element.dta_cadastro)}</td>
                     <td>${element.pago == 1 ? 'Sim' : 'Não'}</td>
                     <td><a  class="primary edit mr-1" onclick="editar(${element.id})"><i
                                 class="la la-edit" ></i></a>
                         <a hidden class="primary edit mr-1" onclick="remove(${element.id})"><i
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
                "order": [
                    ['0']
                ]
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

finalizar = () => {

    if (!edit) return

    let json = {
        pago: 1
    }

    Swal.fire({
        title: 'Deseja finalizar o pagamento?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            api.updatePedido(json, edit, function (data) {
                console.log(data)
                if (data.success) {
                    getAll()
                    viewTabela()
                    clearForm()
                    socket.emit("atualizarAll", true);
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

editar = (id) => {

    if (!id) return

    api.getPedido(id, function (data) {
        console.log(data)
        if (!data.message) {
            edit = id
            $('.zero-configuration2').dataTable().fnDestroy();
            $('#itens2').html('');

            data.forEach(element => {
                $('#titlePedido').html(`<i class="la la-book"></i>` + dataFormatada(element.dta_cadastro) + ' ' + element.nome + ' - ' + element.cpf)

                let item = `<tr>
                     <td>${element.prod_id}</td>
                     <td>${element.prod_nome}</td>
                     <td>${parseFloat(element.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                </tr>`

                $('#itens2').append(item)
            });

            viewFormulario()
        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
    })
}

remove = (id) => {

    if (!edit) return

    Swal.fire({
        title: 'Deseja realmente cancelar?',
        text: "Esse pedido será excluido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            api.removePedido(edit, function (data) {
                console.log(data)
                if (data.status) {
                    getAll()
                    socket.emit("atualizarAll", true);
                    Swal.fire(
                        'Sucesso!',
                        data.message,
                        'success'
                    )
                    viewTabela()
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


viewTabela = () => {
    document.getElementById('tabela').removeAttribute('hidden'); document.getElementById('formulario').hidden = true;
    clearForm()
}
viewFormulario = () => {
    document.getElementById('formulario').removeAttribute('hidden'); document.getElementById('tabela').hidden = true;
}
clearForm = () => {
    // document.getElementById('marketId').removeAttribute('disabled')
    edit = 0
    $('form').trigger("reset");
}

$('#preco').inputmask({
    alias: 'numeric',
    allowMinus: false,
    digits: 2,
    max: 99999.99
});