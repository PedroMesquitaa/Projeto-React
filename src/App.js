import { useState } from 'react';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario';

function App() {

  const [jogadores, setJogadores] = useState([])

  const jogadorAdd = (jogador) => {
    console.log(jogador)
    setJogadores([...jogadores, jogador])
  }

  return (
    <div className="App">
      <Banner />
      <Formulario newJogador={jogador => jogadorAdd(jogador)}/>
    </div>
  );
}

export default App;
