 $(document).ready(function (){
    $.ajax({
        type: 'get',
        url: '/inventarioPieza',
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
                //alert(xhr.responseJSON.error);
                alert("Debe iniciar sesión primero.");
               } else {
                alert(error);
            }
        }

    });
});

function generarTablaInsumosExistentesCategoria() {
        return '<table class="tabla table table-hover" id="tabla">\n' +
            '<thead class="thead-amarillo">\n' +
            '<tr>\n'+
                '<th> Nombre </th>\n' +
                '<th> Precio </th>\n' +
                '<th> Cantidad </th>\n' +
            '</tr>\n'+
            '</thead>\n'    
}

function genererarTablaInsumoExistenteContenido(nombre, precio, cantidad) {
    return  '<tbody>\n'+
            '<tr>\n' +
                '<td>' + nombre + '</td>\n' +
                '<td>' + precio + '</td>\n' +
                '<td>' + cantidad + '</td>\n' +
            '</tr>\n'+
            '</tbody>\n'
}
