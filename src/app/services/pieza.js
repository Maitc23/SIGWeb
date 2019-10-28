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
/*
*Insertar nueva pieza
* @params: 
* @returns {Promise<any>}
 */
consultaPieza:() => new Promise(
    (resolve, reject) => {
        mysqlConn.query('SELECT c.id_categoria,p.id_categoria,c.nombre,p.nombre, p.precio, p.cantidad from Categoria c INNER JOIN Pieza p ON c.id_categoria = p.id_categoria',
        (err, rows, fields) => {
        if(err) return reject(err);
            if(Array.isArray (rows)&& rows.length >0){
                return resolve(rows[0]);
            }
            else{
                return reject({
                    status: 404,
                    message: 'USER_NOT_FOUND'
                  });
            }
        }
    )
}
)
}
