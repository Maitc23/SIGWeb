const authService = require('./auth');
const inventoryServices = require('./inventory');
const piezasServices = require('./pieza.js');
const categoriaServices = require('./categoria.js');
const ventaServices = require('./venta.js');
module.exports = {
    auth: authService,
    inventory:inventoryServices,
    pieza:piezasServices,
    categoria:categoriaServices,
    venta:ventaServices
};