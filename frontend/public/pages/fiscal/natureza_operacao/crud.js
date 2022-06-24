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
    api.getAllNaturezaOperacao(function (data) {
        console.log(data)
        $('.zero-configuration').dataTable().fnDestroy();
        $('#itens').html('');
        if (!data.message) {

            data.forEach(element => {
                console.log(element)
                item = `<tr>
                     <td>${element.natureza}</td>
                     <td>${element.cfop_entrada_estadual}</td>
                     <td>${element.cfop_saida_estadual}</td>
                     <td>${element.cfop_entrada_inter_estadual}</td>
                     <td>${element.cfop_saida_inter_estadual}</td>
                     <td><a class="primary edit mr-1" onclick="edit(${element.id})"><i
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

    api.insertNaturezaOperacao(json, function (data) {
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
    api.removeNatureOperacao(id, function (data) {
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

viewTabela = () => {
    document.getElementById('tabela').removeAttribute('hidden'); document.getElementById('formulario').hidden = true;
    clearForm()
}
viewFormulario = () => {
    document.getElementById('formulario').removeAttribute('hidden'); document.getElementById('tabela').hidden = true;
}
clearForm = () =>{
    $('form').trigger("reset");
}