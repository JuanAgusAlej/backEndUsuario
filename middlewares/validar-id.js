const { request, response } = require('express');
const Publicacion = require('../models/publicacion');
const Usuario = require('../models/usuario');
const {validationResult} = require('express-validator');




const ubicarId = async (req = request, res = response, next) => {
    
    const { id } = req.params;
    const errors = validationResult(req);

    
    let publicacion = null;
    let usuario = null;
    
    if (errors.isEmpty()) [publicacion, usuario] =  await Promise.all([
          
        Publicacion.findById(id),
        Usuario.findById(id),
    
    ]);

    
    
    if (publicacion) {
        req.idUbicado = 'publicacion';
        next();
    } else if (usuario) {
        req.idUbicado = 'usuario';

        next();
    } else {

        res.status(404).json({
            ok: false,
            msg: 'El id no es valido'
        });
    }

}
 

module.exports = {
    ubicarId
}