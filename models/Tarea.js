
const { Schema, model } = require("mongoose");

const TareaSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  proyectoId: {
    type: Schema.Types.ObjectId,
    ref: "Proyecto",
  },
});

module.exports = model('Tarea', TareaSchema);