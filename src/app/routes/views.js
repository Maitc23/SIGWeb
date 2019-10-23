/**
 * Router for views
 * @type {Router}
 */
const router = require('express').Router();

router.get('/', function (req, res) {
    res.render('index', {
        message: req.flash('loginMessage')
    });
});


router.get('/login.ejs', function(req, res) {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});


/**
 * --- Private views ---
 */

router.get('/perfil.ejs', function(req, res) {
    res.render('perfil', {
        message: req.flash('ConnectionMessage')
    });
});

router.get('/inventory.ejs', function (req, res) {
  res.render('inventory', {
    message: req.flash('ConnectionMessage')
  });
});
 
router.get('/landing.ejs', function(req, res) {
  res.render('landing', {
      /* message: req.flash('loginMessage')*/
  });
});
/** Gabriela Agrego esto porque lo necesita */
router.get('/insumoexist.ejs', function(req, res) {
    res.render('insumoexist', {
        /* message: req.flash('loginMessage')*/
    });
});

router.get('/nuevapieza.ejs', function(req, res) {
    res.render('nuevapieza', {
        /* message: req.flash('loginMessage')*/
    });
});
router.get('/piezaexist.ejs', function(req, res) {
    res.render('piezaexist', {
        /* message: req.flash('loginMessage')*/
    });
});

router.get('/insumos.ejs', function(req, res) {
    res.render('insumos', {
        /* message: req.flash('loginMessage')*/
    });
});

router.get('/pieza.ejs', function(req, res) {
    res.render('pieza', {
        /* message: req.flash('loginMessage')*/
    });
});
router.get('/venta.ejs', function(req, res) {
    res.render('venta', {
        /* message: req.flash('loginMessage')*/
    });
});
router.get('/reporte.ejs', function(req, res) {
    res.render('reporte', {
        /* message: req.flash('loginMessage')*/
    });
});
