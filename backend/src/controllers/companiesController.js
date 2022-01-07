// const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const Companies = require('../models/Companies');
const CompanyType = require('../models/CompanyType');
const Address = require('../models/Address');
const City = require('../models/City');
const State = require('../models/State');

// crear una empresa
const createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      logo,
      banner,
      status,
      ownerId,
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

    const newCompany = await Companies.create({
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      logo,
      banner,
      status,
      ownerId,
    });

    const newAddress = await Address.create({
      street,
      number,
      zipcode,
    });

    await newCompany.setType(type);
    await newAddress.setCompany(newCompany);
    await newAddress.setCity(cityId);
    await newAddress.setState(stateId);
    return res.status(200).json(newCompany);
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al crear la empresa. Revise que los tipos de datos ingresados sean correctos',
    });
  }
};

// obtner info de todas las compañias
const getCompanies = async (req, res) => {
  try {
    const listCompanies = await Companies.findAll({
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        { model: Address, include: [{ model: City }, { model: State }] },
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

// buscar empresa por id
const searchCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const listCompanies = await Companies.findAll({
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        { model: Address, include: [{ model: City }, { model: State }] },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (listCompanies.length > 0) {
      const companyId = await listCompanies.filter(
        (company) => company.id === id
      );
      // eslint-disable-next-line no-unused-expressions
      companyId.length
        ? res.status(200).json(companyId)
        : res.status(404).send(' Company Id not existing');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getCompanies, createCompany, searchCompany };
