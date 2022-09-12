const { response } = require("express");

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere validar el rol sin validar el token",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  tieneRole,
};