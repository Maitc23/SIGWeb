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

}