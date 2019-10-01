const router = require('express').Router();

const inventoryController = require('../controller/inventory');


router.post('/agregarinventario',inventoryController.nuevoInsumo);
module.exports = router;