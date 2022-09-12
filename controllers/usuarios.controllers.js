const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { mismoUsuario } = require("../helpers/db-validators");


const usuariosGet = async (req = request, res = response) => {
  
  const { limite = 5, desde = 0 } = req.query; 
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(201).json({
    total,
    usuarios,
  });
};
const usuariosGetBorrados = async (req = request, res = response) => {
  
  const { limite = 5, desde = 0 } = req.query; 
  const query = { estado: false };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(201).json({
    total,
    usuarios,
  });
};

const usuariosGetId = async (req = request, res = response) => {
 
  const id = req.params.id;
  const query = { estado: true };

  const usuario = await Usuario.findById(id).where(query);

  res.status(201).json({
    usuario,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const dato = req.body; //toma los datos que se envian

  const { nombre, correo, password } = dato;

  const usuario = new Usuario({ nombre, correo, password });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar datos en la BD
  await usuario.save();

  res.json({
    usuario,
  });
};


const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id; 
  const uid = req.uid;
  const { password, correo, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  let usuario;
  
  console.log(mismoUsuario(id, uid));
  if (mismoUsuario(id, uid)) {
    usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
  } else {
    return res.status(403).json({
      
      msg: "No tienes permiso para actualizar este usuario",
    });
  }

  res.json({
    usuario,
  });
};


const usuarioDelete = async (req, res) => {
  const id = req.params.id;

 

  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    usuarioBorrado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuarioDelete,
  usuariosGetId,
  usuariosGetBorrados
};
