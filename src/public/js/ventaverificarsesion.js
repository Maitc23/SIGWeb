window.onload = function () {
    $.ajax({
        type: 'get',
        url: '/venta',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'Authorization': 'bearer ' + window.localStorage.getItem('token')
        },
        success: function (data) {
                
        },
        error: function (xhr, status, error) {
            if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                //alert(xhr.responseJSON.error);
                //alert(error);
                alert("Debe iniciar sesión primero.");
                window.location.href = '/';
            }
        }

    });
}