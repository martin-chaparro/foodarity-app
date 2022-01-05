require('dotenv').config();

let logger;

switch (process.env.NODE_ENV) {
  case 'production':
    logger = false;
    break;
  case 'test':
    logger = console.log;
    break;
  case 'development':
  default:
    logger = console.log;
    break;
}
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  logging: logger,
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    timestamp: true,
    underscored: true,
  },
};
