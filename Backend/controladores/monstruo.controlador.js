const Monstruo = require('../modelos/monstruo.modelo')


const getMonstruos = async (req, res) => {
    try{
        const monstruos = await Monstruo.find({});
        res.status(200).json(monstruos);
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

const getMonstruo = async (req, res) => {
    try{
        const { id } = req.params;
        const monstruo = await Monstruo.findById(id);
        res.status(200).json(monstruo);
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

const crearMonstruo = async (req, res) => {
    try{
        const monstruo = await Monstruo.create(req.body);
        res.status(200).json(monstruo);
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

const actualizarMonstruo = async (req, res) => {
    try {
        const {id} = req.params;
        const monstruo = await Monstruo.findByIdAndUpdate(id, req.body);

        if(!monstruo) {
            return res.status(404).json({message: "Monstruo no encontrado"});
        }

        const monstruo_actualizado = await Monstruo.findById(id);
        res.status(200).json(monstruo_actualizado)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const borrarMonstruo = async (req, res) => {
    try {
        const { id } = req.params;

        const monstruo = await Monstruo.findByIdAndDelete(id);

        if(!monstruo) {
            return res.status(404).json({message: "Monstruo no encontrado"});
        }

        res.status(200).json({message: "El monstruo se borro con exito"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getMonstruos,
    getMonstruo,
    crearMonstruo,
    actualizarMonstruo,
    borrarMonstruo
}