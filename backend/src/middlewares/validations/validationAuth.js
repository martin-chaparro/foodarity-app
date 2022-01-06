const { check } = require('express-validator');

const ValidationAuth = {
  login: [
    check('email', 'Ingrese su usuario').isEmail(),
    check('password', 'Ingrese sus password').not().isEmpty(),
  ],
};

module.exports = ValidationAuth;
