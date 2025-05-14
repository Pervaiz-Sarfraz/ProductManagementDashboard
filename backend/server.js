import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './route/Product.js';
import cors from 'cors';
import path from 'path';

import User from './route/User.js';
dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use('/api/products', productRoutes);
app.use('/api/auth', User); 
app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
