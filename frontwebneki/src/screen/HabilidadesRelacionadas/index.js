import http from '../../components/http'
import CardHabilidade from '../../components/Cads/Relacionada'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './style.css'

const HabilidadesRelacionadas = () => {

    const [habilidades, setHabilidades] = useState([])

    const id = localStorage.getItem('idUsuario');
   
    
    useEffect(() => {

        const usuarioHabilidade = () => {

            http.get(`/habilidade/usuario/${id}`)
            .then(response => {
                console.log(("resposta:",response.data))
                setHabilidades(response.data)
            })
                .catch(erro => {
                    console.log(erro)
                })
        }
        
        usuarioHabilidade()
    }, [id])



    return (
        <div className='tabela mb-5'>
            <h2>Habilidades Relacionadas:</h2>
            <div className="btn-group me-2" role="group" aria-label="Second group">
                <Link to="/cadastrohabilidade" className="btn btnHabilidade mt-3 block">Adicionar Habilidades</Link>
            </div>
            <div className="container paraAparecer">
            <div className="row RowTelaInicial">
                {habilidades.map((item) => <CardHabilidade key={item.habilidades.id} id={item.habilidades.id} nome={item.habilidades.nome} url={item.habilidades.url} descricao={item.habilidades.descricao} />)}

            </div>
            </div>
        </div>
    )
}
export default HabilidadesRelacionadas