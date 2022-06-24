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
importJs('../../src/socket.js');

document.write(`
<head id="head">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description"
        content="Modern admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities with bitcoin dashboard.">
    <meta name="keywords"
        content="admin template, modern admin template, dashboard template, flat admin template, responsive admin template, web app, crypto dashboard, bitcoin dashboard">
    <meta name="author" content="PIXINVENT">
    <title>Admin</title>
    <link rel="apple-touch-icon" href="../../admin/app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="../../admin/app-assets/images/ico/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/vendors/css/tables/datatable/datatables.min.css">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/vendors/css/vendors.min.css">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/css/colors.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/css/components.css">
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css"
        href="../../admin/app-assets/css/core/menu/menu-types/vertical-menu-modern.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/css/core/colors/palette-gradient.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/vendors/css/charts/jquery-jvectormap-2.0.3.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/vendors/css/charts/morris.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/fonts/simple-line-icons/style.css">
    <link rel="stylesheet" type="text/css" href="../../admin/app-assets/css/core/colors/palette-gradient.css">
    
</head>

<!-- BEGIN: Vendor JS-->
<script src="../../admin/app-assets/vendors/js/vendors.min.js"></script>
<!-- BEGIN Vendor JS-->

<!-- BEGIN: Page Vendor JS-->
<script src="../../admin/app-assets/vendors/js/charts/chart.min.js"></script>
<script src="../../admin/app-assets/vendors/js/charts/raphael-min.js"></script>
<script src="../../admin/app-assets/vendors/js/charts/morris.min.js"></script>
<script src="../../admin/app-assets/vendors/js/charts/jvector/jquery-jvectormap-2.0.3.min.js"></script>
<script src="../../admin/app-assets/vendors/js/charts/jvector/jquery-jvectormap-world-mill.js"></script>
<script src="../../admin/app-assets/data/jvector/visitor-data.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/js/standalone/selectize.min.js" integrity="sha256-+C0A5Ilqmu4QcSPxrlGpaZxJ04VjsRjKu+G82kl5UJk=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/css/selectize.bootstrap3.min.css" integrity="sha256-ze/OEYGcFbPRmvCnrSeKbRTtjG4vGLHXgOqsyLFTRjg=" crossorigin="anonymous" />
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src="../../admin/app-assets/js/core/app-menu.js"></script>
<script src="../../admin/app-assets/js/core/app.js"></script>
<!-- END: Theme JS-->

<script src="../../admin/app-assets/vendors/js/tables/datatable/datatables.min.js"></script>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<style>
    .noselect {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Safari */
        -khtml-user-select: none;
        /* Konqueror HTML */
        -moz-user-select: none;
        /* Old versions of Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                              supported by Chrome, Edge, Opera and Firefox */
    }

    .arquivo {
        display: none;
    }

    table.dataTable td {
        font-size: 14px;
    }
    
    table.dataTable th {
        font-size: 14px;
    }
    
    thead,
    th {
        text-align: left;
    }
    
    .table td,
    .table th {
        /* padding: 3px !important; 
        padding: .2rem !important; */
    }
    
</style>
`) 