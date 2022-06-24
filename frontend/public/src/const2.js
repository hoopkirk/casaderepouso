_BASE_URL = 'http://localhost:8080/'

var _OPTIONS_DATE = {
    timeZone: 'America/Sao_Paulo',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

logout = () => { localStorage.setItem('user', null); $(location).attr('href', `/pages/auth/signin.html`) }

dataFormatada = (data) => {
    let dt = new Date(data)
    return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`
}

ajax = (url, type, data, callback) => {
    let token = JSON.parse(localStorage.getItem('user')) != null ? JSON.parse(localStorage.getItem('user')).accessToken : '';
    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        headers: { 'Authorization': `Bearer ${token}` },
        dataType: "json",
        success: function (res) {
            if (res.status) {
                $(".alert").fadeTo(2000, 500).slideUp(500, function () {
                    $(".alert").slideUp(500);
                    $(".alert").slideUp(0);
                });
            }
            callback(res);
        },
        error: function (request, status, errorThrown) { callback(request) }
    });
}


ajaxForm = (url, type, data, callback) => {
    let token = JSON.parse(localStorage.getItem('user')) != null ? JSON.parse(localStorage.getItem('user')).accessToken : '';
    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(data),
        contentType: "multipart/form-data; charset=utf-8",
        //application/x-www-form-urlencoded
        headers: { 'Authorization': `Bearer ${token}` },
        dataType: "json",
        success: function (res) {
            if (res.status) {
                $(".alert").fadeTo(2000, 500).slideUp(500, function () {
                    $(".alert").slideUp(500);
                    $(".alert").slideUp(0);
                });
            }
            callback(res);
        },
        error: function (request, status, errorThrown) { callback(request) }
    });
}

importJs = (file) => {
    if (file) document.write(`<script src="${file}" type="text\/javascript"><\/script>`);
}

route = (e) => {
    classActives = document.getElementById('main-menu-navigation').querySelectorAll('.active')
    classActives.forEach((item) => { $(item).removeAttr("class") })
    $(e).parent().attr("class", "active");
    $('#' + $(e).parent().attr('id')).click();
    try {
        $('#' + $(e).parent().attr('id')).click();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.getElementsByClassName('nav-link nav-menu-main menu-toggle hidden-xs')[0].click()
        }
    } catch (error) {
        console.log(error.message)
    }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

importJs('../../src/api.js');
importJs('../../src/helpers.js');

