import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const signup = async () => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || 'Signup successful');
 navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select className="input" onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn bg-green-600" onClick={signup}>Signup</button>
    </div>
  );
}


export default Signup