const nodemailer = require('nodemailer');

async function EnviarCorreoConfirmacion(correo, subject, text, res) {
  var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS,
    },
  });
  const message = {
    from: process.env.USER, // Sender address
    to: correo, // List of recipients
    subject: 'Suscripcion', // Subject line
    text: 'Gracias por suscribirte, recibiras informacion a tu correo', // Plain text body
  };
  await transport.sendMail(message, function (err, info) {
    if (err) {
      res.json({ status: 500, res: err });
    } else {
      console.log(info);
      res.json({ status: 201, res: 'Gracias por suscribirte' });
    }
  });
}

module.exports = EnviarCorreoConfirmacion;
