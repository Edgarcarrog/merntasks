
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {

  //revisa si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario.id;
    await proyecto.save();
    res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({
      creador: req.usuario.id,
    });
    res.status(200).json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarProyecto = async (req, res) => {

  //revisa si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const id = req.params.id;
    const nombre = req.body.nombre;
    let proyecto = await Proyecto.findById(id);

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    proyecto = await Proyecto.findByIdAndUpdate(id, { nombre }, { new: true });
    res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarProyecto = async (req, res) => {

  try {
    const id = req.params.id;
    let proyecto = await Proyecto.findById(id);

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    proyecto = await Proyecto.findByIdAndDelete(id);
    res.status(200).json({msg: 'Proyecto eliminado', proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};