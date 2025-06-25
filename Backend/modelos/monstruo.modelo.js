import mongoose from "mongoose";

const monstruoSchema = new mongoose.Schema({
    NOMBRE:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },

    IMAGEN:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },

    ICONO:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },

    CLASSIFICACION:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },

    DESCRIPCION:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },

    DIFICULTAD:{
        type: Number,
        default: 0
    },

    CONSEJO:{
        type: String,
        unique: false,
        trim: true,
        minlength: 1
    },

    LLANOS_VENTOSOS:{
        type: Boolean,
        default: false
    },

    BOSQUE_ESCARLATA:{
        type: Boolean,
        default: false
    },

    CUENCA_OLEOSA:{
        type: Boolean,
        default: false
    },

    ACANTILADOS_ESPINAHELADA:{
        type: Boolean,
        default: false
    },

    DEBILIDAD_FUEGO:{
        type: Number,
        default: 0
    },

    DEBILIDAD_AGUA:{
        type: Number,
        default: 0
    },

    DEBILIDAD_ELECTRICIDAD:{
        type: Number,
        default: 0
    },

    DEBILIDAD_HIELO:{
        type: Number,
        default: 0
    },

    DEBILIDAD_DRAGON:{
        type: Number,
        default: 0
    }
    },
    {
        timestamps: true
    }
);

const Monstruo = mongoose.model('Monstruo', monstruoSchema);

export default Monstruo;