const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  esRoleValido,
  emailExiste,
  usuarioExiste,
  mismoUsuario,
} = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuarioDelete,
  usuariosGetId,
  usuariosGetBorrados
} = require("../controllers/usuarios.controllers");
const { tieneRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet);
router.get("/borrados", [
  validarJWT,
  tieneRole("ADMIN_ROLE"),
  validarCampos
], usuariosGetBorrados);

router.get("/:id", [
  check("id", "El id no es valido").isMongoId(),
    validarCampos
], usuariosGetId);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "No es un correo valido").isEmail(),
    check("correo").custom(emailExiste),
    
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
       
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;
