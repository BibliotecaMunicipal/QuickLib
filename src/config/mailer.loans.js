import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'bibliotecamunicipaljaz@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  transporter.verify().then(() => {
    console.log('Ready to send emails');
  });

  return transporter;
}

export async function sendReminderEmail(email, bookTitle, message) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: 'bibliotecamunicipaljaz@gmail.com',
    to: email,
    subject: 'Recordatorio de Devolución de Libro',
    html: `<div>
      <h1>Recordatorio de Devolución de Libro</h1>
      <p>${message}</p>
      <img style="display: block; margin: 0 auto; width: 150px; height: 70px;" src="https://i.ibb.co/YBZd43z/logo-jaz.png" alt="Logo" />
    </div>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}
