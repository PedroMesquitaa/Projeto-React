// App.js

import { useState } from 'react';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';

function App() {
  const [times, setTimes] = useState([]); // Inicialize `times` como um array vazio

  const jogadorAdd = (jogador) => {
    setTimes((prevTimes) => {
      const timeExistente = prevTimes.find((time) => time.nome === jogador.equipe);

      if (timeExistente) {
        // Se o time já existe, adicione o jogador a esse time específico
        return prevTimes.map((time) =>
          time.nome === jogador.equipe
            ? { ...time, jogadores: [...time.jogadores, { ...jogador, id: Date.now() }] } // Adicione um campo `id` único para cada jogador
            : time
        );
      } else {
        // Se o time não existe, cria um novo time com o nome e a cor selecionados
        return [
          ...prevTimes,
          {
            nome: jogador.equipe,
            corPrimaria: jogador.cor, // Usar a cor que o usuário escolheu
            corSecundaria: '#f0f0f0', // Cor secundária padrão
            jogadores: [{ ...jogador, id: Date.now() }] // Adicione um campo `id` único para cada jogador
          }
        ];
      }
    });
  };

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
        .filter((time) => time.jogadores.length > 0) // Remove times vazios
    );
  };

  return (
    <div className="App">
      <Banner />
      <Formulario newJogador={jogadorAdd} />

      {times.map((time) => (
        <Time
          key={time.nome}
          nome={time.nome}
          corPrimaria={time.corPrimaria}
          corSecundaria={time.corSecundaria}
          jogadores={time.jogadores}
          onRemoveJogador={(jogadorId) => removerJogador(time.nome, jogadorId)} // Passa a função de remoção para o componente Time
        />
      ))}
    </div>
  );
}

export default App;
