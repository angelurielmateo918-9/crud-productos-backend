import { pool } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE username = ?',
    [username]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
