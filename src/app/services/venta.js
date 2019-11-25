const mysqlConn = require('../models/pool')();

module.exports={
/*
*Insertar nueva pieza
* @params: nombre, precio, cantidad
* @returns {Promise<any>}
 */
realizarVenta: (precioFinal, idPieza, tipo, cliente, celular, email, direccion, provincia, distrito, costoEnvio, extra, descuento, cantidad ,id_usuario, cuotas) => new Promise(
        (resolve, reject) => { //inicia la promesa
            var tipoPago;
            if(tipo === 0)
                tipoPago = "Contado"
            else
                tipoPago = "Credito"
            mysqlConn.query('Call realizarVenta (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',   //Aqui va el sql para insertar el pago CONTADO
                [precioFinal, idPieza, cliente, celular, tipo, tipoPago, email, direccion, provincia, distrito, costoEnvio, extra, descuento, cantidad, id_usuario, cuotas],
                (err, rows, fields) => {
                if(err) return reject(err);
                    resolve();
                })
    }// finaliza la promesa
    ),
/*
*Insertar nueva pieza
* @params: 
* @returns {Promise<any>}
 */
piezaExistente:(id) => new Promise(
    (resolve, reject) => {
        mysqlConn.query('SELECT c.id_categoria"id_categoria", p.id_categoria"id_pieza", c.nombre"categoria", p.nombre, p.precio, p.cantidad from((Categoria c INNER JOIN Pieza p ON c.id_categoria = p.id_categoria) INNER JOIN Usuario u ON p.id_usuario = u.id_usuario) where p.id_usuario = ?',
        [id],
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
    )}
)

}
