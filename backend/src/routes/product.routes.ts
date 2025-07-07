import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getProducts); // Public route
router.post('/', authenticate, authorizeRole('admin'), createProduct);
router.put('/:id', authenticate, authorizeRole('admin'), updateProduct);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteProduct);

export default router;
