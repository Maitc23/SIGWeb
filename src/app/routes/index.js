const router = require('express').Router(); 
const authRoutes = require('./auth');
const viewsRouter = require('./views');
const inventoryRoutes = require('./inventory');

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use(require('../middlewares/sessionVerification'));
router.use('/',inventoryRoutes);

module.exports = router; 