const axios = require('axios');
// const mercadopago = require('mercadopago')
const qs = require('qs');
/* const User = require("../models/User")
*/
const APP_ID = process.env.MP_CLIENT_ID 
const SECRET_ID = process.env.MP_CLIENT_SECRET_ID
const REDIRECT = process.env.MP_REDIRECT

/* 
const addSeller = async (req, res) => {
  const redirectUrl = 'http://localhost:3000/mercadopagotest'
  const {userId} = req
  const user = User.findByPk(userId)
  const {companyId} = user
  console.log('test')
  const url = `https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&state=${companyId}&redirect_uri=${redirectUrl}`
} */

/* curl -X POST \
     -H 'accept: application/json' \
     -H 'content-type: application/x-www-form-urlencoded' \
     'https://api.mercadopago.com/oauth/token' \
     -d 'client_secret=CLIENT_SECRET' \
     -d 'client_id=CLIENT_ID' \
     -d 'grant_type=authorization_code' \
     -d 'code=CODE' \
     -d 'redirect_uri=REDIRECT_URI' 
     
     curl -X POST -d 'grant_type=password&client_id=8d3c1664-05ae-47e4-bcdb-477489590aa4&client_secret=4f771f6f-5c10-4104-bbc6-3333f5b11bf9&username=email&password=password' https://api.hello.is/v1/oauth2/token
     */

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

const getUrlRegister = (req, res) => {
  try {
    const {companyId} = req.params
  res.status(200).send(`https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&state=${companyId}&redirect_uri=${REDIRECT}`)

  } catch (error) {
    console.log(error)
  }
  }

const validateCode = async (req, res) => {
  const { code } = req.query;

  try {

const data = qs.stringify({
  'client_id': APP_ID,
  'client_secret': SECRET_ID,
  'grant_type': 'authorization_code',
  'code': code,
  'redirect_uri': REDIRECT 
});
const config = {
  method: 'post',
  url: 'https://api.mercadopago.com/oauth/token',
  headers: { 
    'accept': 'application/json', 
    'content-type': 'application/x-www-form-urlencoded'
  },
  data
};
axios(config)
.then((response) => {
  res.status(200).send(JSON.stringify(response.data));

  



})
.catch((error) => {
  console.log(error)
  res.status(400).send({ message: error });
});
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  validateCode,
  getUrlRegister
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