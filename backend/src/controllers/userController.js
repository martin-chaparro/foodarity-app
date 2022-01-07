const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/User');
const Role = require('../models/Role');

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({
    where: { [Op.or]: [{ email }] },
  });

  if (user) {
    if (user.email === email)
      return response
        .status(400)
        .json({ message: 'Este email ya esta en uso' });
  }

  user = await User.create({
    name,
    email,
    password,
  });

  await user.setRole(1);

  // Generar JWT
  const token = await generateJWT(user.id, user.name);

  return response.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
};

const getAllUsers = async (request, response) => {
  const users = await User.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'RoleId'] },
    include: {
      model: Role,
      attributes: ['id', 'role'],
    },
  });

  return response.status(200).json(users);
};

module.exports = {
  createUser,
  getAllUsers,
};
