const { response, request } = require('express');
const nodemailer = require('nodemailer');
const EnviarCorreoConfirmacion = require('../helpers/send-emails');
require('dotenv').config();

const subscribeGet = async (req = request, res = response) => {
  const { email } = req.params;
  const subject = 'Suscripcion';
  const text = 'Gracias por suscribirte.';
  EnviarCorreoConfirmacion(email, subject, text, res);
};

module.exports = subscribeGet;
