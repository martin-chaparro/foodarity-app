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
  const token = await generateJWT({
    id: user.id,
    name: user.name,
    roleId: user.role_id,
  });

  return response.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
};

const getAllUsers = async (request, response) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'RoleId', 'role_id'],
    },
    where: { status: true },
    include: {
      model: Role,
      as: 'role',
      attributes: ['id', 'role'],
    },
  });

  return response.status(200).json(users);
};

const deleteUser = async (request, response) => {
  let id = null;

  if (request.userRoleId === 2) {
    id = request.params.id;
    if (!id)
      return response.status(400).json({ message: 'El id es requerido' });
  } else {
    id = request.userId;
  }

  try {
    await User.update(
      {
        status: false,
      },
      {
        where: { id },
      }
    );

    return response.status(200).json({ message: 'Eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Error al eliminar' });
  }
};

const updateUser = async (request, response) => {
  
  let id = null;

  if (request.userRoleId === 2) {
    id = request.params.id;
    if (!id)
      return response.status(400).json({ message: 'El id es requerido' });
  } else {
    id = request.userId;
  }

  const { name, email } = request.body;

  try {
    await User.update(
      {
        name,
        email,
      },
      {
        where: { id },
      }
    );

    return response.status(200).json({ message: 'Actualizado correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Error al actualizar' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
