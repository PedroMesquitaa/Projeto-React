import './Jogador.css';

const Jogador = ({ nome, imagem, funcao, onRemove, corDeFundo }) => {
    return (
        <div className='jogador'>
            <div className='cabecalho' style={{backgroundColor: corDeFundo }}>
                <img src={imagem} alt={nome}/>
            </div>
            <div className='rodape'>
                <h4>{nome}</h4>
                <h5>{funcao}</h5>
                <button className='button-4' onClick={onRemove}>Remover</button>
            </div>
        </div>
    );
};

export default Jogador;
