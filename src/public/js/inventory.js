window.onload = function () {
    $.ajax({
        type: 'get',
        url: '/inventory',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'Authorization': 'bearer ' + window.localStorage.getItem('token')
        },
        success: function (data) {
            $(document).ready(function (){
                $('#registerInventory').submit(function(event){
                    event.preventDefault();
                    let selected = $('#categoria option:selected');
                    let categorySelected = selected.val();
            
                    if(categorySelected === "Null")
                    {
                        alert("Seleccione una categoria ");
                    }
                    else
                    {
                        $.ajax({
                            type: 'post',
                            url: '/agregarinventario',
                            headers: {
                                'Authorization': 'bearer ' + window.localStorage.getItem('token')
                              },
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                nombre: $('#nombre').val(),
                                precio: $('#precio').val(),
                                categoria: categorySelected,
                                subCategoria: $('#subCategoria').val(),
                                cantidad: $('#cantidad').val()
                            }),
                            dataType: 'json',
                            success: function(data) {
                                alert("Se ingreso el insumo corrrectamente");
                                
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
                });
            }); 
        },
        error: function (xhr, status, error) {
            if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                //alert(xhr.responseJSON.error);
                //alert(error);
                //location.href = '/';
                alert("Debe iniciar sesión primero.");
                window.location.href = '/';
            }
        }
    });
}
