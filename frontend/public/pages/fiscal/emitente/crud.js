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
    api.readEmitentes(function (data) {
        console.log(data)
        if (!data.message) {
            if (data.certificado) {
                $('#file').val(data.certificado_name);
                $('#senha').val(data.senha);
            }
            $('#cnpj').val(data.cnpj);
            $('#inscricao_estadual').val(data.inscricao_estadual);
            $('#razao_social').val(data.razao_social);
            $('#nome_fantasia').val(data.nome_fantasia);
            $('#email').val(data.email);
            $('#telefone').val(data.telefone);
            $('#logradouro').val(data.logradouro);
            $('#numero').val(data.numero);
            $('#bairro').val(data.bairro);
            $('#cep').val(data.cep);
            $('#municipio').val(data.municipio);
            $('#cod_municipio').val(data.cod_municipio);
            $('#cod_uf').val(data.cod_uf);
            $('#pais').val(data.pais);
            $('#cod_pais').val(data.cod_pais);
            $('#cst_csosn').val(data.cst_csosn);
            $('#cst_pis').val(data.cst_pis);
            $('#cst_cofins').val(data.cst_cofins);
            $('#cst_ipi').val(data.cst_ipi);
            $('#frete_padrao').val(data.frete_padrao);
            $('#tipo_pagamento').val(data.tipo_pagamento);
            $('#natureza_operacao').val(data.natureza_operacao);
            $('#numero_serie_nfe').val(data.numero_serie_nfe);
            $('#numero_serie_nfce').val(data.numero_serie_nfce);
            $('#ultimo_numero_nfe').val(data.ultimo_numero_nfe);
            $('#ultimo_numero_nfce').val(data.ultimo_numero_nfce);
            $('#ultimo_numero_cte').val(data.ultimo_numero_cte);
            $('#ultimo_numero_mdfe').val(data.ultimo_numero_mdfe);
            $('#csc').val(data.csc);
            $('#csc_id').val(data.csc_id);
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
    event.preventDefault();

    let json = $(this).serializeFormJSON()

    api.getUFbyId(json.cod_uf, (res) => {
        json.uf = res
    })
    if (document.getElementById('certificado').files.length) {
        json.certificado_name = document.getElementById('certificado').files[0].name
        json.certificado = await toBase64(document.getElementById('certificado').files[0])
    } else {
        delete json['certificado_name']
        delete json['certificado']
        delete json['senha']
    }

    console.log(json)
    api.updateEmitente(json, function (data) {
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
    })
});

api.getAllNaturezaOperacao(function (data) {
    console.log(data)
    if (!data.message) {
        data.forEach(element => {
            $('#natureza_operacao_pdv').append(`<option value="${element.id}" selected="selected">${element.natureza}</option>`);
        });
    } else {
        Swal.fire(
            'Erro!',
            data.message,
            'error'
        )
    }
})