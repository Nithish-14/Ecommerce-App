import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Products = ({ token, role }: { token: string; role: string }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
const categories = ['All', 'Electronics', 'Books', 'Clothing', 'Shoes'];
  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const LIMIT = 10;
  const API = import.meta.env.VITE_API_URL;

  console.log(role)

  const fetchProducts = async () => {
     setLoading(true);
    try {
      let url = `${API}/products?page=${currentPage}&limit=${LIMIT}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
    const data = await res.json();
    if (data.data.length !== 0) {
      setProducts(data.data);
      setTotalPages(Math.ceil(data.total / LIMIT));
    } else {
setProducts([]);
      setTotalPages(1);
    }

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
  };

  const addToCart = async (productId: string) => {
    await fetch(`${API}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    alert('Added to cart');
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, category]);

    if (loading) return <Loader />;

  return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Products</h2>
    <div className="mb-4 flex items-center space-x-4">
  <label htmlFor="category">Filter by category:</label>
  <select
    id="category"
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setCurrentPage(1);
    }}
    className="border px-2 py-1 rounded"
  >
    {categories.map((cat) => (
      <option key={cat} value={cat === 'All' ? '' : cat}>
        {cat}
      </option>
    ))}
  </select>
</div>
    {products.length === 0 ? (
      <p className="text-gray-600">No products available.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p: any) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{p.price}</p>
            {role === 'customer' && (
              <button className="btn bg-blue-600 mt-2" onClick={() => addToCart(p._id)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    )}
    <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

  </div>
);

}

export default Products