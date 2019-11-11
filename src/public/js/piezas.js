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
});




