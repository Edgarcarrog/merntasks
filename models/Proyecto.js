
const { Schema, model } = require("mongoose");

const proyectoSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  creador: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Proyecto", proyectoSchema);
