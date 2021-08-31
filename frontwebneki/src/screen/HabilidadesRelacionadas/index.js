import http from '../../components/http'
import CardHabilidade from '../../components/Cads'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './style.css'

const HabilidadesRelacionadas = () => {

    const [habilidades, setHabilidades] = useState([])

    const [idHabilidade, setIdHabilidade] = useState([])

    const [url, setUrl] = useState([])
    const [nome, setNome] = useState([])
    const [descricao, setDescricao] = useState([])

    const id = localStorage.getItem('idUsuario');
   
    const usuarioHabilidade = () => {
        http.get(`usuario/${id}`)
        .then(response => {
            console.log((response.data))
            setIdHabilidade(response.data.habilidades)
        })
            .catch(erro => {
                console.log(erro)
            })
    }
    useEffect(() => {
        usuarioHabilidade()
    }, [])




    return (
        <div className='tabela mb-5'>
            <h2>Habilidades Relacionadas:</h2>
            <div className="btn-group me-2" role="group" aria-label="Second group">
                <Link to="/cadastrohabilidade" className="btn btnHabilidade mt-3 block">Adicionar Habilidades</Link>
            </div>
            <div className="container paraAparecer">
            <div className="row RowTelaInicial">
                {habilidades.map((item) => <CardHabilidade key={item.id} id={item.id} nome={item.nome} url={item.url} descricao={item.descricao} />)}

            </div>
            </div>
        </div>
    )
}
export default HabilidadesRelacionadas