import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import styles from './Login.module.scss'; 

export function LoginPage() {
  const { setUser } = useAuthStore(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      const user = response.data;
      setUser(user);

    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Seja Bem Vindo</h1>
        {error && <p className={styles.error}>{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}