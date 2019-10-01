"use strict"; 

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

module.exports = mysqlConnection;