window.onload=function() {
    $.ajax({
        type: 'get',
        url: '/piezaExistente',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'Authorization': 'bearer ' + window.localStorage.getItem('token')
        },
        success: function(data){
            var a=0;
            if(data && data.data && Array.isArray(data.data)){
                data.data.forEach(function (pieza) {
                    $('#accordion').append(generarTablaInsumosExistentesCategoria(pieza.categoria,pieza.id_categoria,a));
                    a=pieza.id_categoria;                      
                    $('#tabla'+a).append(genererarTablaInsumoExistenteContenido(pieza.nombre,pieza.precio,pieza.cantidad));
                });
            }
        },
        error: function(xhr, status, error) {
            if(xhr && xhr.responseJSON && xhr.responseJSON.error){
                alert(xhr.responseJSON.error);
            } else {
                alert(error);
            }
        }

    });    
}

function generarTablaInsumosExistentesCategoria(categoria,id,x) {
    if(x!=id){
        return  '<div class="card" id="card">\n'+
                '<div class="card-header" id="heading'+id+'">\n'+
                    '<h5 class="mb-0 ">\n'+
                    '<button class="btn btn-link text-uppercase" data-toggle="collapse" data-target="#collapse'+id+'" aria-expanded="true" aria-controls="collapse'+id+'" id="amarelo">\n'+
                    'CATEGORIA:  ' +categoria+
                    '</button>\n'+
                    '</h5>\n'+
                '</div>\n'+
                '<div id="collapse'+id+'" class="collapse" aria-labelledby="heading'+id+'" data-parent="#accordion">\n'+
                '<div class="card-body" id="contenido">\n'+
                '<table class="tabla table table-hover" id="tabla'+id+'">\n'+
                '<thead class="thead-amarillo">\n'+
                '<tr>\n'+
                    '<th scope="col"> Nombre </th>\n'+
                    '<th scope="col"> Precio </th>\n'+
                    '<th scope="col"> Cantidad </th>\n'+
                '</tr>\n'+
                '</thead>\n'+
                '</div>\n'+
                '</div>\n'+
                '</div>\n'
  }
    else{
        return
    }
}

  function genererarTablaInsumoExistenteContenido (nombre, precio, cantidad){
    return  '<tbody>\n'+
            '<tr>\n'+
                '<td>'+nombre+'</td>\n'+
                '<td>'+precio+'</td>\n'+
                '<td>'+cantidad+'</td>\n'+
            '</tr>\n'+
            '</tbody>\n'    
  }

  