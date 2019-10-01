const { auth: { verifyToken, decodeToken, getUserById } } = require('../services');

/**
 * Check if token exists and is valid
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.match(/bearer (.+)+/i);
  if (authHeader && token) {
    const tokenString = token[1];
    if (verifyToken(tokenString)) {
      const tokenData = decodeToken(tokenString);
      const type = tokenData && tokenData.payload && tokenData.payload.type;
        getUserById(tokenData.payload.id, tokenString)
          .then(userData => {
            req.sessionPayload = {
              data: userData,
              type,
            };
            next();
          })
          .catch(err => res.status(403).send({
            error: 'PROHIBITED'
          }));
    } else {
      res.status(401).send({
        error: 'UNAUTHORIZED'
      });
    }
  } else {
    res.status(400).send({
      error: 'TOKEN_NOT_FOUND',
    });
  }
};
