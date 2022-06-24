
const helpers = {
    async dataFormatada(dt) {
        let data = new Date(dt),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano = data.getFullYear();
        horas = data.getHours().toString().padStart(2, '0')
        minutos = data.getMinutes().toString().padStart(2, '0')
        segundos = data.getSeconds().toString().padStart(2, '0')
        return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
    },
    async maskTelefone(tel) {
        let valor = tel
        let retorno = valor.replace(/\D/g, "");
        retorno = retorno.replace(/^0/, "");
        if (retorno.length > 10) {
            retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (retorno.length > 5) {
            if (retorno.length == 6 && event.code == "Backspace") {
                // necessário pois senão o "-" fica sempre voltando ao dar backspace
                return;
            }
            retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (retorno.length > 2) {
            retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            if (retorno.length != 0) {
                retorno = retorno.replace(/^(\d*)/, "($1");
            }
        }
        return retorno
    }
}