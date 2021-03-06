const piezasServices = require('../services/pieza');

const controller = {};

module.exports= {
	...controller,
	/**
	insertar el nueva pieza
	@params: nombre, precio, cantidad
	@returns {Promise<void>} */


	nuevaPieza: async(req,res,next) => {
		if (req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario) {
			try {
				inv = await piezasServices.nuevaPieza(req.body.categoria, req.body.nombre, req.body.costo, req.body.cantidad, req.sessionPayload.data.id_usuario, req.body.imagen);
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
	 /**
	Obtine las piezas existentes
	@params: nombre, precio, cantidad
	@returns {Promise<void>} */
	piezaExistente: async (req,res,next) => {
		if(req && req.sessionPayload && req.sessionPayload.data && req.sessionPayload.data.id_usuario){
			try {
				inv = await piezasServices.piezaExistente(req.sessionPayload.data.id_usuario);
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
	},
	
}