const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const connection = require('./database/connection');
const CompanyType = require('./models/CompanyType');
const Role = require('./models/Role');
const User = require('./models/User');
const State = require('./models/State');
const City = require('./models/City');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Company = require('./models/Company');
const Address = require('./models/Address');
const PaymentMethod = require('./models/PaymentMethod');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4001;

    this.environment = process.env.NODE_ENV;

    this.paths = {
      apiv1: '/api/v1',
    };

    // middlewares
    this.middlewares();

    // Rutas de Aplicacion
    this.routes();

    // Datos seeders
    this.roles = require('./database/seeders/data/roles');
    this.users = require('./database/seeders/data/users');
    this.provincias = require('./database/seeders/data/provincias.json');
    this.municipios = require('./database/seeders/data/municipios.json');
    this.products = require('./database/seeders/data-hardcode/products.json');
    this.categories = require('./database/seeders/data/categories.json');
    this.companies = require('./database/seeders/data-hardcode/companies.json');
    this.paymentMethods = require('./database/seeders/data/paymentMethods.json');
  }

  // express instance
  getExpressInstance() {
    return this.app;
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    this.app.use(morgan('dev'));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.apiv1, require('./routes/api'));
  }

  async connectDb() {
    try {
      console.log('||--> Establishing connection with database: <--||');
      switch (this.environment) {
        case 'production':
          console.log('||--> Production mode setting in: authenticate<--||');
          await connection.authenticate();
          break;
        case 'test':
          console.log('||--> Test mode setting in: force = false<--||');
          await connection.sync({ force: false });
          break;
        case 'development':
        default:
          console.log('||--> Development mode setting in: force = true<--||');
          await connection.sync({ force: true });
          break;
      }
      console.log('||--> Database connection established..: <--||');
    } catch (error) {
      console.log('Could not connect to the database...');
      console.log(error);
    }
  }

  async seed() {
    console.log('||--> Seed database...: <--||');
    try {
      console.log('||--> Seed users database...: <--||');
      await Role.bulkCreate(this.roles);
      const usersCreated = await User.bulkCreate(this.users);
      usersCreated.forEach((user) => {
        user.setRole(1);
      });
    } catch (error) {
      console.log('||--> Seed users not completed...: <--||');
    }
    try {
      console.log('||--> Seed location database...: <--||');
      this.provincias.provincias.forEach(async (prov) => {
        await State.create({
          id: prov.id,
          name: prov.nombre,
          lat: prov.centroide.lat,
          lon: prov.centroide.lon,
        });
      });
      this.municipios.municipios.forEach(async (muni) => {
        await City.create({
          id: muni.id,
          name: muni.nombre,
          lat: muni.centroide.lat,
          lon: muni.centroide.lon,
          state_id: muni.provincia.id,
        });
      });
    } catch (error) {
      console.log('||--> Seed locations not completed...: <--||');
    }
    try {
      console.log('||--> Seed companies database...: <--||');
      this.companies.forEach(async (company) => {
        const {
          name,
          description,
          areaCode,
          phone,
          email,
          website,
          type,
          status,
          logo,
          street,
          number,
          zipcode,
          cityId,
          stateId,
          ownerId,
        } = company;
        const newCompany = await Company.create({
          name,
          description,
          areaCode,
          phone,
          email,
          website,
          status,
          logo,
          ownerId,
        });
        const newAddress = await Address.create({
          street,
          number,
          zipcode,
        });
        const findType = await CompanyType.findByPk(type);
        await newCompany.setType(findType);
        await newCompany.setAddress(newAddress);
        await newAddress.setCity(cityId);
        await newAddress.setState(stateId);
        const owner = await User.findByPk(ownerId);
        await owner.setCompany(newCompany);
      });
    } catch (error) {
      console.log('||--> Seed companies not completed...: <--||');
    }
    try {
      console.log('||--> Seed types database...: <--||');
      await CompanyType.bulkCreate([{ type: 'Comercio' }, { type: 'ONG' }]);
    } catch (error) {
      console.log('||--> Seed types not completed...: <--||');
    }
    try {
      console.log('||--> Seed categories database...: <--||');
      await Category.bulkCreate(this.categories);
    } catch (error) {
      console.log('||--> Seed categories not completed...: <--||');
    }
    try {
      console.log('||--> Seed products(HARDCODE) database...: <--||');
      this.products.forEach(async (product) => {
        const {
          lote,
          description,
          photo,
          price,
          quantity,
          publicationDate,
          expirationDate,
          category,
        } = product;
        const newProduct = await Product.create({
          lote,
          description,
          photo,
          quantity,
          totalQuantity: quantity,
          price,
          publicationDate,
          expirationDate,
          status: 'published',
        });
        await newProduct.setCategory(category);
        await newProduct.setCompany(1);
        await newProduct.setPublisher(1);
      });
    } catch (error) {
      console.log('||--> Seed products(HARDCODE) not completed...: <--||');
    }
    try {
      console.log('||--> Seed payment methods database...: <--||');
      await PaymentMethod.bulkCreate(this.paymentMethods);
    } catch (error) {
      console.log('||--> Seed payment methods not completed...: <--||');
    }
  }

  start() {
    this.app.listen(this.port, async () => {
      console.log(`||--> Http server running in port:${this.port} <--||`);
      await this.connectDb();
      await this.seed();
    });
  }
}

module.exports = Server;
