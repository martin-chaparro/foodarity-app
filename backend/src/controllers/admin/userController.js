const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const { generateJWT } = require('../../helpers/generateJWT');
const User = require('../../models/User');
const Role = require('../../models/Role');
const Company = require('../../models/Company');
const City = require('../../models/City');
const State = require('../../models/State');
const Address = require('../../models/Address');

cloudinary.config(process.env.CLOUDINARY_URL);

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({
    where: { [Op.and]: [{ email }, { deleted: false }] },
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
    photo: user.photo,
    socialPhoto: user.socialPhoto,
    token,
  });
};

const getAllUsers = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size } = request.query;

  const { limit, offset } = getPagination(page, size);

  const users = await User.findAndCountAll({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'RoleId', 'role_id'],
    },
    include: {
      model: Role,
      as: 'role',
      attributes: ['id', 'role'],
    },
    offset,
    limit,
  });

  return response.status(200).json({
    users: users.rows,
    totalUsers: users.count,
    size: limit,
    page: offset,
    totalPages: Math.ceil(users.count / limit),
  });
};

const getUser = async (request, response) => {
  const { id } = request.params;

  const user = await User.findByPk(id, {
    attributes: {
      exclude: [
        'password',
        'createdAt',
        'updatedAt',
        'RoleId',
        'role_id',
        'CompanyId',
        'companyId',
      ],
    },
    where: { deleted: false },
    include: [
      { model: Role, as: 'role', attributes: ['id', 'role'] },
      {
        model: Company,
        as: 'company',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: {
          model: Address,
          as: 'address',
          attributes: {
            exclude: [
              'CompanyId',
              'createdAt',
              'updatedAt',
              'addressId',
              'CityId',
              'StateId',
            ],
          },
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'state_id', 'lat', 'lon'],
              },
            },
            {
              model: State,
              as: 'state',
              attributes: { exclude: ['createdAt', 'updatedAt', 'lat', 'lon'] },
            },
          ],
        },
      },
    ],
  });

  if (!user) {
    return response.status(400).json({ message: 'Usuario no encontrador' });
  }

  return response.status(200).json(user);
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
        deleted: true,
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

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

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

const uploadPhotoUser = async (request, response) => {
  const user = await User.findByPk(request.userId);

  if (user.photo) {
    cloudinary.uploader.destroy(user.photo.public_id);
  }

  const { tempFilePath } = request.files.file;

  const { secure_url: secureUrl, public_id: publicId } =
    await cloudinary.uploader.upload(tempFilePath);

  await user.update({ photo: { public_id: publicId, url: secureUrl } });

  return response.status(200).json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
};
