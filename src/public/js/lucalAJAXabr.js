$(document).ready(function () {

    function errorParser(error) {
  
      // Se utiliza el mismo mensaje para ambos errores por motivos de seguridad.
  
      switch (error) {
        case 'USER_NOT_FOUND': return 'El correo electrónico o la contraseña son incorrectos';
        case 'INCORRECT_CREDENTIALS': return 'El correo electrónico o la contraseña son incorrectos';
        default: return 'Error Desconocido';
      }
    }
  
    $('#btn-login').click(function () {
      $.ajax({
        type: 'post',
        url: '/auth/login',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          correo: $('#correo').val(),
          contrasena: $('#contrasena').val()
        }),
        dataType: 'json',
        success: function(data) {
          const token = data.token;
          window.localStorage.setItem('token', token);
          window.location.replace('/perfil.ejs');
        },
        error: function(xhr, status, error) {
          if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
            alert(errorParser(xhr.responseJSON.error));
          } else {
            alert(error);
          }
        },
      });
    });
  });