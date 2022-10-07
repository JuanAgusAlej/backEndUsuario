const nodemailer = require('nodemailer');
class Email {
  constructor(oConfig) {
    this.createTrasport = nodemailer.createTransport(oConfig);
  }

  enviarCorreo(oEmail) {
    try {
      this.createTrasport.sendMail(oEmail, function (error) {
        if (error) {
          console.log('error al enviar email');
        } else {
          console.log('Se envio correctamente');
        }
        this.createTransport.close();
      });
    } catch (error) {
      console.log('Email.enviar correo ' + error);
    }
  }
}

module.exports = Email;
