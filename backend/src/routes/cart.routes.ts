import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  getCart,
  addOrUpdateCartItem,
  removeCartItem
} from '../controllers/cart.controller';

const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/', authenticate, addOrUpdateCartItem);
router.delete('/:productId', authenticate, removeCartItem);

export default router;
