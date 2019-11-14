const router = require('express').Router(); 
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const inventoryRoutes = require('./inventory');
const piezasRoutes = require ('./piezas');

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use(require('../middlewares/sessionVerification'));
router.use('/',inventoryRoutes);
router.use('/',piezasRoutes);

module.exports = router; 