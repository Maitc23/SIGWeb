//Variables Globales
var venta;
var precioSeleccionado;
var cantidad;
var precioFinal;
var precio;
var idPieza;
var tipo; // 0 para contado y 1 para cuotas
var costoEnvio, extra, descuento;
//= $("#cantidadPiezas").val();
var cantidadExistente;
window.onload = function () {
    precioFinal = 0;
    venta = true;
    precio = 0;
    tipo = 0;
    $.ajax({ //Ajax para traer las piezas existentes a traves del metodo get al API
        type: 'get',
        url: '/piezaExistente',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'Authorization': 'bearer ' + window.localStorage.getItem('token')
        },
        success: function (data) {
            var a = 0;
            if (data && data.data && Array.isArray(data.data)) {
                precioSeleccionado = data.data[0].precio;
                cantidadExistente = data.data[0].cantidad;
                idPieza = data.data[0].id_pieza;
                costoEnvio = 0;
                extra = 0;
                descuento = 0;
                cantidad = 1;
                precio = CalcularPrecio(precioSeleccionado, cantidad);
                $("#precioFinal").html(" " + precio);
                // console.log(data.data);
                var categoriaActual, categoriaSiguiente;
                categoriaActual = data.data[0].id_categoria;
                $('#piezasExistentes').append("<optgroup label=" + data.data[0].categoria + "></optgroup>");
                data.data.forEach(function (pieza) {
                    categoriaSiguiente = pieza.id_categoria;
                    if (categoriaActual != categoriaSiguiente) {
                        $('#piezasExistentes').append("<optgroup label=" + pieza.categoria + "></optgroup>");
                    }
                    $('#piezasExistentes').append(genererarSelect(pieza.nombre, pieza.precio, pieza.cantidad, pieza.id_pieza));
                });
                $("#piezasExistentes").prop("selectedIndex", 0).attr('selected', true);
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


$("#piezasExistentes").change(function () {
    var optionSelected = $(this).children("option:selected", this); //el objeto opcion
    precioSeleccionado = $(this).children("option:selected").val(); //precio de la opcion seleccionada
    cantidadExistente = parseInt(optionSelected[0].dataset.can); //cantidad existente de la opcion seleccionada
    idPieza = $(this).children("option:selected").attr("id"); //Seteo el id de la pieza
    console.log(idPieza);
    console.log(cantidad+" > "+cantidadExistente);
    precio = CalcularPrecio(precioSeleccionado, cantidad);
    if (cantidad>cantidadExistente)
    {
     venta = false;
     precioTotal();
    }
    else{
        venta = true;
          precioTotal();
    }

});

$("#cantidadPiezas").change(function () {
    //precioSeleccionado = $(this).children("option:selected").val();
    cantidad = $("#cantidadPiezas").val(); //cantidad del input
    console.log(cantidad+" > "+cantidadExistente);
    precio = CalcularPrecio(precioSeleccionado, cantidad);
    if (cantidad>cantidadExistente)
    {
     venta = false;
     precioTotal();
    }else{
        venta = true;
        precioTotal();
    }
});


function CalcularPrecio(precioSeleccionado, cantidad) {
    return cantidad * precioSeleccionado;
}

function genererarSelect(nombre, precio, cantidad, id) {
    return `<option value="${parseFloat(precio)}" id="${id}" data-can="${cantidad}" onchange="data(this)">${nombre}</option>`
}

function precioTotal(){
    costoEnvio = parseFloat($("#costoEnvio").val());
    extra = parseFloat($("#extra").val());
    descuento = parseFloat($("#descuento").val());
    tipo = parseInt($('input[name=tipo]:checked').val());
    console.log(tipo + "tipo" + descuento);
    precioFinal = (precio + costoEnvio + extra - descuento);
    actualizarTotal();
}

function actualizarTotal(){
    console.log(venta);
    if(venta)
        $("#precioFinal").html(precioFinal);
    else
        $("#precioFinal").html("La cantidad es mayor a la existente, <br> actualmente tiene: <strong> " + cantidadExistente + " </strong> en inventario.");
}

// AJAX para realizar la venta a traves del metodo post.
$("#realizar-venta").click(function () {
    event.preventDefault();
    var cliente = $("#cliente").val();
    var celular = $("#celular").val();
    var email = $("#email").val();
    var direccion = $("direccion").val();
    var provincia = $("#provincia").val();
    var distrito = $("#distrito").val();
    var cuotas = $("#cuotas").val();
    precioTotal();
    if(venta){
        $.ajax({
            type: 'post',
            url: '/venta',
            headers: {
                'Authorization': 'bearer ' + window.localStorage.getItem('token')
            },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                precioFinal,
                idPieza,
                tipo,
                cliente,
                celular,
                email,
                direccion,
                provincia,
                distrito,
                costoEnvio,
                extra,
                descuento,
                cantidad,
                cuotas
            }),
            dataType: 'json',
            success: function(data){
                alert("Se ha realizando la venta correctamente");
            },
            error: function(xhr, status, error) {
                if(xhr && xhr.responseJSON && xhr.responseJSON.error){
                    alert(xhr.responseJSON.error);
                } else {
                    alert(error);
                }
            },
        });
    } 
    else{
        alert("No se puede realizar la venta, revise los datos.");
    }

});

//lo del radiobutton
$('input[type="radio"]').click(function(){
    if($(this).attr("value")=="0"){
        $(".box").hide('slow');
    }
    if($(this).attr("value")=="1"){
        $(".box").show('slow');

    }        
});
$('input[type="radio"]').trigger('click');
