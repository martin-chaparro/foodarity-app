const { Router } = require('express');

const router = new Router();
const { createUser, getAllUsers, deleteUser, updateUser } = require('../../controllers/userController');
const ValidationsUser = require('../../middlewares/validations/validationUser');
const authMiddleware = require('../../middlewares/auth');

router.post('/', ValidationsUser.withPassword, createUser);
router.get('/', authMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id", authMiddleware,ValidationsUser.withoutPassword, updateUser);

module.exports = router;
