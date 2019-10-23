const authService = require('./auth');
const inventoryServices = require('./inventory');
const piezasServices = require('./pieza.js');
module.exports = {
    auth: authService,
    inventory:inventoryServices,
    pieza:piezasServices
};