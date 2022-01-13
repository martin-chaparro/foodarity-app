const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
// eslint-disable-next-line import/no-unresolved
const cloudinary = require('cloudinary').v2;
const Company = require('../models/Company');
const CompanyType = require('../models/CompanyType');
const Address = require('../models/Address');
const City = require('../models/City');
const State = require('../models/State');
const User = require('../models/User');
const Product = require('../models/Product');

cloudinary.config(process.env.CLOUDINARY_URL);

// crear una empresa
const createCompany = async (req, res) => {
  try {
    const ownerId = req.userId; 

    const {
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      status,
      deleted,
      type,
      street,
      number,
      zipcode,
      cityId,
      stateId,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newCompany = await Company.create({
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      status,
      deleted,
      ownerId,
    });

    const newAddress = await Address.create({
      street,
      number,
      zipcode,
    });
    //primero me formo el objeto de address con state y city  y despues le paso el objeto a la compañia creada
    await newAddress.setState(stateId);
    await newAddress.setCity(cityId);
    await newCompany.setType(type);
    await newCompany.setAddress(newAddress);
    const owner = await User.findByPk(ownerId);
    await owner.setCompany(newCompany.id);
    
    return res.status(200).json(newCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error al crear la empresa. Revise que los tipos de datos ingresados sean correctos',
    });
  }
};

// obtner info de todas las compañias
const getCompanies = async (req, res) => {
  try {
    const listCompanies = await Company.findAll({
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        {
          model: Address,
          as: 'address',
          include: [
            { model: City, as: 'city', attributes: ['name'] },
            { model: State, as: 'state', attributes: ['name'] },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (listCompanies.length > 0) {
      return res.status(200).json(listCompanies);
    }
    return res.status(404).json({ msg: 'No se encontraron compañias' });
  } catch (error) {
    return res.status(500);
  }
};

// buscar empresa/ong por id
const searchCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, {
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        {
          model: Address,
          as: 'address',
          include: [
            { model: City, as: 'city' },
            { model: State, as: 'state' },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CompanyTypeId'],
      },
    });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ msg: 'Not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

// buscar empresa/ong por usuario logeado
const searchCompanyByUser = async (req, res) => {
  try {
    const { userId } = req;
    // console.log('CONSOLE LOG: userId', userId);
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!user.CompanyId || user.CompanyId === null) {
      return res.json({ msg: 'El usuario no posee una compañia' });
    }
    return res.status(200).json(user.Company);
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};

// actualizar imagen compañia

const uploadImageCompany = async (request, response) => {
  const { id, field } = request.params;

  const { userId: ownerId } = request;

  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return response.status(400).json({
        message: 'Company not found',
      });
    }

    if (ownerId !== company.ownerId) {
      return response.status(401).json({ message: 'Not owner' });
    }

    const { tempFilePath } = request.files.file;

    switch (field) {
      case 'logo': {
        if (company.logo) {
          cloudinary.uploader.destroy(company.logo.public_id);
        }

        const { secure_url: secureUrl, public_id: publicId } =
          await cloudinary.uploader.upload(tempFilePath);

        await company.update({ logo: { public_id: publicId, url: secureUrl } });

        return response.status(200).json(company);
      }

      case 'banner': {
        if (company.banner) {
          cloudinary.uploader.destroy(company.banner.public_id);
        }
        const { secure_url: secureUrl, public_id: publicId } =
          await cloudinary.uploader.upload(tempFilePath);

        await company.update({
          banner: { public_id: publicId, url: secureUrl },
        });
        return response.status(200).json(company);
      }

      default:
        return response.status(400).json({
          message: 'El parametro field debe tener el valor  "logo" o "banner"',
        });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Fatal Error',
    });
  }
};

// eliminar/deshabilitar empresa/ong
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.userId;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({
        message: 'Company not found',
      });
    }

    if (ownerId !== company.ownerId) {
      return res.status(401).json({ message: 'Not owner' });
    }
    if (company.deleted === false) {
      await company.update({ deleted: true });
    }

    await Product.update(
      { status: 'canceled' },
      { where: { [Op.and]: [{ CompanyId: id }, { status: 'published' }] } }
    );

    return res
      .status(200)
      .json({ msg: 'Compañia deshabilitada y sus productos' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error al deshabilitar compañia' });
  }
};

// update info company //VER RUTAAAA
const updateCompany = async (req, res) => {
  const {
    name,
    description,
    areaCode,
    phone,
    email,
    website,
    type,
    street,
    number,
    zipcode,
  } = req.body;
  const { id } = req.params;
  const ownerId = req.userId;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({
        message: 'Company not found',
      });
    }
    if (ownerId !== company.ownerId) {
      return res.status(401).json({ message: 'Not owner' });
    }

    await company.update(
      {
        name,
        description,
        areaCode,
        phone,
        email,
        website
      },
    );
    
    const address = await Address.findByPk(company.id)
   if(address){
    await address.update(
      {
        street,
        number,
        zipcode,
      },
    );
   }
    return res.status(200).json({ msg: 'Actualizado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error al actualizar la empresa' });
  }
};

module.exports = {
  getCompanies,
  createCompany,
  searchCompany,
  uploadImageCompany,
  searchCompanyByUser,
  deleteCompany,
  updateCompany,
};
