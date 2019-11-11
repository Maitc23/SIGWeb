$(document).ready(function(){
  //GENERADOR DE LAS CATEGORIAS
  function generarTablaInsumosExistentesCategoria(categoria) {
    return  '<div id="accordion">\n' +
    '         <div class="card-header" id="headingOne">\n'+
    '           <h5 class="mb-0">\n' +
    '             <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="amarelo">\n' +
    '             <script>\n'+
    '            documente.write('+categoria+');\n'+
    '               </script>'+
    '                  </button>'+
    '              </h5>\n'+
    '               </div>\n' +
    '               </div>'      
  }
  //GENERADOR DEL CONTENIDO DE CATEGORIAS
  function genererarTablaInsumoExistenteContenido (nombre, precio, cantidad){
    return '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">\n'+
    '             <div class="card-body">\n' +
    '              <script>\n'+
    '            documente.write('+nombre+','+precio+','+cantidad+');\n'+
    '               </script>'+
    '         </div>\n'+
    '           </div>\n'
  }
  function cargarContenido(){
    $('#accordion').html('');
    $.ajax({
      type: 'GET',
      url: '/piezaExistente',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
        $('#accordion').html('');
        if (data && data.data && Array.isArray(data.data)) {
          data.data.forEach(function (pieza) {
            $('#accordion').append(generarTablaInsumosExistentesCategoria(pieza.categoria));
          });
        }
      },
      error: function(xhr, status, error) {
        if (xhr && xhr.status && xhr.status >= 400 && xhr.status <= 404) {
                } else {
          alert(error);
        }
      },
    });
  }

  cargarContenido();
});

 
  