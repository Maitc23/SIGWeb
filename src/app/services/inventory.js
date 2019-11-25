const mysqlConn = require('../models/pool')();

module.exports = {

/**Insertar nuevo insumo
* @params: nombre, precio, categoria, subcategoria,cantidad,id_usuario
* @returns {Promise<any>}
 */
 insertNewinsumo: (nombre, precio, categoria, subcategoria,cantidad,id_usario) => new Promise(
     (resolve, reject) => {
         mysqlConn.query(
             'Call InsertarNuevoInsumo (?,?,?,?,?,?)',
         [nombre, precio, categoria, subcategoria,cantidad, id_usario],
         (err,rows,fields) =>{
             if(err) return reject(err);
             resolve();
            }
         )
     }
 ),
/**SOLICITAMOS LOS DATOS DE PIEZA nombre, precio, cantidad */
    inventarioPieza: (id) => new Promise(
        (resolve, reject) => {
            mysqlConn.query('SELECT nombre,precio,cantidad FROM Pieza WHERE id_usuario = ?',
                [id],
                (err, rows, fields) => {
                    if (err) return reject(err);
                    if (Array.isArray(rows) && rows.length > 0) {
                        return resolve(rows);
                    }
                    else {
                        return reject({
                            status: 404,
                            message: 'No hay insumos registrados'
                        });
                    }
                }
            )
        }
    ),

    inventarioInsumo: (id) => new Promise(
        (resolve, reject) => {
            mysqlConn.query('SELECT id_insumo,nombre,precio,cantidad FROM Insumo WHERE id_usuario = ?',
                [id],
                (err, rows, fields) => {
                    if (err) return reject(err);
                    if (Array.isArray(rows) && rows.length > 0) {
                        return resolve(rows);
                    }
                    else {
                        return reject({
                            status: 404,
                            message: 'USER_NOT_FOUND'
                        });
                    }
                }
            )
        }
    ),
 
}