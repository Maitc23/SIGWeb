const categoriaServices = require('../services/categoria');

const controller ={};

module.exports = {
    ...controller,

    //INSERTA UNA CATEGORI
/**
insertar el nueva pieza
@params: nombre, precio, cantidad
@returns {Promise<void>} */

    nuevaCategoria: async(req,res,next)=>{
        if (req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario) {
            try {
                inv = await categoriaServices.nuevaCategoria(req.body.categoria,req.sessionPayload.data.id_usuario);
                res.status(200).send({
                    data: inv
                })
            } catch (err) {
                res.status(err.status ? err.status : 500).send({
                    error: err.message
                });
            }
        } else {
            res.status(403).send({
                error: 'INVALID_AUTHENTICATION'
            });
        }
    },
    categoriaExistente: async (req, res) => {
        if (req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario) {
            try {
                inv = await categoriaServices.categoriaExistente(req.sessionPayload.data.id_usuario)
                res.status(200).send({
                    data: inv
                })
            } catch (err) {
                res.status(err.status ? err.status : 500).send({
                    error: err.message
                });
            }
        } else {
            res.status(403).send({
                error: 'INVALID_AUTHENTICATION'
            });
        }
    },
    actualizarInsumo: async (req, res, next) => {
        if (req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario) {
            try {
                inv = await categoriaServices.actualizarInsumo(req.body.cantidad, req.body.id, req.sessionPayload.data.id_usuario);
                res.status(200).send({
                    data: inv
                })
            } catch (err) {
                res.status(err.status ? err.status : 500).send({
                    error: err.message
                });
            }
        } else {
            res.status(403).send({
                error: 'INVALID_AUTHENTICATION'
            });
        }
    },



}