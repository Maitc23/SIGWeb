const router = require('express').Router();
const categoriaController = require('../controllers/categoria');
router.post('/nuevaCategoria', categoriaController.nuevaCategoria);
router.post('/actualizarInsumo', categoriaController.actualizarInsumo);
router.get('/categoriaExistente', categoriaController.categoriaExistente);
module.exports = router;
