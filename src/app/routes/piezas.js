const router = require('express').Router();
const piezasController = require('../controllers/piezas');
router.post('/nuevaPieza', piezasController.nuevaPieza);
router.get('/piezaExistente', piezasController.piezaExistente);
// // router.get('/piezaExistente',function(res,req){
// //         console.log("fffffffff");
// });
module.exports = router; 