import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario'; // Importa o componente Formulario
import Time from './componentes/Time';
import Login from './componentes/Login'; // Importa o componente Login

function App() {
  const [times, setTimes] = useState([]); // Inicialize `times` como um array vazio
  const [user, setUser] = useState(null); // Estado para gerenciar o usuário logado

  // Função de login para validar o usuário
  const handleLogin = (email, password, navigate) => {
    // Aqui você pode adicionar a lógica de autenticação com a API
    if (email === 'exemplo@teste.com' && password === '123456') {
      // Após autenticação bem-sucedida, define o usuário logado
      setUser({ email });
      navigate('/formulario'); // Redireciona para a página de criação de times
    } else {
      alert('Credenciais inválidas');
    }
  };

  // Função para registrar um novo usuário (caso você queira adicionar essa funcionalidade)
  const handleRegister = (email, password, navigate) => {
    // Adicione lógica para registrar o usuário (isso pode ser feito com uma API de cadastro)
    alert('Cadastro realizado com sucesso!');
    // Após o cadastro, você pode realizar o login automaticamente ou apenas exibir uma mensagem.
    handleLogin(email, password, navigate);
  };

  // Função para adicionar um novo jogador
  const jogadorAdd = (jogador) => {
    setTimes((prevTimes) => {
      const timeExistente = prevTimes.find((time) => time.nome === jogador.equipe);

      if (timeExistente) {
        return prevTimes.map((time) =>
          time.nome === jogador.equipe
            ? { ...time, jogadores: [...time.jogadores, { ...jogador, id: Date.now() }] }
            : time
        );
      } else {
        return [
          ...prevTimes,
          {
            nome: jogador.equipe,
            corPrimaria: jogador.cor,
            corSecundaria: '#f0f0f0',
            jogadores: [{ ...jogador, id: Date.now() }]
          }
        ];
      }
    });
  };

  // Função para remover um jogador
  const removerJogador = (nomeTime, jogadorId) => {
    setTimes((prevTimes) =>
      prevTimes
        .map((time) =>
          time.nome === nomeTime
            ? {
                ...time,
                jogadores: time.jogadores.filter((jogador) => jogador.id !== jogadorId)
              }
            : time
        )
        .filter((time) => time.jogadores.length > 0)
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} onRegister={handleRegister} />}
          />
          <Route
            path="/formulario"
            element={
              user ? (
                <>
                  <Banner />
                  <Formulario newJogador={jogadorAdd} />
                  {times.map((time) => (
                    <Time
                      key={time.nome}
                      nome={time.nome}
                      corPrimaria={time.corPrimaria}
                      corSecundaria={time.corSecundaria}
                      jogadores={time.jogadores}
                      onRemoveJogador={(jogadorId) => removerJogador(time.nome, jogadorId)}
                    />
                  ))}
                </>
              ) : (
                <Login onLogin={handleLogin} onRegister={handleRegister} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
