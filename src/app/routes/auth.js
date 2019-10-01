const router = require('express').Router();
const { auth: { loginByEmail} } = require('../controllers');

router.post(
    '/login',
    (req, res, next) => {
      if (req.body.correo && req.body.contrasena) {
        loginByEmail(req, res, next);
      } else {
        res.status(400).send();
      }
    }
  );

module.exports = router;