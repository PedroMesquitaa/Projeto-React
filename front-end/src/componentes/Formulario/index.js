import { useState, useRef } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';

const Formulario = (props) => {
    const [nome, setNome] = useState('');
    const [funcao, setFuncao] = useState('');
    const [imagem, setImagem] = useState(''); // Usado para o card
    const [nomeImagem, setNomeImagem] = useState(''); // Nome do arquivo selecionado
    const [equipe, setEquipe] = useState('');
    const [cor, setCor] = useState(''); // Inicialmente vazio

    // Ref para o input de imagem
    const inputImagemRef = useRef(null);

    // URL da imagem padrão
    const imagemPadrao = '/imagens/imagem-padrao.jpg';

    const aoSalvar = (evento) => {
        evento.preventDefault();

        // Utiliza a imagem padrão se nenhuma imagem for fornecida
        const imagemFinal = imagem || imagemPadrao;

        props.newJogador({
            nome,
            funcao,
            imagem: imagemFinal,
            equipe,
            cor, // Adicionando a cor ao objeto jogador
        });

        // Limpa os campos após a submissão
        setNome('');
        setFuncao('');
        setImagem('');
        setEquipe('');
        setNomeImagem('');
        setCor(''); // Limpa o campo de cor
        if (inputImagemRef.current) {
            inputImagemRef.current.value = ''; // Limpa o input de arquivo
        }
    };

    // Manipulador de mudança de imagem para o card
    const aoAlterarImagem = (evento) => {
        const arquivo = evento.target.files[0];
        if (arquivo) {
            // Cria uma URL temporária para a imagem selecionada e atualiza o nome do arquivo
            const urlImagem = URL.createObjectURL(arquivo);
            setImagem(urlImagem);
            setNomeImagem(arquivo.name);
        }
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
                {/* Imagem fixa que não muda ao selecionar a imagem do card */}
                <img src="/imagens/gaming.jpg" alt="Imagem Fixa" />
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

                {/* Novo campo de upload de imagem estilizado */}
                <div className="campo-upload">
                    <span className="nome-arquivo">{nomeImagem || 'Selecione a imagem do jogador'}</span>
                    <label className="label-upload" htmlFor="upload-imagem">
                        Escolher Arquivo
                    </label>
                    <input
                        type="file"
                        id="upload-imagem"
                        className="input-upload"
                        accept="image/*"
                        onChange={aoAlterarImagem}
                        ref={inputImagemRef}
                    />
                </div>

                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    );
};

export default Formulario;
