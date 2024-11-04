import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import './Formulario.css'

const Formulario = (props) => {
    const cor = [
        'Azul',
        'Amarelo',
        'Laranja',
        'Vermelho',
        'Roxo',
        'Verde'
    ]

    const [nome, setNome] = useState('')
    const [lane, setLane] = useState('')
    const [imagem, setImagem] = useState('')
    const [time, setTime] = useState('')
    const [cores, setCores] = useState('')

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.newJogador({
            nome,
            lane,
            imagem,
            time,
            cores
        })
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para criar o card dos jogadores</h2>
                <CampoTexto 
                    obrigatorio={true} 
                    label="Nome" 
                    placeholder="Digite o nome" 
                    valor = {nome}
                    aoAlterado={valor => setNome(valor)}
                />

                <CampoTexto 
                    obrigatorio={true} 
                    label="Lane" 
                    placeholder="Digite a lane"
                    valor = {lane}
                    aoAlterado={valor => setLane(valor)}
                />

                <CampoTexto 
                    obrigatorio={true} 
                    label="Imagem" 
                    placeholder="Informe o endereço da imagem" 
                    valor = {imagem}
                    aoAlterado={valor => setImagem(valor)}
                />

                <CampoTexto 
                    obrigatorio={true} 
                    label="Time" 
                    placeholder="Digite o nome do time"
                    valor = {time}
                    aoAlterado={valor => setTime(valor)}
                />

                <ListaSuspensa 
                    obrigatorio={true} 
                    label="Cor" 
                    itens={cor}
                    valor = {cores}
                    aoAlterado={valor => setCores(valor)}
                />

                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    )
}

export default Formulario