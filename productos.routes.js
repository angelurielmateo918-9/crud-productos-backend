import { Router } from 'express';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../controllers/productos.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/productos', getProductos);
router.post('/productos', verifyToken, createProducto);
router.put('/productos/:id', verifyToken, updateProducto);
router.delete('/productos/:id', verifyToken, deleteProducto);

export default router;