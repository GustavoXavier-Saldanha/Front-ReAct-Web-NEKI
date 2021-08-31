import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../components/http'
import { useHistory } from "react-router-dom";
import './style.css'

const LogIn = ({ onLogin }) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const history = useHistory();

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
                history.push('/')
            }).catch(erro => {
                console.log(erro)
               
            })

        setEmail('')
        setSenha('')
    }

    useEffect(() => {
        let user = localStorage.getItem('user')
        console.log(user)

    }, [])



    // function mostrarOcultarSenha(){
    //     var senha = document.getElementById("senha");

    //     if( senha.type === "password"){
    //         senha.type = "text"
    //     }else{
    //         senha.type = "password"
    //     }
    // }
    // onClick={mostrarOcultarSenha()}




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
                        <div className="form-group mt-3">
                            <label>E-mail:</label>
                            <input className="form-control" type="text" value={email} required onChange={manipuladorEmail} placeholder="example@gmail.com" />
                        </div>
                        <div className="form-group mt-3">
                            <label>Senha:</label>
                            <div className="input-group">
                                <input className="form-control inputSenha" id="senha" type="password" value={senha} placeholder="Digite sua senha:" required onChange={manipuladorSenha}/>
                                <button className="btnSenha" id="btnSenha" ><i className="fas fa-eye"></i></button>
                            </div>
                       
                        </div>
                        
                        <div className="form-group  d-flex justify-content-center">
                            <button onClick={efetuarLogin} className="btn  btn-primary mt-4 block botaoLogin">Entrar</button>
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