/**
 * Router for views
 * @type {Router}
 */
const router = require('express').Router();


/**
 * --- Public Views ---
 *      solo usado para pruebas para evitrar el continuo acceso 
 *      BORRALO SUBRNOMAL
 */

router.get('/index.ejs', function(req, res) {
    res.render('index', {
        message: req.flash('loginMessage')
    });
});


router.get('/login.ejs', function(req, res) {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});


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


/**
 * --- Private views ---
 */

router.get('/perfil.ejs', function(req, res) {
    res.render('perfil', {
        message: req.flash('ConnectionMessage')
    });
});

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
router.get('/construccion.ejs', function(req, res) {
    res.render('construccion', {
        /* message: req.flash('loginMessage')*/
    });
});