const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

const CompanyType = require('../models/CompanyType');
const Companies = require('../models/Companies');

// Models Init

CompanyType.init(connection);
Companies.init(connection);

// Associate
Companies.associate(connection.models)
CompanyType.associate(connection.models)

module.exports = connection;
