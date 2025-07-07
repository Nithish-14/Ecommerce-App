import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders
} from '../controllers/order.controller';
import { authenticate, authorizeRole } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authenticate, placeOrder);
router.get('/', authenticate, getUserOrders);
router.get('/all', authenticate, authorizeRole('admin'), getAllOrders);

export default router;
