import mongoose from "mongoose";
import Monstruo from "../modelos/monstruo.modelo.js";

export const getMonstruos = async (req, res) => {
    try {
        const monstruos = await Monstruo.find({});

        res.status(200).json({ success: true, data: monstruos });

    } catch (error) {
        console.log("Error buscando monstruos:", error.message);
        res.status(500).json({ success: true, message: "Error del servidor" })
    }
};

export const getMonstruo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválida" });
    }

    try {
        const monstruo = await Monstruo.findById(id);

        if (!monstruo) {
        return res.status(404).json({ success: false, message: "Monstruo no encontrado" });
        }

        res.status(200).json({ success: true, data: monstruo });
    } catch (error) {
        console.error("Error obteniendo monstruo:", error.message);
    return res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

export const crearMonstruos = async (req, res) => {
    const monstruo = req.body; //lo que el usuario manda

    if(!monstruo.NOMBRE || !monstruo.IMAGEN || !monstruo.ICONO || !monstruo.CLASSIFICACION || !monstruo.DESCRIPCION)
    {
        return res.status(400).json({ success: false, message: "Por favor llene todos los campos"});
    }

    const nuevoMonstruo = new Monstruo(monstruo);

    try {
        await nuevoMonstruo.save();
        res.status(201).json({ success: true, data: nuevoMonstruo });
    } catch (error) {
        console.error("Error creando el monsturo: ", error.message);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

export const actualizarMonstruo = async (req, res) => {
    const { id } = req.params;

    const monstruo = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Id invalida" });
    }

    try {
        const monstruoActualizado = await Monstruo.findByIdAndUpdate(id, monstruo, {new:true});
        res.status(200).json({ success: true, data: monstruoActualizado });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error del servidor" })
    }
};

export const borrarMonstruo = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({ success: false, message: "Monstruo no existe" });
    }

    try {
        await Monstruo.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Monstruo borrado" });
    } catch (error) {
        res.status(500).json({ success:false, message: "Error del servidor" });
    }
};