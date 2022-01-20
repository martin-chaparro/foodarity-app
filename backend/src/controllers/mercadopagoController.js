const axios = require('axios');

const User = require('../models/User');
const Company = require('../models/Company');
const MpCredential = require('../models/MpCredential');

const APP_ID = process.env.MP_CLIENT_ID;
const SECRET_ID = process.env.MP_CLIENT_SECRET_ID;
const REDIRECT_PAGE = process.env.MP_REDIRECT;

const getUrlRegister = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!user.company_id) {
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
        `https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&state=${user.company_id}&redirect_uri=${REDIRECT_PAGE}`
      );
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const validateCode = async (request, response) => {
  const { code, state } = request.query;
  const { userId } = request;

  if (!code && !state) {
    return response.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const data = `client_secret=${SECRET_ID}&client_id=${APP_ID}&grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_PAGE}`;

    const config = {
      method: 'post',
      url: 'https://api.mercadopago.com/oauth/token',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    const resultado = await axios(config);

    const {
      access_token: accessToken,
      expires_in: expireIn,
      user_id: mpUserId,
      refresh_token: refreshToken,
      public_key: publicKey,
    } = resultado.data;

    console.log(resultado.data); // TODO: Eliminar despues de Probar

    const company = await Company.findOne({ where: { ownerId: userId } });

    if (company.mp_credential_id) {
      return response
        .status(400)
        .send({ message: 'Compania con credenciales activa' });
    }

    const credential = await MpCredential.create({
      accessToken,
      expireIn,
      mpUserId,
      refreshToken,
      publicKey,
    });

    await company.setMpcredential(credential);

    return response.status(200).json({ message: 'Credenciales Registradas' });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error });
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
