import { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';

const Formulario = (props) => {
    const [nome, setNome] = useState('');
    const [funcao, setFuncao] = useState('');
    const [imagem, setImagem] = useState('');
    const [equipe, setEquipe] = useState('');
    const [cor, setCor] = useState(''); // Adicionando o campo de cor

    const aoSalvar = (evento) => {
        evento.preventDefault();
        props.newJogador({
            nome,
            funcao,
            imagem,
            equipe,
            cor, // Adicionando a cor ao objeto jogador
        });
        setNome('')
        setFuncao('')
        setImagem('')
        setEquipe('')
    };

    // Lista de cores disponíveis para seleção
    const coresDisponiveis = [
        { nome: 'Azul', valor: '#82CFFA' },
        { nome: 'Amarelo', valor: '#FFBA05' },
        { nome: 'Laranja', valor: '#FF8A29' },
        { nome: 'Vermelho', valor: '#E06B69' },
        { nome: 'Roxo', valor: '#7209d4' },
        { nome: 'Verde', valor: '#57C278' },
    ];

    return (
        <section className='formulario'>
            <div>
                <img
                    src="/imagens/gaming.jpg" // Mostra a imagem fornecida ou uma imagem padrão
                    alt="Jogador"
                />
            </div>

            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para criar o card dos jogadores:</h2>
                
                <CampoTexto 
                    obrigatorio={true} 
                    label="Nome" 
                    placeholder="Digite o nome" 
                    valor={nome}
                    aoAlterado={(valor) => setNome(valor)}
                />

                <CampoTexto 
                    obrigatorio={true} 
                    label="Função" 
                    placeholder="Digite a função"
                    valor={funcao}
                    aoAlterado={(valor) => setFuncao(valor)}
                />

                <CampoTexto 
                    obrigatorio={true} 
                    label="Imagem" 
                    placeholder="Informe o endereço da imagem" 
                    valor={imagem}
                    aoAlterado={(valor) => setImagem(valor)}
                />

                <CampoTexto 
                    obrigatorio={true} 
                    label="Equipe" 
                    placeholder="Digite o nome da equipe"
                    valor={equipe}
                    aoAlterado={(valor) => setEquipe(valor)}
                />

                <ListaSuspensa 
                    obrigatorio={true} 
                    label="Escolha a cor para o time" 
                    itens={coresDisponiveis.map((cor) => cor.nome)}
                    valor={cor}
                    aoAlterado={(valor) => {
                        // Atualizar o valor de `cor` com a cor selecionada
                        const corSelecionada = coresDisponiveis.find(c => c.nome === valor);
                        setCor(corSelecionada ? corSelecionada.valor : '');
                    }}
                />

                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    );
};

export default Formulario;
