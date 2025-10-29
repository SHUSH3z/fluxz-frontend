// src/components/Router/PublicRoute.tsx
import { useAuthStore } from '../../store/authStore';
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // Se já estiver logado, redireciona para a home
    return <Navigate to="/" replace />; 
  }

  // Se não estiver logado, renderiza a página filha (ex: <LoginPage />)
  return <Outlet />;
}