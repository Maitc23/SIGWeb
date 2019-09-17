"use strict"; 

function mysqlConnection(){
    let mysql = require('mysql'); 

    const connection = mysql.createConnection({
        user: 'uwcmgoqffevhzqbo',
        password: 'ssrWHWCOS6XL08HajhxZ', 
        host: 'b8sxphxdtyqvxmqteo1u-mysql.services.clever-cloud.com', 
        port: '3306', 
        database: 'b8sxphxdtyqvxmqteo1u' 
    }); 
    return connection;
}

module.exports = mysqlConnection;