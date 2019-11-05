/**
 * Router for views
 * @type {Router}
 */
const router = require('express').Router();

<<<<<<< HEAD
router.get('/', function (req, res) {
=======

/**
 * --- Public Views ---
 *      solo usado para pruebas para evitrar el continuo acceso 
 *      BORRALO SUBRNOMAL
 */

router.get('/index.ejs', function(req, res) {
>>>>>>> origin/Gabss_dev
    res.render('index', {
        message: req.flash('loginMessage')
    });
});


router.get('/login.ejs', function(req, res) {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});


<<<<<<< HEAD
=======
router.get('/header.ejs', function(req, res) {
    res.render('header', {
        message: req.flash('loginMessage')
    });
});


router.get('/header.ejs', function(req, res) {
    res.render('header', {
        message: req.flash('loginMessage')
    });
});

/**
 * --Temporaly public view
 */
router.get('/inventory.ejs', function(req, res) {
    res.render('inventory', {
        //message: req.flash('loginMessage')
    });
});


>>>>>>> origin/Gabss_dev
/**
 * --- Private views ---
 */

router.get('/perfil.ejs', function(req, res) {
    res.render('perfil', {
        message: req.flash('ConnectionMessage')
    });
});

<<<<<<< HEAD
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

router.get('/construccion.ejs', function(req, res) {
  res.render('construccion', {
      /* message: req.flash('loginMessage')*/
  });
});
router.get('/insumos.ejs', function(req, res) {
  res.render('insumos', {
      /* message: req.flash('loginMessage')*/
  });
});
module.exports = router;
=======
router.get('/logout', function(req, res) {
    req.logout();
    req.redirect();
});
module.exports = router;

/** Gabriela Agrego esto porque lo necesita */
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
>>>>>>> origin/Gabss_dev
