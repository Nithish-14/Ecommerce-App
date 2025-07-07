import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Cart = ({ token }: { token: string }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const fetchCart = async () => {
     try {
      setLoading(true);
    const res = await fetch(`${API}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCart(data.items || data.cart || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
  };

  const removeCartItem = async (productId: any) => {
     const res = await fetch(`${API}/cart/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(data)
    alert('Cart Item Removed');
    fetchCart();
  }

  const placeOrder = async () => {
    await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Order placed');
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cart.length === 0 ? <p>No items in cart</p> : (
        <>
          <ul className="list-disc ml-5">
            {cart.map((item: any) => (
              <div key={item.product._id} className="flex align-middle">
              <li>{item.product.name} × {item.quantity}</li>
              <button className="btn bg-red-600 ml-5" onClick={() => removeCartItem(item.product._id)}>Remove</button>
              </div>
            ))}
          </ul>
          <button className="btn bg-green-600 mt-4" onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart
