
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const {
  crearProyecto,
  obtenerProyectos,
  actualizarProyecto,
  eliminarProyecto,
} = require("../controllers/proyectoController");

router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").notEmpty()],
  crearProyecto
);

router.get("/", auth, obtenerProyectos);

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  actualizarProyecto
);

router.delete(
  "/:id",
  auth,
  eliminarProyecto
);

module.exports = router;
