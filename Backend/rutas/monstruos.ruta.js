const express = require('express');
//const Monstruo = require("../modelos/monstruo.modelo.js");
const router = express.Router();
const {getMonstruos, getMonstruo, crearMonstruo, actualizarMonstruo, borrarMonstruo} = require('../controladores/monstruo.controlador.js')


router.get('/', getMonstruos);
router.get('/:id', getMonstruo);

router.post('/', crearMonstruo);

router.put('/:id', actualizarMonstruo);

router.delete('/:id', borrarMonstruo);

module.exports = router;