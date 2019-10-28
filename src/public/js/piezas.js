$(document).ready(function (){
    $('#nuevaPieza').submit(function(event){
        event.preventDefault();
        $.ajax({
            type: 'post',
            url: '/nuevaPieza',
            headers: {
                'Authorization': 'bearer ' + window.localStorage.getItem('token')
            },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                nombre: $('#nombre').val(),
                precio: $('#precio').val(),
                cantidad: $('#cantidad').val()
            }),
            dataType: 'json',
            success: function(data){
                alert("Se ha ingresado correctamente la pieza.");
            },
            error: function(xhr, status, error) {
                if(xhr && xhr.responseJSON && xhr.responseJSON.error){
                    alert(xhr.responseJSON.error);
                } else {
                    alert(error);
                }
            },
        });  
    });

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

      function genererarTablaInsumoExistenteContenido (nombre, precio, cantidad){
        return '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">\n'+
        '             <div class="card-body">\n' +
        '              <script>\n'+
        '            documente.write('+nombre+','+precio+','+cantidad+');\n'+
        '               </script>'+
        '         </div>\n'+
        '           </div>\n'
      }

    /**
   * Carga de la tabla con los datos
   */
  function loadCourses() {
    $('#accordeon').html('Cargando cursos...');
    $.ajax({
      type: 'get',
      url: '/piezaExistente',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {
        'Authorization': 'bearer ' + window.localStorage.getItem('token')
      },
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

  if (true) {
    alert("ESTA ENTRANDO");
    loadCourses();
  }
  else
  alert("NO ESTA CARGANDO")
});




