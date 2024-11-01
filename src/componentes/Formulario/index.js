import CampoTexto from '../CampoTexto'
import './Formulario.css'

const Formulario = () => {
    return (
        <section className='formulario'>
            <form>
                <h2>Preencha os dados para criar o card do Jogadores</h2>
                <CampoTexto label="Nome" placeholder="Digite o nome" />
                <CampoTexto label="Lane" placeholder="Digite a lane" />
                <CampoTexto label="Imagem" placeholder="Informe o endereço da imagem" />
            </form>
        </section>
    )
}

export default Formulario