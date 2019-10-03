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


router.get('/login.ejs', function (req, res) {
    res.render('login',
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

router.get('/inventory.ejs', function (req, res) {
  res.render('inventory', {
    message: req.flash('ConnectionMessage')
  });
});
module.exports = router;