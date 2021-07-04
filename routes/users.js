const express = require("express");
const router = express.Router();
const { crearUsuario } = require("../controllers/userController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser de mínimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  crearUsuario
);

module.exports = router;
