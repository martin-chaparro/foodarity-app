/* eslint-disable spaced-comment */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

/* 
    Esta función lo único que hace es enviar un link al mail del user
    enviándole un link para entrar al form de recuperación de contraseña
*/

const enviarMail = async (req, res) => {
  const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI } = process.env;
  const { email } = req.body;
  try {
    if (email) {
      // const link =   "http://localhost:3000/user/login/password";
      const OAuthClient = google.auth.OAuth2;
      const oAuth2Client = new OAuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      async function sendMail() {
        try {
          const accessToken = await oAuth2Client.getAccessToken();
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'foodarityapp@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });
          const mailOptions = {
            from: 'Foodarity <foodarityapp@gmail.com>',
            to: email,
            subject: 'Ingresa al siguiente link para recuperar su contraseña',
            text: 'http://localhost:3000/user/login/password ',
          };

          const result = await transporter.sendMail(mailOptions);
          return result;
        } catch (error) {
          console.log(error);
        }
      }

      sendMail(req, res)
        .then(() => {
          res.json('enviado');
        })
        .catch((error) => console.log(error.message));
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  enviarMail,
};
