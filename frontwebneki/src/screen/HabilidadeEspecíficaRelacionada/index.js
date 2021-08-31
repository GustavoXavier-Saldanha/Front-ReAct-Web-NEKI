import './style.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../components/http'
import { Link } from 'react-router-dom'
import MensagemSucesso from '../../components/Mensagens/mensagemSucces'
import MensagemError from '../../components/Mensagens/mensagemError';

const HabilidadeEspecificaRelacionada = () => {

    const [habilidade, setHabilidade] = useState([])

    const [mensagem, setMensagem] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    const { id } = useParams()

    useEffect(() => {
        http.get('habilidade/' + id)
            .then(response => {
                setHabilidade(response.data)
                console.log(response.data)
            }
                 )
    }, [id])

// function excluirhabilidade(){
//     http.delete('habilidade/' + habilidade.id)
//     .then(console.log("Produto deletado"))
//     .catch(erro => console.log(erro))
//     history.push('/produtos')
// }


    const desrelacionar = () => {

        http.delete(`usuario/remove/${id}`)
        .then(response => {     
            setMensagemSucesso('A skill foi desrelacionada com sucesso!')
        })
        .catch(erro => {
            setMensagem('Erro ao desrelacionar skill')
        })
        setTimeout(() => {
            setMensagem('')
        }, 4000);
        setTimeout(() => {
            setMensagemSucesso('')
        }, 4000);
    }


    return (
        <div className="tenisEspecifico">
            <div className="container">
                <div className="row">

                    <div className="col-12 mb-3 align-items-center d-flex justify-content-center flex-column">
                        <h1>{habilidade.nome}</h1>
                       
                    </div>

                    <div className=" col-12 col-lg-7">
                        <img src={habilidade.url} alt="Imagem ilustrativa" className="img-fluid" />
                    </div>

                    <div className=" col-12 col-lg-4">
                    
                        <h5>{habilidade.descricao}</h5>
                        <h3 className="freteGreen">Opções:</h3>

                        <div className="form-group ">
                            {mensagem && <MensagemError msg={mensagem} />}
                            {mensagemSucesso && <MensagemSucesso msg={mensagemSucesso} />}
                        </div>

                        <div className="btn-group me-2" >
                            <button onClick={desrelacionar} className="btn btn-dark mt-3 block">Desrelacionar Habilidade</button>
                        </div>

                        <Link className="text-decoration-none  " to={`/editahabilidade/${id}`}>
                            <button className="btn btn-dark mt-2 block">Editar Habilidade</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Link to="/habilidades" className="btn mt-3 block">🠔 Voltar para Habilidades </Link>

                {/* <button onClick={() => {
                    excluirHabilidade(habilidade)
                }} className="btn btn-danger mt-3 block">Excluir produto</button> */}
            </div>
        </div>
    )
}

export default HabilidadeEspecificaRelacionada