const fs = require('fs');
const jwt = require('jsonwebtoken');

const defaultJwtConfig = require('../config/jwt');
const mysqlConn = require('../models/pool')();

const privateKey = fs.readFileSync(process.cwd() + '/src/app/config/private.key', 'utf8');
const publicKey = fs.readFileSync(process.cwd() + '/src/app/config/public.key', 'utf8');

module.exports = {
  /**
   * Check if user exists on database and get his data
   * @param email
   * @returns {Promise<any>}
   */
  checkUserInDatabase: email => new Promise(
    (resolve, reject) => {
      mysqlConn.query(
        'SELECT * FROM Usuario WHERE correo=?',
        [email],
        (err, rows, fields) => {
          if (err) return reject(err);
          if (Array.isArray(rows) && rows.length > 0) {
            return resolve(rows[0]);
          } else {
            return reject({
              status: 404,
              message: 'USER_NOT_FOUND'
            });
          }
        }
      );
    }
  ),

  
  /**
   * Get user info by id
   * @param id
   * @param token
   * @returns {Promise<any>}
   */
  getUserById: (id, token = null) => new Promise(
    (resolve, reject) => {
      mysqlConn.query(
        `SELECT * FROM Usuario WHERE id_usuario=?${token ? ' AND access_token = ?' : ''}`,
        token ? [id, token] : [id],
        (err, rows, fields) => {
          if (err) return reject(err);
          if (Array.isArray(rows) && rows.length > 0) {
            return resolve(rows[0]);
          } else {
            return reject({
              status: 404,
              message: 'USER_NOT_FOUND'
            });
          }
        }
      );
    }
  ),

  /**
   * Append jwt token to user
   * @param email
   * @param token
   * @returns {Promise<any>}
   */
  appendTokenToUser: (email, token) => new Promise(
    (resolve, reject) => {
      mysqlConn.query(
        'UPDATE Usuario SET access_token = ? WHERE correo = ?',
        [token, email],
        (err, rows, fields) => {
          if (err) { return reject(err); }
          resolve();
        }
      );
    }
  ),

  /**
   * Generate JWT Token
   * @param isUser
   * @param id
   * @returns {*}
   */
  generateToken: (isUser, id) => jwt.sign(
    {
      type: isUser,
      id: id
    },
    privateKey,
    defaultJwtConfig
  ),

  /**
   * Verify if token is valid
   * @param token
   * @returns {*}
   */
  verifyToken: token => {
    try {
      return jwt.verify(
        token,
        publicKey,
        {
          ...defaultJwtConfig,
          algorithm:  ["RS256"],
        }
      );
    } catch (err) {
      return false;
    }
  },
  /**
   * Decode token and get its data
   * @param decode
   * @returns {*}
   */
  decodeToken: token => jwt.decode(token, {complete: true}),
};
