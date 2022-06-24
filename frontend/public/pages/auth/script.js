$('#signin').submit(function (e) {

    e.preventDefault();
    $('#message').text('');
    $('#loading').removeAttr('hidden');

    let postData = $(this).serializeArray();
    let json = {}

    for (let i = 0; i < postData.length; i++) {
        json[postData[i].name] = postData[i].value;
    }

    ajax(_BASE_URL + 'api/usuarios/login', 'POST', json, function (res) {
        console.log(res)
        if (res.accessToken) {
            localStorage.setItem('user', JSON.stringify(res))
            $(location).attr('href', `/index.html`);
        } else {
            res.message != undefined ?
                $('#message').text(res.message) :
                $('#message').text('Sem conexão com servidor.')
            $('#loading').attr('hidden', 'true');
        }
    });

});

$('#signup').submit(function (e) {

    e.preventDefault();
    $('#loading').removeAttr('hidden');

    let postData = $(this).serializeArray();
    let json = {}

    for (let i = 0; i < postData.length; i++) {
        json[postData[i].name] = postData[i].value;
    }

    console.log(json)

    ajax(_BASE_URL + 'api/usuarios', 'POST', json, function (res) {
        console.log(res)
        if (res.accessToken) {
            localStorage.setItem('user', JSON.stringify(res))
            $(location).attr('href', `/index.html`);
        } else {
            res.responseJSON != undefined ?
                $('#message').text(res.responseJSON.message) :
                $('#message').text('Sem conexão com servidor.')
            $('#loading').attr('hidden', 'true');
        }
    });

});

$(document).ready(function () {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_PROFILE, 'GET', {}, function (res) {
            console.log(res)
            if (res.accessToken) {
                localStorage.setItem('user', JSON.stringify(res))
                $(location).attr('href', `/index.html`);
            }
        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
});