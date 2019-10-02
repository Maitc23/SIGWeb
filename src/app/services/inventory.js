const mysqlConn = require('../models/pool')();

module.exports = {

/**Insertar nuevo insumo
* @params: nombre, precio, categoria, subcategoria,cantidad
* @returns {Promise<any>}
 */
 insertNewinsumo: (nombre, precio, categoria, subcategoria,cantidad) => new Promise(
     (resolve, reject) => {
         mysqlConn.query('Call insertarnuevoinsumo (?,?,?,?,?)'),
         [nombre, precio, categoria, subcategoria,cantidad],
         (err,rows,fields) =>{
             if(err) return reject(err);
             resolve();
         }
     }
 )
}