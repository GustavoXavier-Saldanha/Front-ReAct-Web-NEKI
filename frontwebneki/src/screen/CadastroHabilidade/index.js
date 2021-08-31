import http from "../../components/http"
import { useState } from "react"
import './style.css'
import MensagemSucesso from '../../components/Mensagens/mensagemSucces'
import MensagemError from '../../components/Mensagens/mensagemError';

const NovaHabilidade
 = () => {

  const [nome, setNome] = useState('')
  const [url, setUrl] = useState('')
  const [descricao, setDescricao] = useState('')

  
  const [mensagem, setMensagem] = useState('')
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  const salvar = (evento) => {
    evento.preventDefault()
    const habilidade = {
      nome: nome,
      url: url,
      descricao: descricao,
      
    }
    // setNome('')
    // setUrl('')
    // setDescricao('')

    console.log(habilidade)
    http.post('habilidade/cadastro', habilidade)
      .then(response => {
            console.log(response.data)
             setMensagemSucesso('Habilidade adicionada com sucesso!')
            })
            .catch(erro => {
                console.log('Algo deu errado')
                setMensagem('Erro ao cadastrar uma nova habilidade!')
            })
        setTimeout(() => {
            setMensagem('')
        }, 4000);
        setTimeout(() => {
            setMensagemSucesso('')
        }, 4000);
  }

  return (
    <div className="container align-items-center d-flex justify-content-center flex-column mt-5">
            
    <h2 className="hTxtr">Cadastro Habilidade</h2>
    <div className="row">
        <div className="col-12 col-lg-8">

            <form className="inputsHabilidade" onSubmit={salvar}>

                
                <div className="form-group ">
                    {mensagem && <MensagemError msg={mensagem} />}
                    {mensagemSucesso && <MensagemSucesso msg={mensagemSucesso} />}
                </div>

                <div className="form-group mt-2">
                <label>Nome</label>
                <input className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
        
            <div className="form-group mt-2">
                <label>Descrição</label>
                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-control" />
            </div>

            <div className="form-group mt-2">
                <label>Imagem</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" />
            </div>


                <div className="form-group  d-flex justify-content-center">
                    <button className="btn  btn-primary mt-4 block botaoLogin">Adicionar</button>
                </div>


            </form>
        </div>
    </div>
    </div>

  )

}

export default NovaHabilidade
