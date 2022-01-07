const { check } = require('express-validator');

const ValidationCompany = {
  create: [
    check('name', 'Ingrese el nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('description', '').not().isEmpty(),
    check('areaCode', '').isNumeric(),
    check('phone', '').isNumeric(),
    // check('logo', ''), // TODO definir como guardar imagenes
    check('street', '').not().isEmpty(),
    check('number', '').isNumeric(),
    check('zipcode', '').isNumeric(),
    check('cityId', '').isNumeric(),
    check('stateId', '').isNumeric(),
  ],
};

module.exports = ValidationCompany;
