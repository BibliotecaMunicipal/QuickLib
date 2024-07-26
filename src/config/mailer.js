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

export async function sendEmail(newUser, token) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: 'bibliotecamunicipaljaz@gmail.com',
    to: newUser.email,
    subject: 'Welcome to Biblioteca Juan Aldma ',
    html: `<div>
      <h1>Hello ${newUser.username}, welcome to the Biblioteca!</h1>
      <br />
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        "
      >
        <img
          style="display: block; item-self: center; width: 70px; height: 70px"
          src="https://i.ibb.co/YBZd43z/logo-jaz.png"
        />
        <br />
        <p>
          Estimado/a ${newUser.username}, Gracias por registrarte en la Biblioteca de 
          Juan Aldama Zacatecas. Para completar el proceso de registro y activar tu
          cuenta, necesitamos que verifiques tu dirección de correo electrónico. Por
          favor, haz clic en el siguiente enlace o cópialo y pégalo en tu navegador
          para verificar tu cuenta:
        </p>
        <a
          href="http://localhost:3000/api/verify/user/${token}"
          style="
            background-color: #3e70a1;
            color: white;
            padding: 20;
            border-radius: 10%;
          "
          >Verificar</a
        >
        <p>
          Este enlace de verificación es válido solo por 24 horas por razones de
          seguridad. Si no verificas tu cuenta dentro de este período, deberás
          iniciar nuevamente el proceso de registro. Una vez que hayas verificado tu
          cuenta, podrás disfrutar de todos los servicios y funciones que Bilioteca de 
          Juan Aldama tiene para ofrecerte. Si tienes alguna pregunta o
          necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de
          soporte en jesuhernan232@gmail.com. Atentamente, El
          Equipo de Biblioteca de Juan Aldama Zacatecas
        </p>
      </div>
    </div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Email enviado:', info.response);
    }
  });
}
