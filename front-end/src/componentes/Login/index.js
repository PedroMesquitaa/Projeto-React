import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate(); // Hook para navegação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Estado para o nome de usuário
  const [isRegistering, setIsRegistering] = useState(false); // Alternar entre login/cadastro
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegistering
      ? 'http://localhost:5000/api/register' // Endpoint de registro
      : 'http://localhost:5000/api/login'; // Endpoint de login

    const bodyData = isRegistering
      ? { username, email, password } // Dados para cadastro
      : { email, password }; // Dados para login

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      
      if (response.ok) {
        if (isRegistering) {
          alert('Cadastro realizado com sucesso! Faça login para continuar.');
          setIsRegistering(false); // Alterna para a tela de login
          setEmail(''); // Limpa o campo de email
          setPassword(''); // Limpa o campo de senha
          setUsername(''); // Limpa o campo de nome de usuário
        } else {
          onLogin(bodyData); // Passa os dados do usuário para o App
          navigate('/formulario'); // Navega para a tela principal
        }
      } else {
        setErrorMessage(response.message || 'Ocorreu um erro. Tente novamente.');
      }
    } catch (err) {
      console.log(err);
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
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage(''); // Limpa mensagens de erro ao alternar
          }}
        >
          {isRegistering
            ? 'Já tem uma conta? Faça Login'
            : 'Não tem uma conta? Cadastre-se'}
        </button>
      </form>
    </div>
  );
};

export default Login;
