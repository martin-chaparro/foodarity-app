const { Router } = require('express');

const router = new Router();

const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
} = require('../../controllers/admin/userController');

const ValidationsUser = require('../../middlewares/validations/validationUser');
const validationFiles = require('../../middlewares/validations/validationFiles');
const ValidationAuth = require('../../middlewares/validations/validationAuth');
const authMiddleware = require('../../middlewares/auth');

// Users Routes

router.post(
  '/',
  authMiddleware,
  ValidationAuth.isAdmin,
  ValidationsUser.withPassword,
  createUser
);
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
router.patch(
  '/users/upload',
  authMiddleware,
  ValidationAuth.isAdmin,
  validationFiles.fileExists,
  uploadPhotoUser
);

module.exports = router;
