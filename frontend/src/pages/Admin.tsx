import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Admin = ({ token }: { token: string }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data.data || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
  };

  const addProduct = async () => {
    const name = prompt('Name:');
    const description = prompt('Description:');
    const price = prompt('Price:');
    const category = prompt('Category:');
    const stock = prompt('Stock:');

    await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, description, price, category, stock }),
    });

    alert('Product added');
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button className="btn bg-green-600" onClick={addProduct}>+ Add Product</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {products.length === 0 ? (
  <p className="text-gray-600">No products added yet.</p>
) : (
  <div className="grid md:grid-cols-3 gap-4">
    {products.map((p: any) => (
      <div key={p._id} className="border p-4 rounded shadow">
        <h3 className="font-bold">{p.name}</h3>
        <p>{p.description}</p>
        <p>₹{p.price}</p>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}


export default Admin