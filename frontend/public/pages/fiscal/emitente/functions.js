
$('.btnCD').on('click', function () {
    $('#certificado').trigger('click');
});

$('#certificado').on('change', function () {
    var fileName = $(this)[0].files[0].name;
    $('#file').val(fileName);
});

consultaCNPJ = () => {
    let cnpj = $('#cnpj').val().replace(/[^0-9]/g, '');
    if (cnpj.length != 14) {
        Swal.fire(
            'Erro!',
            "CNPJ inválido",
            'error'
        )
    } else {
        api.findCNPJ(cnpj, function (data) {
            console.log(data)
            if (!data.message) {
                $('#razao_social').val(data.nome)
                $('#nome_fantasia').val(data.fantasia)
                $('#logradouro').val(data.logradouro)
                $('#numero').val(data.numero)
                $('#bairro').val(data.bairro)
                $('#complemento').val(data.complemento)
                // $('#cnpj2').val(data.cnpj)
                let cep = data.cep;
                cep = cep.replace('.', '');
                cep = cep.replace('-', '');
                $('#cep').val(cep.substring(0, 5) + '-' + cep.substring(5, 9))
                $('#municipio').val(data.municipio)
                api.getUF(data.uf, (res) => {
                    $('#cod_uf').val(res)
                    $('#pais').val('BRASIL')
                    $('#cod_pais').val('1058')
                })
                api.findNomeCidade(data.municipio, function (res) {
                    console.log(res)
                    res?.forEach(element => {
                        if (element.uf.toUpperCase() == data.uf.toUpperCase()) $('#cod_municipio').val(element.codigo)
                    });
                })
                $('#email').val(data.email)
            } else {
                Swal.fire(
                    'Erro!',
                    data.message,
                    'error'
                )
            }
        })
    }
}
