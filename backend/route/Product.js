import express from 'express';
import {
  creatProduct,
  getProducts,
  deteleProduct,
  updateProduct,
  getallproducts
} from '../controller/Product.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
const router = express.Router();
router.post('/addproduct', authMiddleware, upload.single('image'), creatProduct);
router.get('/', authMiddleware, getProducts);
router.get('/all', getallproducts);
router.delete('/:id', authMiddleware, deteleProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);

export default router;
