const { response, request } = require('express');
const nodemailer = require('nodemailer');
require("dotenv").config();


const subscribeGet = async (req = request, res = response) => {
  const { email } = req.params;
  let testAccount = await nodemailer.createTestAccount()
  let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
   // service: 'Gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  return transporter.sendMail(
    {
      from: 'estafamlibre147@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    },
    (err,info) => {
      if (err) res.status(200).send({ success: false, error: err });
      return res.status(200).send({
        success: true,
        message: 'email sent!!',
      });
    })
  

  res.status(200).send('Se envio el correo');
};

module.exports = subscribeGet;
