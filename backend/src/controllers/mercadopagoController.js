const request = require('request');
/* const User = require("../models/User")
*/
const APP_ID = process.env.MP_CLIENT_ID 
const SECRET_ID = process.env.MP_CLIENTE_SECRET_ID
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

const addSeller = async (req, res) => {
  const { code } = req.query;

  try {
    const headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    const dataString =
      `client_secret=${SECRET_ID}&client_id=${APP_ID}&grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT}`;

    const options = {
      url: 'https://api.mercadopago.com/oauth/token',
      method: 'POST',
      headers,
      body: dataString,
    };

    // eslint-disable-next-line no-inner-declarations
    function callback(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
      }
    }

    request(options, callback);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  addSeller,
};
