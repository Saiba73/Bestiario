const mongoose = require('mongoose');



const MonstruoSchema = mongoose.Schema(
    {
    ID:{
        type: Number,
        required: true,
        unique: true
    },

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

    CONSEJO:{
        type: String,
        required: true,
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

const monstruo = mongoose.model("monstruo", MonstruoSchema);

module.exports = monstruo;