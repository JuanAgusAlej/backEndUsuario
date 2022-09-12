const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuarioAutenticado = await Usuario.findById(uid);

    
    if (!usuarioAutenticado) {
      return res.status(401).json({
        msg: "Token no válido - Usuario no encontrado",
      });
    }

    

    if (!usuarioAutenticado.estado) {
      return res.status(401).json({
        msg: "Token no válido - Usuario inactivo",
      });
    }

    req.usuario = usuarioAutenticado;
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
