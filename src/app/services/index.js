const authService = require('./auth');
const inventoryServices = require('./inventory');
module.exports = {
    auth: authService,
    inventory:inventoryServices
};