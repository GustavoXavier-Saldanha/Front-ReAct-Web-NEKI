import { useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../components/http'
import './style.css'
import MensagemSucesso from '../../components/Mensagens/mensagemSucces'
import MensagemError from '../../components/Mensagens/mensagemError';

const CadastroUsuario = () => {

    const [nomeUsuario, setNomeUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')


    const [mensagem, setMensagem] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    const cadastrar = (evento) => {


        evento.preventDefault()
        const usuario= {
            nome: nomeUsuario,
            email: emailUsuario,
            senha: senha,
        }

         setNomeUsuario('')
         setEmailUsuario('')
         setSenha('')

        http.post('usuario/cadastrar', usuario)
            .then(response => {
                console.log(response.data)
                setMensagemSucesso('Usuario Cadastrado com sucesso!')
            })
            .catch(erro => {
                console.log('Algo deu errado')
                setMensagem('Erro ao cadastrar um novo Usuario!')
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
        
        <h2 className="hTxtr">Cadastro da Conta</h2>
        <div className="row">
            <div className="col-12 col-lg-8">

                <form className="inputsCadastro" onSubmit={cadastrar}>

                    
                    <div className="form-group ">
                        {mensagem && <MensagemError msg={mensagem} />}
                        {mensagemSucesso && <MensagemSucesso msg={mensagemSucesso} />}
                    </div>

                    <div className="form-group mt-2">
                        <label>Nome</label>
                        <input className="form-control " placeholder="Nome do Usuario" required type="text" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Email </label>
                        <input className="form-control" placeholder="exemplo@exemplo.com" required type="text" value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Senha </label>
                        <input className="form-control" placeholder="Sua senha" required type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>


                    <div className="form-group  d-flex justify-content-center">
                        <button className="btn  btn-primary mt-4 block botaoLogin">Cadastrar</button>
                    </div>
                    <div className="form-group  d-flex justify-content-center mt-3">
                            <label className="nav-item">
                                Voltar para <Link className="loginBtn" to="/login">Login ← </Link>
                            </label>
                        </div>

                </form>
            </div>
        </div>
        </div>
    )



}

export default CadastroUsuario;