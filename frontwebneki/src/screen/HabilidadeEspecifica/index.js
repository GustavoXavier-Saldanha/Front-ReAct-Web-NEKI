import './style.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../components/http'
import { Link } from 'react-router-dom'

const HabilidadeEspecifica = () => {

    const [habilidade, setHabilidade] = useState([])
   
    const idUsuario = localStorage.getItem('idUsuario');

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

    const relacionar = () => {
  
        const usuario = {
        id: idUsuario
        }

        http.post(`usuario/adiciona/${id}`, usuario)
        .then(response => {
            console.log(response.data)
        })
        .catch(erro => {
            console.log('Algo deu errado')
            console.log(erro)
        })
    }


    const desrelacionar = () => {
  
        const usuario = {
        id: idUsuario
        }

        http.post(`usuario/remove/${id}`, usuario)
        .then(response => {
            console.log(response.data)
        })
        .catch(erro => {
            console.log('Algo deu errado')
            console.log(erro)
        })
    }

    const nota = () => {
        if (habilidade != null) {
            return (
                <>
                    <form >


                    </form>
                </>
            )
        }

        else{


        }
    }


    return (
        <div className="tenisEspecifico">
            <div className="container">
                <div className="row">

                    <div className="col-12 mb-3 align-items-center d-flex justify-content-center flex-column">
                        <h1>{habilidade.nome}</h1>
                       
                    </div>

                    <div className=" col-12 col-lg-7">
                        <img src={habilidade.url} className="img-fluid" />
                    </div>

                    <div className=" col-12 col-lg-4">
                    
                        <h5>{habilidade.descricao}</h5>
                        <h3 className="freteGreen">Opções:</h3>

                        <div className="btn-group me-2" >
                            <button onClick={() => {
                               relacionar()
                            }} className="btn btn-dark mt-3 block">Relacionar Habilidade</button>
                        </div>
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

export default HabilidadeEspecifica