const router = require('express').Router();
const piezasController = require('../controllers/piezas');
router.post('/nuevaPieza', piezasController.nuevaPieza);
router.get('/piezaExistente', piezasController.piezaExistente);
module.exports = router; 