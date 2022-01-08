const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const { comparePassword } = require('../helpers/passwordHash');
const { generateJWT } = require('../helpers/generateJWT');

const userLogin = async (request, response) => {
  const { email, password } = request.body;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ 
      where: {[Op.and]: [{ email }, { status: true }] } 
    });

    if (!user) {
      return response.status(400).json({
        message: 'Verifique sus credenciales',
      });
    }

    // Confirmar los passwords
    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return response.status(400).json({
        message: 'Verifique sus credenciales',
      });
    }
    // Generar JWT
    const token = await generateJWT({id:user.id, name:user.name,roleId:user.role_id});

    return response.json({
      id: user.id,
      name: user.name,
      roleId:user.role_id,
      token,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Por favor hable con el administrador',
    });
  }
};

const renewToken = async (request, response) => {
  const { userId, userName, userRoleId } = request;
  // Generar JWT
  const token = await generateJWT({id:userId, name:userName,roleId:userRoleId});

  return response.json({
    id: userId,
    name: userName,
    token,
  });
};

module.exports = { userLogin, renewToken };
