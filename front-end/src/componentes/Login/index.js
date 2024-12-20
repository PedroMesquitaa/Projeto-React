import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';  // Importe o useNavigate

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();  // Hook para navegação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Novo estado para username
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Para exibir erros

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegistering
      ? 'http://localhost:5000/api/register' // Rota de registro
      : 'http://localhost:5000/api/login'; // Rota de login

    const bodyData = isRegistering
      ? { username, email, password } // Inclui username no cadastro
      : { email, password }; // Apenas email e senha no login

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          // Chama a função onRegister passando os dados
          onRegister(data);
        } else {
          // Chama a função onLogin passando os dados
          onLogin(data);
          navigate('/criar-times');  // Navegar para a página de criação de times
        }
      } else {
        setErrorMessage(data.message || 'Ocorreu um erro. Tente novamente.');
      }
    } catch (err) {
      setErrorMessage('Erro ao se conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isRegistering ? 'Cadastro' : 'Login'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isRegistering && (
          <div className="input-container">
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
              required
            />
          </div>
        )}
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className="login-button">
          {isRegistering ? 'Cadastrar' : 'Entrar'}
        </button>
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Já tem uma conta? Faça Login' : 'Não tem uma conta? Cadastre-se'}
        </button>
      </form>
    </div>
  );
};

export default Login;
