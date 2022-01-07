const { Router } = require('express');

const router = new Router();

const {
  getCompanies,
  createCompany,
  searchCompany,
} = require('../../controllers/companiesController');

router.get('/', getCompanies);
router.get('/:id', searchCompany);
router.post('/', createCompany);

module.exports = router;
