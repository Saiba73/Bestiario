import express from "express";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js";
import monstruoRutas from "./rutas/monstruo.rutas.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // permite aceptar datos en formato json en la petiicon del usuario

app.use("/api/monstruos", monstruoRutas)

//inicia el servidor
app.listen(5000, () => {
    conectarDB();
    console.log('servidor empezo en http://localhost:' + PORT);
});