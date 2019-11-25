const piezasServices = require('../services/pieza');
const ventaServices = require('../services/venta');

const controller = {};

module.exports= {
	...controller,
	/**
	insertar el nueva pieza
	@params: nombre, precio, cantidad
	@returns {Promise<void>} */

	realizarVenta: async(req,res,next) => {
		if (req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario){
			try{
				venta = await ventaServices.realizarVenta(req.body.precioFinal, req.body.idPieza, req.body.tipo, req.body.cliente, req.body.celular, req.body.email, req.body.direccion, req.body.provincia, req.body.distrito, req.body.costoEnvio, req.body.extra, req.body.descuento, req.body.cantidad, req.sessionPayload.data.id_usuario, req.body.cuotas);
				res.status(200).send({
					data:venta
				})
			}
			catch(err){
				res.status(err.status ? err.status : 500).send({
					error:err.message
				});
			}
		}
		else{
			res.status(403).send({
				error: 'INVALID_AUTHENTICATION'
			});
		}
	},
	 /**
	Obtine las piezas existentes
	@params: nombre, precio, cantidad
	@returns {Promise<void>} */
	piezaExistente: async (req,res,next) => {
		if(req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario){
			try {
				inv = await piezasServices.piezaExistente(req.sessionPayload.data.id_usuario);
				// console.log(inv);
				res.status(200).send({
					data:inv
				})
			} catch(err) {
				res.status(err.status ? err.status : 500).send({
					error: err.message
				});
			}
		} else {
			res.status(403).send({
				error:'INVALID_AUTHENTICATION'
			});
		}
	}
}