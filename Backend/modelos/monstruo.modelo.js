import mongoose from "mongoose";

const monstruoSchema = new mongoose.Schema({
    NOMBRE:{
        type: String,
        required: true,
        unique: true,
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

    ELEMENTO_FUEGO:{
        type: Boolean,
        default: false
    },

    ELEMENTO_AGUA:{
        type: Boolean,
        default: false
    },

    ELEMENTO_HIELO:{
        type: Boolean,
        default: false
    },

    ELEMENTO_ELECTRICIDAD:{
        type: Boolean,
        default: false
    },

    ELEMENTO_DRAGON:{
        type: Boolean,
        default: false
    },

    DEBILIDAD_FUEGO:{
        type: Boolean,
        default: false
    },

    DEBILIDAD_AGUA:{
        type: Boolean,
        default: false
    },

    DEBILIDAD_ELECTRICIDAD:{
        type: Boolean,
        default: false
    },

    DEBILIDAD_HIELO:{
        type: Boolean,
        default: false
    },

    DEBILIDAD_DRAGON:{
        type: Boolean,
        default: false
    }
});

const Monstruo = mongoose.model('Monstruo', monstruoSchema);

export default Monstruo;