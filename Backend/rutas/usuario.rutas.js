import express from 'express';
import { login, crearUsuario } from '../controladores/usuario.controladores.js';

const router = express.Router();

// Registro de nuevos administradores
router.post('/registrar', crearUsuario);

// Login de administradores
router.post('/login', login);

export default router;