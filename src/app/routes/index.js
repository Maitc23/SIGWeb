const router = require('express').Router(); 
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const inventoryRoutes = require('./inventory');
const piezasRoutes = require ('./piezas');
const categorioRoutes = require('./categoria');

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use(require('../middlewares/sessionVerification'));
router.use('/',inventoryRoutes);
router.use('/',piezasRoutes);
router.use('/',categorioRoutes);

module.exports = router; 