
const { auth: { checkUserInDatabase, generateToken, appendTokenToUser} } = require('../services');

module.exports = {
  /**
   * Login with email and password
   * @param req
   * @param res
   * @param next
   */
  loginByEmail: async (req, res, next) => {
    try {
      const userData = await checkUserInDatabase(req.body.correo);

      //TODO: Should add SHA1 encryption to password field
      if (req.body.contrasena === userData.contrasena) {
        const token = generateToken(true, userData.id_usuario);
        await appendTokenToUser(userData.correo, token);
        res.status(200).send({
          usuario: userData,
          token,
        });
      } else {
        res.status(400).send({
          error: 'INCORRECT_CREDENTIALS',
        });
      }
    } catch (err) {
      res.status(err.status ? err.status : 500).send({
        error: err.message
      });
    }
  },
};

