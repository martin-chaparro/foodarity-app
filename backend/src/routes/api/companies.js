const { Router } = require('express');

const router = new Router();

const ValidationCompany = require('../../middlewares/validations/validationCompany');
const {
  getCompanies,
  createCompany,
  searchCompany,
} = require('../../controllers/companiesController');

router.get('/', getCompanies);
router.get('/:id', searchCompany);
router.post('/', ValidationCompany.create, createCompany);

module.exports = router;
