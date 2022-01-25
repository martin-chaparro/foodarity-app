const { Router } = require('express');

const router = new Router();

const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
  updateUserPassword
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

const { getAllCategories, getCategory, updateCategory, deleteCategory, createCategory } = require('../../controllers/admin/categoriesController');

const ValidationsUser = require('../../middlewares/validations/validationUser');
// const ValidationCompany = require('../../middlewares/validations/validationCompany');
const ValidationAuth = require('../../middlewares/validations/validationAuth');
const authMiddleware = require('../../middlewares/auth');
const validationFiles = require('../../middlewares/validations/validationFiles');

// Users Routes

router.get('/users', authMiddleware, ValidationAuth.isAdmin, getAllUsers);
router.post('/users', authMiddleware, ValidationAuth.isAdmin, createUser);
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
router.patch(
  '/users/password/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  updateUserPassword
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


// Categories Routes
router.get('/categories', authMiddleware, ValidationAuth.isAdmin, getAllCategories);
router.post('/categories', authMiddleware, ValidationAuth.isAdmin, createCategory);
router.get('/category/:id', authMiddleware, ValidationAuth.isAdmin, getCategory);
router.put('/category/:id', authMiddleware, ValidationAuth.isAdmin, updateCategory);
router.delete('/category/:id', authMiddleware, ValidationAuth.isAdmin, deleteCategory);


module.exports = router;
