import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  return localStorage.getItem('email') ? <Navigate to="/" replace /> : children;
}
