/* eslint-disable spaced-comment */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

/* 
    Esta función lo único que hace es enviar un link al mail del user
    enviándole un link para entrar al form de recuperación de contraseña
*/

const enviarMail = async (req, res) => {
  const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI, FRONT_URL } =
    process.env;
  const { email } = req.body;
  try {
    if (email) {
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
            text: `${FRONT_URL}/recuperarPassword`,
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

const confirmarMail = async (req, res) => {
  const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI, FRONT_URL } =
    process.env;
  const { id, email } = req.body;
  try {
    if (email) {
      const OAuthClient = google.auth.OAuth2;
      const oAuth2Client = new OAuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ message: 'Verifique los datos' });
      }
      await user.update({ mailCode: uuidv4() });

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
            subject: 'Confirma tu email para poder seguir navegando.',
            text: `${FRONT_URL}/confirm/${id}?emailcode=${user.mailCode}`,
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

const resetPassword = async (req, res) => {
  const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI, FRONT_URL } =
    process.env;
  const { email } = req.body;
  try {
    if (email) {
      const OAuthClient = google.auth.OAuth2;
      const oAuth2Client = new OAuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Verifique los datos' });
      }
      await user.update({ mailCode: uuidv4() });
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
            subject: 'Confirma tu email para poder seguir navegando.',
            text: `${FRONT_URL}/actualizarpassword/${user.id}?emailcode=${user.mailCode}`,
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
  confirmarMail,
  resetPassword,
};
