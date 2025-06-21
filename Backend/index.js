const express = require('express');
const mongoose = require('mongoose');
//const Monstruo = require('./modelos/monstruo.modelo.js');
const monstruosRUTA = require('./rutas/monstruos.ruta.js');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//rutas
app.use("/api/monstruos", monstruosRUTA);


// se conecta al servidor
app.listen(3000, () => {
    console.log("Sever corriendo en puerto 3000");
});

app.get('/', (req, res) => {
    res.send("Hello from node API update 1");
});

//se conecta a la base de datos en mongoDB
mongoose
    .connect(
        "mongodb+srv://admin:123@monstruos.gwqcku1.mongodb.net/Monstruo-API?retryWrites=true&w=majority&appName=Monstruos"
    )
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch(() => {
        console.log("No se pudo conectar a la base de datos");
    });