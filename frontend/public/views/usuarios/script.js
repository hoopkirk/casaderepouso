//Date and time picker
$('#horarioColeta').datetimepicker({
    icons: {
        time: 'far fa-clock'
    },
    date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
    locale: 'pt-br'
});

$('#horarioEntrega').datetimepicker({
    icons: {
        time: 'far fa-clock'
    },
    date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
    locale: 'pt-br'
});

const table = new Table()

table.searching = false
table.paging = false
// table.rowsGroup = [2]

table.nameTable = '#example1'
table.check = true
table.head = {
    'id': 'ID',
    'ativo': 'Ativo',
    'createdAt': 'Criado',
    'updatedAt': 'Alterado',
}
table.width = {
    'ID': '1px',
}
table.hide = [
    'createdAt',
    'updatedAt'
]
table.case = {
    'ativo': {
        'true': 'Sim',
        'false': 'Não',
    }
}

table.fields = {
    'id': {
        hidden: false,
        disabled: true,
        obj: 'input',
        type: 'number',
        title: 'ID',
        placeholder: '',
        class: 'col-md-2'
    },
    'nome': {
        obj: 'input',
        type: 'text',
        title: 'Nome',
        placeholder: 'Insira o login',
        class: 'col-md-5'
    },
    'senha': {
        obj: 'input',
        type: 'text',
        title: 'Senha',
        placeholder: '',
        class: 'col-md-5'
    },
    'ativo': {
        obj: 'select',
        title: 'Ativo',
        class: 'col-md-2',
        options: {
            'true': 'Sim',
            'false': 'Não'
        }
    },
    'aniversario': {
        obj: 'date',
        title: 'Aniversário',
        class: 'col-md-3',
        config: {
            // format: 'LT',
            format: 'DD/MM/YYYY',
            locale: 'pt-br',
            date: moment(new Date()),
        }
    },

}

table.fieldsCreated()

table.btn.update = true
table.btn.create = true
table.btn.delete = true

table.btn.refreshFunction = () => {
    getAll()
}

table.btn.deleteFunction = () => {
    let selects = table.getSelected()
    console.log(selects[0][1].innerText)
    if (selects.length == 1 && selects[0][1].innerText != '') {
        Swal.fire({
            title: 'Remover?',
            text: "Deseja realmente remover iten(s) selecionado(s)?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                ajax(_BASE_URL + 'api/usuarios/' + selects[0][1].innerText, 'DELETE', {}, function (res) {
                    if (res.status === 200) {
                        getAll()
                        Swal.fire(
                            'Deletado!',
                            res.message,
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Erro!',
                            'Não foi possível excluir!',
                            'error'
                        )
                    }
                });
            }
        })
    }
}

table.btn.updateFunction = () => {
    let selects = table.getSelected()
    console.log(selects)
    if (selects.length == 1) {
        $('#modal-example1').modal('show');
    }
}

getAll = () => {
    ajax(_BASE_URL + 'api/usuarios', 'GET', {}, function (res) {
        console.log(res)
        table.data = res
        table.generate()
    });
}
create = () => {
    ajax(_BASE_URL + 'api/usuarios', 'POST', {}, function (res) {

    });
}
updateId = () => {
    ajax(_BASE_URL + 'api/usuarios/' + 0, 'PUT', {}, function (res) {

    });
}
deleteId = () => {
    ajax(_BASE_URL + 'api/usuarios' + 0, 'DELETE', {}, function (res) {

    });
}


(async () => {
    getAll()
})();