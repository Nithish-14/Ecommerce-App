import { Request, Response } from 'express';
import Order from '../models/order.model';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user!.id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    let total = 0;
    const orderItems = cart.items.map(item => {
      const price = (item.product as any).price;
      total += price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity
      };
    });


    const order = await Order.create({
      user: req.user!.id,
      items: orderItems,
      total,
      status: 'placed'
    });



    await Cart.findOneAndDelete({ user: req.user!.id });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user!.id }).populate('items.product');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err });
  }
};

export const getAllOrders = async (_: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('items.product user');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: err });
  }
};
