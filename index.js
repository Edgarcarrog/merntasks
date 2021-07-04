const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//Crear el servidor
const app = express();

//Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ extended: true }));

//importar rutas
const usuarios = require("./routes/users");
const auth = require("./routes/auth");
const proyectos = require("./routes/proyectos");
const tareas = require("./routes/tareas");
app.use("/api/usuarios", usuarios);
app.use("/api/auth", auth);
app.use("/api/proyectos", proyectos);
app.use("/api/tareas", tareas);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
