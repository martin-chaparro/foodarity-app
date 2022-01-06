const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

const User = require('../models/User');
const Role = require('../models/Role');

// Models Init
User.init(connection);
Role.init(connection);

// Associate
Role.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
