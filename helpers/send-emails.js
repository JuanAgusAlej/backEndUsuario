const nodemailer = require('nodemailer');

function EnviarCorreoConfirmacion(correo) {
  var transport = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
    auth: {
      user: 'estafamlibre147@gmail.com',
      pass: 'D80D9EF1E475E25A3F0343DF92A7CCAAE918',
    },
  });
  const message = {
    from: 'aten147@gmail.com', // Sender address
    to: correo,         // List of recipients
    subject: 'Design Your Model S | Tesla', // Subject line
    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
});

}

module.exports = EnviarCorreoConfirmacion;
