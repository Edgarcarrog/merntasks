
const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  //revisa si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { proyectoId } = req.body;
    const proyectoExiste = await Proyecto.findById(proyectoId);

    if (!proyectoExiste) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(200).json(tarea);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyectoId } = req.query;
    const proyectoExiste = await Proyecto.findById(proyectoId);

    if (!proyectoExiste) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tareas = await Tarea.find({
      proyectoId,
    }).sort({creado: -1});
    res.status(200).json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {

  try {
    const tareaId = req.params.id;
    const { proyectoId, nombre, estado } = req.body;
    const proyectoExiste = await Proyecto.findById(proyectoId);
    const tareaExiste = await Tarea.findById(tareaId);

    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    if (!tareaExiste) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    //Crear nuevo objeto de tarea
    const nuevaTarea = {};
    if(nombre){
        nuevaTarea.nombre = nombre;
    }
    if(estado !== undefined){
        nuevaTarea.estado = !estado;
    }
    
    const tarea = await Tarea.findByIdAndUpdate(tareaId, nuevaTarea, {
      new: true,
    });
    res.status(200).json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {

  try {
    const tareaId = req.params.id;
    const { proyectoId } = req.query;
    const proyectoExiste = await Proyecto.findById(proyectoId);
    const tareaExiste = await Tarea.findById(tareaId);

    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    
    if (!tareaExiste) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    
    const tarea = await Tarea.findByIdAndDelete(tareaId);
    res.status(200).json({msg: 'Tarea eliminada', tarea});
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}