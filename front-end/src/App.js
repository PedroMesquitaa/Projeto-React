import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Login from './componentes/Login';

function App() {
  const [times, setTimes] = useState([]);
  const [user, setUser] = useState(null);

  // Função de login
  const handleLogin = (email) => {
    setUser({ email });
  };

  // Função de registro
  const handleRegister = (email, password, navigate) => {
    alert('Cadastro realizado com sucesso!');
    handleLogin(email, password, navigate);
  };

  // Adiciona um jogador
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

  // Remove um jogador
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
          {/* Rota de Login */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} onRegister={handleRegister} />}
          />
          
          {/* Rota de Formulário e Times */}
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
                <Navigate to="/login" /> // Redireciona para o login se não estiver logado
              )
            }
          />
          
          {/* Redirecionamento padrão para rotas inválidas */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
