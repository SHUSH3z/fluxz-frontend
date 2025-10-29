import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import api from './services/api';
import { Routes, Route } from 'react-router-dom'; // 1. Importar Routes e Route

// Importar nossas páginas
import { LoginPage } from './pages/Login/LoginPage';
import { HomePage } from './pages/Home/HomePage';

// Importar nossos "Guardas"
import { ProtectedRoute } from './components/Router/ProtectedRoute';
import { PublicRoute } from './components/Router/PublicRoute';
import type { User } from './types/User';


function App() {
  // --- A LÓGICA DE VERIFICAÇÃO CONTINUA A MESMA ---
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get<User>('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.log("Verificação falhou, usuário não está logado.");
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [setUser]);

  // Mostrar "Carregando..." enquanto o token é verificado
  if (isLoading) {
    return <div>Carregando Aplicação...</div>;
  }

  // --- AQUI ESTÁ O NOSSO MAPA (ROTEADOR) ---
  return (
    <Routes>
      
      {/* GRUPO DE ROTAS PÚBLICAS
        - Só podem ser acessadas se o usuário NÃO estiver logado.
      */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Route>

      {/* GRUPO DE ROTAS PROTEGIDAS
        - Só podem ser acessadas se o usuário ESTIVER logado.
      */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/chat" element={<ChatPage />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Route>

        <Route path="*" element={<div>Página não encontrada</div>} />

    </Routes>
  );
}

export default App;