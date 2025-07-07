import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, setRole }: { onLogin: (jwt: string) => void, setRole: (role: string) => void}) =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      Cookies.set('jwt', data.token);
      onLogin(data.token);
      setRole(data.user.role);
      navigate('/products');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn bg-blue-600" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login