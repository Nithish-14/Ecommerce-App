import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const token = Cookies.get('jwt');

  if (!token) return <Navigate to="/login" />;

  if (role) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== role) return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
