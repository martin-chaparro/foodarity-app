const { Router } = require('express');

const router = new Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
} = require('../../controllers/admin/userController');

const {
  getCompanies,
  getCompanyById,
  deleteCompany,
  updateCompany,
  uploadImageCompany,
} = require('../../controllers/admin/companiesController');

const {
  getProducts,
  getProductById,
  getCategories,
} = require('../../controllers/admin/productsController');

const ValidationsUser = require('../../middlewares/validations/validationUser');
// const ValidationCompany = require('../../middlewares/validations/validationCompany');
const ValidationAuth = require('../../middlewares/validations/validationAuth');
const authMiddleware = require('../../middlewares/auth');
const validationFiles = require('../../middlewares/validations/validationFiles');

// Users Routes

router.get('/users', authMiddleware, ValidationAuth.isAdmin, getAllUsers);
router.get('/users/:id', authMiddleware, ValidationAuth.isAdmin, getUser);
router.delete('/users/:id', authMiddleware, ValidationAuth.isAdmin, deleteUser);
router.put(
  '/users/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  ValidationsUser.withoutPassword,
  updateUser
);
router.patch(
  '/users/upload/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  validationFiles.fileExists,
  uploadPhotoUser
);

// Companies Routes

router.get('/companies', authMiddleware, ValidationAuth.isAdmin, getCompanies);
router.get(
  '/companies/id/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  getCompanyById
);
router.delete(
  '/companies/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  deleteCompany
);
router.put(
  '/companies/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  updateCompany
);
router.patch(
  '/companies/:id/upload/:field',
  authMiddleware,
  ValidationAuth.isAdmin,
  validationFiles.fileExists,
  uploadImageCompany
);

// Products Routes
router.get('/products', authMiddleware, ValidationAuth.isAdmin, getProducts);
router.get(
  '/products/id/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  getProductById
);
router.get(
  '/products/categories',
  authMiddleware,
  ValidationAuth.isAdmin,
  getCategories
);

module.exports = router;
