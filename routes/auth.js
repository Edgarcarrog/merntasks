const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { autenticarUsuario, usuarioAutenticado } = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/",
  autenticarUsuario
);

router.get(
  '/',
  auth,
  usuarioAutenticado
);

module.exports = router;
