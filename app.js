import express from 'express';
import cors from 'cors';
import productosRoutes from './productos.routes.js';
import authRoutes from './auth.routes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', productosRoutes);

export default app;
