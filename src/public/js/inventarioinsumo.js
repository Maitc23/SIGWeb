window.onload = function () {
    $.ajax({
        type: 'get',
        url: '/inventarioInsumo',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'Authorization': 'bearer ' + window.localStorage.getItem('token')
        },
        success: function (data) {
            var a = 0;
            if (data && data.data && Array.isArray(data.data)) {
                $('#accordion').html(generarTablaInsumosExistentesCategoria());
                data.data.forEach(function (pieza) {
                    $('#tabla').append(genererarTablaInsumoExistenteContenido(pieza.nombre, pieza.precio, pieza.cantidad));
                });
            }
        },
        error: function (xhr, status, error) {
            if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
        }

    });
}

function generarTablaInsumosExistentesCategoria(id) {
    return '<div class="card" id="card">\n'+
    '<div class="card-header" id="heading'+id+'">\n'+
    '<h5 class="mb-0 ">\n'+
    '<button class="btn btn-link text-uppercase" data-toggle="collapse" data-target="#collapse'+id+'" aria-expanded="true" aria-controls="collapse'+id+'" id="amarelo">\n'+
    'CATEGORIA' +
    '</button>\n' +
    '</h5>\n' +
    '</div>\n' +
    '<div id="collapse'+id+'" class="collapse" aria-labelledby="heading'+id+'" data-parent="#accordion">\n'+
    '<div class="card-body" id="contenido">\n' +
    '<table class="table" id="tabla">\n' +
        '<tr>\n' +
        '<th> Nombre </th>\n' +
        '<th> Precio </th>\n' +
        '<th> Cantidad </th>\n' +
        '</tr>\n'+
    '</table>' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n'
}

function genererarTablaInsumoExistenteContenido(nombre, precio, cantidad) {
    return '<tr>\n' +
        '<td>' + nombre + '</td>\n' +
        '<td>' + precio + '</td>\n' +
        '<td>' + cantidad + '</td>\n' +
        '</tr>\n'
}