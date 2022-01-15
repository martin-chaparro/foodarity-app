const { Router } = require('express');

const router = new Router();

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../../controllers/admin/userController');

const {
  getCompanies,
  searchCompany,
} = require('../../controllers/admin/companiesController');

const ValidationsUser = require('../../middlewares/validations/validationUser');
// const ValidationCompany = require('../../middlewares/validations/validationCompany');
const ValidationAuth = require('../../middlewares/validations/validationAuth');
const authMiddleware = require('../../middlewares/auth');

// Users Routes

router.get('/users', authMiddleware, ValidationAuth.isAdmin, getAllUsers);
router.get('/users/:id', authMiddleware, ValidationAuth.isAdmin, getUser);
router.delete('users/:id', authMiddleware, ValidationAuth.isAdmin, deleteUser);
router.put(
  '/users/:id',
  authMiddleware,
  ValidationAuth.isAdmin,
  ValidationsUser.withoutPassword,
  updateUser
);

// Companies Routes

router.get('/companies', getCompanies);
router.get('/companies/id/:id', searchCompany);





module.exports = router;
