import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

interface Order {
  _id: string;
  createdAt: string;
  items: {
    product: { name: string };
    quantity: number;
  }[];
}

export default function Orders({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-500">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="mt-2 list-disc ml-6">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.product.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
