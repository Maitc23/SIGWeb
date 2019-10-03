const router = require('express').Router();

const inventoryController = require('../controllers/inventory');


router.post('/agregarinventario', inventoryController.nuevoInsumo);

module.exports = router;