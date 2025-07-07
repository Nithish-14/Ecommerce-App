import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      setToken(jwt);
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      setRole(payload.role);
    }
  }, []);

  const logout = () => {
    Cookies.remove('jwt');
    setToken('');
    setRole('');
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={token !== ''} role={role} onLogout={logout} />
     <Routes>
  <Route path="/" element={<Navigate to="/products" />} />
  <Route path="/login" element={<Login onLogin={setToken} setRole={setRole} />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/products" element={<Products token={token} role={role} />} />

  <Route
    path="/cart"
    element={
      <ProtectedRoute role="customer">
        <Cart token={token} />
      </ProtectedRoute>
    }
  />
  
<Route
  path="/orders"
  element={
    <ProtectedRoute role="customer">
      <Orders token={token} />
    </ProtectedRoute>
  }
/>

  <Route
    path="/admin"
    element={
      <ProtectedRoute role="admin">
        <Admin token={token} />
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;
