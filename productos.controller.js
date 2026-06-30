import { pool } from '../db.js';

export const getProductos = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos');
  res.json(rows);
};

export const createProducto = async (req, res) => {
  const { nombre, precio, stock } = req.body;

  const [result] = await pool.query(
    'INSERT INTO productos(nombre, precio, stock) VALUES (?, ?, ?)',
    [nombre, precio, stock]
  );

  res.json({ id: result.insertId, nombre, precio, stock });
};

export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const [result] = await pool.query(
    'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
    [nombre, precio, stock, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json({ message: 'Producto actualizado' });
};

export const deleteProducto = async (req, res) => {
  const [result] = await pool.query(
    'DELETE FROM productos WHERE id = ?',
    [req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.sendStatus(204);
};