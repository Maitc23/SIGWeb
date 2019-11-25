window.onload = function () {
    //Cargar las categorias existentes en un select 
    $.ajax({
        type: 'get',
        url: '/categoriaExistente',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'Authorization': 'bearer ' + window.localStorage.getItem('token')
        },
        success: function (data) {
            if (data && data.data && Array.isArray(data.data)) {
                $('#categoria-form').html(crearSelect())
                data.data.forEach(function (pieza) {
                    $('#catselect').append(llenarselect(pieza.nombre,pieza.id_categoria));
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

    //Cargar la lista de los insumos de ese usuario
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
                $('#tabla').html(generarTabla())
                data.data.forEach(function (pieza) {
                    $('#myTable').append(generarContendioTabla(pieza.id_insumo, pieza.nombre,pieza.cantidad));
                });
                $('#myTable').DataTable();
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

function btnFuncionamiento() {
    $("#agregarCategoria").show();
    $("#agregarCategoria").html(contenidocategoria());
}

function clicTest() {
    if ($('#categoria').val()) //Verificamos si el campo categoria tiene datos
    {
        $("#agregarCategoria").hide();
        $.ajax({// Inserta los datos en la base de datos
            type: 'post',
            url: '/nuevaCategoria',
            headers: {
                'Authorization': 'bearer ' + window.localStorage.getItem('token')
            },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({categoria :$('#categoria').val()}),
            dataType: 'json',
            success: function (data) {
                alert("Categoria Ingresada Correctamente.");
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                    alert(xhr.responseJSON.error);
                } else {
                    alert(error);
                }
            }

        });
        $.ajax({
            type: 'get',
            url: '/categoriaExistente',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            headers: {
                'Authorization': 'bearer ' + window.localStorage.getItem('token')
            },
            success: function (data) {
                if (data && data.data && Array.isArray(data.data)) {
                    $('#categoria-form').html(crearSelect())
                    data.data.forEach(function (pieza) {
                        $('#catselect').append(llenarselect(pieza.nombre, pieza.id_categoria));
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
    else{
        alert("Porfavor Introduzca la categoria")
    }
}

function crearSelect() {
    return '<select id="catselect"></select>'
}

function llenarselect(categoria, id) {
    return '<option value="' + id + '">' + categoria + '</option>'
}
function contenidocategoria() {
    return '<div class="form-group row">' +
        '<label class="col-sm-2 col-form-label">Categoria:</label>' +
        '<div class="col-sm-10">' +
        '<input class="form-control" id="categoria" name="" type="text" placeholder="Introduzca la categoria que desea agregar" required>' +
        '</div>' +
        '</div>' +
        '<div class="form-group row" >' +
        '<div class="col-sm-12 text-center">' +
        '<button type="submit" id="btncategorianueva" onclick="clicTest()" class="btn-get-started2" style="background-color:white;">Guardar</button> ' +
        '</div>' +
        '</div >'
}
function generarTabla() {
    return '<table id ="myTable">' +
        '<thead>'+
            '<tr class="header">' +
                '<th style="width:60%;">Nombre del Insumo</th>' +
            '</tr>'+
        '</thead>'+
        '<tbody>'+

        '</tbody>'+
        '</table>'
}
function generarContendioTabla(id, nombre,cantidad) {
    return '<tr>' +
        '<td onclick="modal(' + id+','+cantidad+')" data-toggle="modal" data-target="#exampleModalCenter">' + nombre + '</td>' +
            '</tr>'
}
function modal(id,cantidad) {
    console.log(id,cantidad);
    a= '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"'+
        'aria-hidden="true">'+
        '<div class="modal-dialog modal-dialog-centered" role="document">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<h5 class="modal-title" id="exampleModalLongTitle">Cantidad de Insumo utilizado:</h5>'+
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '<span aria-hidden="true">&times;</span>'+
                    '</button>'+
                '</div>'+
                '<div class="modal-body">'+
        '<div class="form-group row">'+
                '<div class="col-sm-10">'+
                    '<input class="form-control" id="ctninsumo" name="" type="number" min="0" placeholder="Cantidad"'+
                    'required>'+
                    '<div id="mensaje"></div>'+
                    '</div>'+   
                '</div>'+
                '<div class="modal-footer">'+
                    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
                    '<button type="button" id="btnactualizar"class="btn btn-primary" data-dismiss="modal">Actualizar</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'
    $('#modal').html(a);
    $('#ctninsumo').change(function () {
        var cantidadingresada = $('#ctninsumo').val();
        if(cantidadingresada>cantidad){
            $('#mensaje').show();
            $('#btnactualizar').hide();
                $('#mensaje').html("La cantidad maxima de este insumo es de: "+cantidad);
            }
            else{
            $('#mensaje').hide();
            $('#btnactualizar').show();
            }
    })


    $('#btnactualizar').click(function () {
        var cantidadingresada = $('#ctninsumo').val();
        var cantidadreal = cantidad- cantidadingresada
        $.ajax({
            type: 'post',
            url: '/actualizarInsumo',
            headers: {
                'Authorization': 'bearer ' + window.localStorage.getItem('token')
            },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({  cantidad: cantidadreal,
                                          id: id  }),
            dataType: 'json',
            success: function (data) {
                alert("Insumo Actualizado Correctamente");
            },
            error: function (xhr, status, error) {
                if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                    alert(xhr.responseJSON.error);
                } else {
                    alert(error);
                }
            },

        });
        //------------------------------------------------------------
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
                    $('#tabla').html(generarTabla())
                    data.data.forEach(function (pieza) {
                        $('#myTable').append(generarContendioTabla(pieza.id_insumo, pieza.nombre, pieza.cantidad));
                    });
                    $('#myTable').DataTable();
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
    })
}

//Funcion que controla el formulario principal
function guardarPiezas() {
    var categoria = document.getElementById("catselect").value;
    var nombre = $('#nombrePieza').val();
    var costoHora = $('#costoHora').val();
    var numeroHoras = $('#numeroHoras').val();
    var extra = $('#extra').val();
    var cantidad = $('#cantidad').val();
    if (nombre.length<=0){//validacion de datos vacios
        $('#nombrePieza').focus();
    }else{
        if (costoHora.length <= 0) {
            $('#costoHora').focus();
        } else {
            if (numeroHoras.length <= 0) {
                $('#numeroHoras').focus();
            } else {
                if (extra.length <= 0) {
                    $('#extra').focus();
                } else {
                    if (cantidad.length <= 0) {
                        $('#cantidad').focus();
                    } else {
                        var costo = parseInt(costoHora)*parseInt(numeroHoras)+parseInt(extra)
                        $.ajax({//Insercion de los datos del formulario
                            type: 'post',
                            url: '/nuevaPieza',
                            headers: {
                                'Authorization': 'bearer ' + window.localStorage.getItem('token')
                            },
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ categoria: categoria,
                                                    nombre: nombre,
                                                    costo: costo,
                                                    cantidad: cantidad,
                                                    imagen: "foto.jpg"}),
                            dataType: 'json',
                            success: function (data) {
                                alert("Pieza Guardada Correctamente.");
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
                }
            }
        }
    }
}


