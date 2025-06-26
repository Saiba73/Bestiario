import Usuario from '../modelos/usuario.modelo.js';
import bcrypt from 'bcrypt';

//crear usuario
export const crearUsuario = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Username y password son obligatorios' });
  }

  try {
    const existente = await Usuario.findOne({ username });
    if (existente) {
      return res
        .status(409)
        .json({ success: false, message: 'El usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({ username, password });
    await nuevoUsuario.save();

    return res.status(201).json({
      success: true,
      data: { id: nuevoUsuario._id, username: nuevoUsuario.username }
    });
  } catch (err) {
    console.error('Error creando usuario:', err);
    return res
      .status(500)
      .json({ success: false, message: 'Error del servidor' });
  }
};

//validar usuario
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};