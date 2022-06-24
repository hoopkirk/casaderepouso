
getAll = () => {
    let json = {}
    json['mes'] = document.getElementById('mes').value
    json['ano'] = document.getElementById('ano').value
    api.getValores(json, function (data) {
        console.log(data)
        data = data[0]

        if (!data.message) {
            if (data.length) {
                let rec = data[0].recebido || 0
                let a_rec = data[0].a_receber || 0
                $('#recebido').html(rec.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
                $('#a_receber').html(a_rec.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
            }
        } else {
            Swal.fire(
                'Erro!',
                data.message,
                'error'
            )
        }
    })

}

let date = new Date();

let mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getMonth() + 1
mes = mes.toString().padStart(2, '')
const mesAgora = mes

let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
ultimoDia = ultimoDia.toString().padStart(2, '0')

let anoAtual = new Date(date.getFullYear(), date.getMonth() + 1, 0).getFullYear()
const anoAgora = anoAtual

let startDateInicial = '01/' + mes + '/' + anoAtual
let endDateFinal = ultimoDia + '/' + mes + '/' + anoAtual

document.getElementById('mes').value = mes

socket.on("atualizar", async function (data) {
    if (data) {
        getAll();
    }
});

getAll()