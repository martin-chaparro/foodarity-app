const { check } = require('express-validator');

const ValidationCompany = {
  create: [
    check('name', 'Ingrese el nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('description', '').not().isEmpty(),
    check('phone', '').isMobilePhone(),
    // check('logo', ''), // TODO definir como guardar imagenes
  ],
};

module.exports = ValidationCompany;
