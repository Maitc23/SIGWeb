const router = require('express').Router();
const piezasController = require('../controllers/piezas');
const ventaController = require('../controllers/venta');
router.get('/piezaExistente', piezasController.piezaExistente);
router.post('/venta', ventaController.realizarVenta);
module.exports = router; 