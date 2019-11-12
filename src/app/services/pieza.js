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
piezaExistente:(correo) => new Promise(
    (resolve, reject) => {
        mysqlConn.query('SELECT c.id_categoria"id_categoria", p.id_categoria"id_pieza", c.nombre"categoria", p.nombre, p.precio, p.cantidad from((Categoria c INNER JOIN Pieza p ON c.id_categoria = p.id_categoria) INNER JOIN Usuario u ON p.id_usuario = u.id_usuario) where p.id_categoria = ?',
        [correo],
        (err, rows, fields) => {
        if(err) return reject(err);
            if(Array.isArray (rows)&& rows.length >0){
                console.log(rows);
              return resolve(rows);
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
