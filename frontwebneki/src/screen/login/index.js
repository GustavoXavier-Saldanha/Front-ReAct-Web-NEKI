import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../components/http'
import MensagemError from '../../components/Mensagens/mensagemError';
import { useHistory } from "react-router-dom";
import './style.css'

const LogIn = ({ onLogin }) => {

    const [hide, setHide] = useState(false)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const history = useHistory();

    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        localStorage.removeItem('token')
      }, [])
      
    const efetuarLogin = (e) => {
        e.preventDefault()
        const usuario = {
            email: email,
            senha: senha
        }

        
        http.post('login', usuario)
            .then(response => {


                console.log(response.data);
                localStorage.setItem('idUsuario', response.data.agente.id)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('token', response.data.token)
                onLogin(response.data.token)
                history.push('/habilidades')
            }).catch(erro => {
                console.log(erro)
                setMensagem('Erro ao logar!')
            })
        setTimeout(() => {
            setMensagem('')
        }, 4000);

        setEmail('')
        setSenha('')
    }

    useEffect(() => {
        let user = localStorage.getItem('user')
        console.log(user)

    }, [])

    const manipuladorEmail = (evento) => {
        setEmail(evento.target.value)
    }
    const manipuladorSenha = (evento) => {
        setSenha(evento.target.value)
    }
    return (

        <div className="container align-items-center d-flex justify-content-center flex-column mt-5">
        
            <h1>Login:</h1>
            <div className="row">
                <div className="col-12 col-lg-6">

                    <form className="inputsLogin">
                        <div className="form-group ">
                            {mensagem && <MensagemError msg={mensagem} />}
                        </div>

                        <div className="form-group mt-3">
                            <label>E-mail:</label>
                            <input className="form-control" type="text" value={email} required onChange={manipuladorEmail} placeholder="example@gmail.com" />
                        </div>
                        <div className="form-group mt-3">
                            <label>Senha:</label>
                            <div className="input-group">
                                <input className="form-control inputSenha" id="senha" type={hide ? "text" : "password" } value={senha} placeholder="Digite sua senha:" required onChange={manipuladorSenha}/>
                                <button className="btnSenha" id="btnSenha" onClick={ () => setHide(hidePassword => !hidePassword)} ><i className={ hide ? "fas fa-eye" : "fas fa-eye-slash"}></i></button>
                            </div>
                       
                        </div>
                        
                        <div className="form-group  d-flex justify-content-center">
                            <button onClick={efetuarLogin} className="btn mt-4 block botaoLogin">Entrar</button>
                        </div>

                        <div className="form-group  d-flex justify-content-center mt-3">
                            <label className="nav-item">
                                Ainda não tem uma conta? <Link className="cadastroBtn" to="/cadastrousuario">Cadastre-se</Link>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default LogIn