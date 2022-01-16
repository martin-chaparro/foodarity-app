const { Op } = require('sequelize');
const Company = require('../../models/Company');
const CompanyType = require('../../models/CompanyType');
const Address = require('../../models/Address');
const City = require('../../models/City');
const State = require('../../models/State');

// obtner info de todas las compañias
const getCompanies = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  if (!search) {
    
    try {
      const companies = await Company.findAndCountAll({
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
        offset,
        limit,
        order: [['id', 'ASC']],
      });
      
      console.log(companies.rows)

      if (companies.rows.length > 0) {
        return response.status(200).json({
          companies: companies.rows,
          totalCompanies: companies.count,
          size: limit,
          page: offset,
          totalPages: Math.ceil(companies.count / limit),
        });
      }
      return response.status(404).json({ msg: 'No se encontraron compañias' });
    } catch (error) {
      return response.status(500);
    }
  }

  try {
    const companies = await Company.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      },
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
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    if (companies.rows.length > 0) {
      return response.status(200).json({
        companies: companies.rows,
        totalCompanies: companies.count,
        size: limit,
        page: offset,
        totalPages: Math.ceil(companies.count / limit),
      });
    }
    return response.status(404).json({ msg: 'No se encontraron compañias' });
  } catch (error) {
    return response.status(500);
  }





};

// buscar empresa/ong por id
const searchCompany = async (request, response) => {
  try {
    const { id } = request.params;
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
      response.status(200).json(company);
    } else {
      response.status(404).json({ msg: 'Not found' });
    }
  } catch (error) {
    response.status(500).send({ msg: error });
  }
};

module.exports = {
  getCompanies,
  searchCompany,
};
