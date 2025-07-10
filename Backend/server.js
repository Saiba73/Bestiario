import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { conectarDB } from "./config/db.js";
import monstruoRutas from "./rutas/monstruo.rutas.js"
import usuarioRutas from "./rutas/usuario.rutas.js"

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(express.json()); // permite aceptar datos en formato json en la petiicon del usuario


app.use("/api/auth", usuarioRutas);
app.use("/api/monstruos", monstruoRutas);

if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname, "/Frontend")));

    app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "html", "index.html"));
    });
}

//inicia el servidor
app.listen(5000, () => {
    conectarDB();
    console.log('servidor empezo en http://localhost:' + PORT);
});