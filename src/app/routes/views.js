/**
 * Router for views
 * @type {Router}
 */
const router = require('express').Router();


/**
 * --- Public Views ---
 */

router.get('/', function (req, res) {
    res.render('index', {
      message: req.flash('loginMessage')
    });
});


router.get('/login.ejs', function (req, res) {
    res.render('login',
      {
        message: req.flash('loginMessage')
      });
});


router.get('/header.ejs', function (req, res) {
  res.render('header',
    {
      message: req.flash('loginMessage')
    });
});



/**
 * --- Private views ---
 */

router.get('/perfil.ejs', function (req, res) {
    res.render('perfil', {
      message: req.flash('ConnectionMessage')
    }); 
});

router.get('/logout', function (req, res) {
    req.logout();
    req.redirect();
  });
module.exports = router;