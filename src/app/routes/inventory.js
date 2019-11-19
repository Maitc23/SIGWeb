const router = require('express').Router();
const inventoryController = require('../controllers/inventory');

    router.post('/agregarinventario', inventoryController.nuevoInsumo);
    router.get('/inventarioPieza', inventoryController.inventarioPieza);
    router.get('/inventarioInsumo',inventoryController.inventarioInsumo);

module.exports = router;