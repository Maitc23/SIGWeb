"use strict"; 

/**
*  
*credenciales de la base de datos oficial
*quitar de comentarios para hacerlo funcionar
* */
function mysqlConnection(){
    let mysql = require('mysql'); 

    const connection = mysql.createConnection({
        user: 'ufvyh061sjes3rih',
        password: 'GFouYb10hdLzD6XUYkza', 
        host: 'br3sscnfibc3ctd9uesh-mysql.services.clever-cloud.com', 
        port: '3306', 
        database: 'br3sscnfibc3ctd9uesh' 
    }); 
    return connection;
}   


/*
 * Credenciales locales para pruebas base de funcionalidad
 * Borrar al terminar o cambiar acceso
 *          
function mysqlConnection(){
    let mysql = require('mysql'); 

    const connection = mysql.createConnection({
        user: 'root',
        password: 'password', 
        host: 'localhost', 
        port: '3306', 
        database: 'proyecto_sig' 
    }); 
    return connection;
}
*/
module.exports = mysqlConnection;