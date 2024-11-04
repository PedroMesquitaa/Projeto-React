import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import './Formulario.css'

const Formulario = () => {
    const cor = [
        'Azul',
        'Amarelo',
        'Laranja',
        'Vermelho',
        'Roxo',
        'Verde'
    ]

    const aoSalvar = (evento) => {
        evento.preventDefault()
        console.log('Form foi submetido')
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para criar o card dos jogadores</h2>
                <CampoTexto obrigatorio={true} label="Nome" placeholder="Digite o nome" />
                <CampoTexto obrigatorio={true} label="Lane" placeholder="Digite a lane" />
                <CampoTexto obrigatorio={true} label="Imagem" placeholder="Informe o endereço da imagem" />
                <CampoTexto obrigatorio={true} label="Time" placeholder="Digite o nome do time" />
                <ListaSuspensa obrigatorio={true} label="Cor" itens={cor} />
                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    )
}

export default Formulario