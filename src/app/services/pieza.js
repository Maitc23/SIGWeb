const mysqlConn = require('../models/pool')();

module.exports={
/*
*Insertar nueva pieza
* @params: nombre, precio, cantidad
* @returns {Promise<any>}
 */
nuevaPieza: (nombre, precio, cantidad) => new Promise(
        (resolve, reject) => {
            mysqlConn.query('Call NewPieza (?,?,?)',
            [nombre, precio, cantidad],
            (err, rows, fields) => {
            if(err) return reject(err);
                resolve();
            }
        )
    }
),
}