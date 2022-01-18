const axios = require('axios');

const qs = require('qs');
const User = require('../models/User');
const Company = require('../models/Company');

const APP_ID = process.env.MP_CLIENT_ID;
const SECRET_ID = process.env.MP_CLIENT_SECRET_ID;
const REDIRECT_PAGE = process.env.MP_REDIRECT;

/*  
 TODO VENDEDOR
 {
    "id": 1058268328,
    "nickname": "TETE2528727",
    "password": "qatest45",
    "site_status": "active",
    "email": "test_user_88765220@testuser.com"
}
  */
/*  

TODO COMPRADOR

{
    "id": 1058272890,
    "nickname": "TETE8690572",
    "password": "qatest6058",
    "site_status": "active",
    "email": "test_user_17094870@testuser.com"
} */

const getUrlRegister = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!user.companyId) {
      return res
        .status(401)
        .json({ message: 'El usuaria no posee un comercio' });
    }
    if (user.company.company_type_id !== 1) {
      return res.status(401).json({
        message: 'Solo las companias tipo comercio pueden publicar productos',
      });
    }
    if (user.company.status !== 'Habilitada') {
      return res.status(401).json({
        message: 'Solo los comercios habilitados pueden publicar productos',
      });
    }
    return res
      .status(200)
      .send(
        `https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&state=${user.companyId}&redirect_uri=${REDIRECT_PAGE}`
      );
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const validateCode = async (req, res) => {
  const { code, state } = req.query;
  try {
    const data = qs.stringify({
      client_id: APP_ID,
      client_secret: SECRET_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_PAGE,
    });
    const config = {
      method: 'post',
      url: 'https://api.mercadopago.com/oauth/token',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    axios(config)
      .then((response) => {
        // ACA ESTA EL TOKEN
        console.log(JSON.stringify(response.data));
        Company.update(
          { mp: JSON.stringify(response.data) },
          { where: { id: state } }
        );
        return res.status(200).send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send({ message: error });
      });
    return res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  validateCode,
  getUrlRegister,
};

/* 
const preference = {}

  const item = {
    title: 'Blue shirt',
    quantity: 10,
    currency_id: 'ARS',
    unit_price: 150
  }

  const payer = {
    email: "john@yourdomain.com"
  }

  preference.items = [item]
  preference.payer = payer
  preference.marketplace_fee = 2.56
  preference.notification_url = "http://urlmarketplace.com/notification_ipn";

  mercadopago.preferences.create(preference).then((data) => {
     // Do Stuff...
   }).catch((error) => {
     // Do Stuff...
   }); */
