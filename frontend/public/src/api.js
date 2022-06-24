const api = {
    async removePedido(id, call) {
        await ajax(_BASE_URL + 'api/pedidos/' + id, 'DELETE', {}, call);
    },
    async updatePedido(json, id, call) {
        await ajax(_BASE_URL + 'api/pedidos/' + id, 'PUT', json, call);
    },
    async getPedido(id, call) {
        await ajax(_BASE_URL + 'api/pedidos/' + id, 'GET', {}, call);
    },
    async getAllPedidos(call) {
        await ajax(_BASE_URL + 'api/pedidos/', 'GET', {}, call);
    },
    async getValores(json, call) {
        await ajax(_BASE_URL + 'api/pedidos/valores', 'POST', json, call);
    },
    async insertPedidos(json, call) {
        await ajax(_BASE_URL + 'api/pedidos/', 'POST', json, call);
    },
    async getUser(call) {
        await ajax(_BASE_URL + 'api/usuarios/id', 'GET', {}, call);
    },
    async updateUser(json, call) {
        await ajax(_BASE_URL + 'api/usuarios/id', 'PUT', json, call);
    },
    getNameEventType(id) {
        let js = {
            '1': 'Futebol',
            '2': 'Tênis',
            '7522': 'Basquete',
            '4339': 'Galgos'
        };
        return js[id]
    },
    async removeProdutos(id, call) {
        await ajax(_BASE_URL + 'api/produtos/' + id, 'DELETE', {}, call);
    },
    async updateProdutos(json, id, call) {
        await ajax(_BASE_URL + 'api/produtos/' + id, 'PUT', json, call);
    },
    async insertProdutos(json, call) {
        await ajax(_BASE_URL + 'api/produtos/', 'POST', json, call);
    },
    async getAllProdutos(call) {
        await ajax(_BASE_URL + 'api/produtos/', 'GET', {}, call);
    },
    async getProduto(id, call) {
        await ajax(_BASE_URL + 'api/produtos/' + id, 'GET', {}, call);
    },
    async removeClientes(id, call) {
        await ajax(_BASE_URL + 'api/clientes/' + id, 'DELETE', {}, call);
    },
    async updateClientes(json, id, call) {
        await ajax(_BASE_URL + 'api/clientes/' + id, 'PUT', json, call);
    },
    async insertClientes(json, call) {
        await ajax(_BASE_URL + 'api/clientes/', 'POST', json, call);
    },
    async getAllClientes(call) {
        await ajax(_BASE_URL + 'api/clientes/', 'GET', {}, call);
    },
    async getCliente(id, call) {
        await ajax(_BASE_URL + 'api/clientes/' + id, 'GET', {}, call);
    },
    async removeNatureOperacao(id, call) {
        await ajax(_BASE_URL + 'api/natureza_operacoes/' + id, 'DELETE', {}, call);
    },
    async insertNaturezaOperacao(json, call) {
        await ajax(_BASE_URL + 'api/natureza_operacoes/', 'POST', json, call);
    },
    async getAllNaturezaOperacao(call) {
        await ajax(_BASE_URL + 'api/natureza_operacoes/', 'GET', {}, call);
    },
    async readEmitentes(call) {
        await ajax(_BASE_URL + 'api/emitentes/', 'GET', {}, call);
    },
    async updateEmitente(json, call) {
        await ajax(_BASE_URL + 'api/emitentes/', 'PUT', json, call);
    },
    async findNomeCidade(nomeCidade, call) {
        await ajax(_BASE_URL + 'api/cidades/' + nomeCidade, 'GET', {}, call);
    },
    async findCNPJ(cnpj, call) {
        // await ajax('https://www.receitaws.com.br/v1/cnpj/' + cnpj, 'GET', {}, call);
        $.ajax({
            url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: async function (data) {
                call(data);
            },
            error: function (e) {
                call(e);

            },
        });
    },
    async getUF(uf, call) {
        let js = {
            'RO': '11',
            'AC': '12',
            'AM': '13',
            'RR': '14',
            'PA': '15',
            'AP': '16',
            'TO': '17',
            'MA': '21',
            'PI': '22',
            'CE': '23',
            'RN': '24',
            'PB': '25',
            'PE': '26',
            'AL': '27',
            'SE': '28',
            'BA': '29',
            'MG': '31',
            'ES': '32',
            'RJ': '33',
            'SP': '35',
            'PR': '41',
            'SC': '42',
            'RS': '43',
            'MS': '50',
            'MT': '51',
            'GO': '52',
            'DF': '53'
        };
        call(js[uf])
    },
    async getUFbyId(uf, call) {
        let js = {
            '11': 'RO',
            '12': 'AC',
            '13': 'AM',
            '14': 'RR',
            '15': 'PA',
            '16': 'AP',
            '17': 'TO',
            '21': 'MA',
            '22': 'PI',
            '23': 'CE',
            '24': 'RN',
            '25': 'PB',
            '26': 'PE',
            '27': 'AL',
            '28': 'SE',
            '29': 'BA',
            '31': 'MG',
            '32': 'ES',
            '33': 'RJ',
            '35': 'SP',
            '41': 'PR',
            '42': 'SC',
            '43': 'RS',
            '50': 'MS',
            '51': 'MT',
            '52': 'GO',
            '53': 'DF'
        };
        call(js[uf])
    }
}

// api.call(variabel, function (data) {
//     console.log(data)
//     if (!data.message) {

//     } else {
//         alert(data.message)
//     }
// })