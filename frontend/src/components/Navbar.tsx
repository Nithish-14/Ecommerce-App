import { Link } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  role: string;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, role, onLogout }: Props) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/products">Products</Link>
        {role === 'customer' && <Link to="/cart">Cart</Link>}
        {role === 'customer' && <Link to="/orders">Orders</Link>}
        {role === 'admin' && <Link to="/admin">Admin</Link>}
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar
