const router = require('express').Router(); 
const authRoutes = require('./auth');
const viewsRouter = require('./views');

router.use('/auth', authRoutes);
router.use('/', viewsRouter);
router.use(require('../middlewares/sessionVerification'));


module.exports = router; 