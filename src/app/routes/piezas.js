const router = require('express').Router();
const piezasController = require('../controllers/piezas');

router.post('/nuevaPieza', piezasController.nuevaPieza);

module.exports = router;