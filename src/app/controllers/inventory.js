const inventoryServices = require('../services/inventory');

const controller ={};

module.exports = {
    ...controller,
    /**
    insertar el nuevo insumo
    @params: nombre, precio, categoria, subcategoria,cantidad
    @returns {Promise<void>} */
    nuevoInsumo: async (req,res,next) => {
        if(req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario){
            try {
                inv = await inventoryServices.insertNewinsumo(req.body.categoria,req.body.nombre, req.body.precio, req.body.categoria, req.body.subcategoria, req.body.cantidad);
                res.status(200).send({
                    data:inv
                });
            }
            catch(err)
            {
                res.status(err.status ? err.status : 500).send({
                    error:err.message
                });
            }
        }else
        {
            res.status(403).send({
                error:'INVALID_AUTHENTICATION'
            });
        }
    }
}