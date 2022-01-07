const Companies = require('../models/Companies');
const CompanyType = require('../models/CompanyType');

// crear una empresa
const createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      phone,
      email,
      website,
      logo,
      banner,
      status,
      type,
    } = req.body;
    const newCompany = await Companies.create({
      name,
      description,
      phone,
      email,
      website,
      logo,
      banner,
      status,
    });
    await newCompany.setType(type);
    return res.status(200).json(newCompany);
  } catch (error) {
    return res.status(500).json({ msg: 'Error al crear la empresa' });
  }
};

// obtner info de todas las compañias
const getCompanies = async (req, res) => {
  try {
    const listCompanies = await Companies.findAll({
      include: [{ model: CompanyType, as: 'type', attributes: ['type'] }],
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
      include: [{ model: CompanyType, as: 'type', attributes: ['type'] }],
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
