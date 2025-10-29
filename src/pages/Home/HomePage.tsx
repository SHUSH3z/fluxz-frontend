import { useAuthStore } from '../../store/authStore';

export function HomePage() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <h1>Bem-vindo, {user?.username}!</h1>
      <p>Você está na página principal (protegida).</p>
      <button onClick={logout}>Sair (Logout)</button>
    </div>
  );
}