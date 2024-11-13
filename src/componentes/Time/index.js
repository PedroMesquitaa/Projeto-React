import Jogador from '../Jogador';
import './Time.css';

const Time = (props) => {
    return (
        <section className='time'>
            <h3 style={{ borderColor: props.corPrimaria }}>{props.nome}</h3>
            <div className='jogadores'>
                {props.jogadores.map(jogador => (
                    <Jogador 
                        corDeFundo={props.corPrimaria}
                        key={jogador.id} // Use o `id` do jogador como chave
                        nome={jogador.nome} 
                        funcao={jogador.funcao} 
                        imagem={jogador.imagem}
                        cor={props.corPrimaria} // Cor para o fundo do card
                        onRemove={() => props.onRemoveJogador(jogador.id)} // Use o `id` do jogador para remoção
                    />
                ))}
            </div>
            <div className="linha"></div>
        </section>
    );
};

export default Time;
