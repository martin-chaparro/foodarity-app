const { Router } = require('express');

const router = new Router();

const ValidationCompany = require('../../middlewares/validations/validationCompany');
const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');

const {
  getCompanies,
  createCompany,
  searchCompany,
  uploadImageCompany,
  deleteCompany,
  updateCompany,
  searchCompanyByUser,
} = require('../../controllers/companiesController');

router.get('/', getCompanies);
router.get('/id/:id', searchCompany);
router.get('/byUser', authMiddleware, searchCompanyByUser);
router.post('/', authMiddleware, ValidationCompany.create, createCompany);
router.patch(
  '/:id/upload/:field',
  authMiddleware,
  validationFiles.fileExists,
  uploadImageCompany
);
router.delete('/:id', deleteCompany);
router.put('/:id', updateCompany);

module.exports = router;
