import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user!.id }).populate('items.product');
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err });
  }
};

export const addOrUpdateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    let cart = await Cart.findOne({ user: req.user!.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user!.id,
        items: [{ product: productId, quantity }]
      });
    } else {
      const index = cart.items.findIndex(item => item.product.toString() === productId);

      if (index > -1) {
        if (quantity <= 0) {
          cart.items.splice(index, 1);
        } else {
          cart.items[index].quantity = quantity;
        }
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    const updated = await cart.populate('items.product');
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart', error: err });
  }
};

export const removeCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user!.id });
    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();


    const updated = await cart.populate('items.product');
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item', error: err });
  }
};
