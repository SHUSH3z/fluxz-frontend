import { useAuthStore } from '../../store/authStore';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Se não estiver logado, redireciona para /login
    return <Navigate to="/login" replace />; 
  }

  // Se estiver logado, renderiza a página filha (ex: <HomePage />)
  return <Outlet />;
}