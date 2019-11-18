const mysqlConn = require('../models/pool')();

module.exports = {
    nuevaCategoria:(categoria,id) => new Promise(
        (resolve,reject) => {
            mysqlConn.query(
                    'INSERT INTO Categoria (nombre, id_usuario) VALUES (?,?)',
                    [categoria,id],
                (err, rows, fields) => {
                    if (err) return reject(err);
                    resolve();
                }
            )
        }
    ), 
    categoriaExistente: (id) => new Promise(
        (resolve, reject) => {
            mysqlConn.query(
                'SELECT * FROM Categoria Where id_usuario=?',
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
    actualizarInsumo: (cantidad,id_insumo, id) => new Promise(
        (resolve, reject) => {
            mysqlConn.query(
                'UPDATE Insumo SET cantidad = ? WHERE id_insumo = ? && id_usuario = ? ;',
                [cantidad, id_insumo,id],
                (err, rows, fields) => {
                    if (err) return reject(err);
                    resolve();
                }
            )
        }
    ),
}