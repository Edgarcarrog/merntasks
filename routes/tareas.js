
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
} = require("../controllers/tareaController");

router.post(
  "/",
  auth,
  [check("nombre", "El nombre de la tarea es obligatorio").notEmpty()],
  crearTarea
);

router.get(
  "/",
  auth,
  obtenerTareas
);

router.put(
  "/:id",
  auth,
  actualizarTarea
);

router.delete(
  "/:id",
  auth,
  eliminarTarea
);

module.exports = router;
