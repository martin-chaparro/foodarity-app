const { check } = require('express-validator');

const ValidationsUser = {
  withPassword: [
    check('name', 'Ingrese su nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 4 caracteres').isLength({
      min: 4,
    }),
  ],
  withoutPassword: [
    check('name', 'Ingrese su nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
  ],
};

module.exports = ValidationsUser;
