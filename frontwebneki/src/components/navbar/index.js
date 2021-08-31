import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import img from "./logo-neki-oficial-1596x452.png"
import './style.css'


const NavBar = ({ token, aoLogout}) => {

  const history = useHistory();


  const logout = () => {
    history.push('/login')
    aoLogout()
  }

  const Itens = () => {
    if (token) {
      return (
        <>

          

          <li className="nav-item">
              <Link className="nav-link text-dark navtxt" to="/habilidades">Início</Link>
            </li>

            <form className="nav-link text-white navtxt" onClick={logout}>
            <a className="nav-link navtxt" href="/login" >
              Logout
            </a>
          </form>

        </>
      )
    }
    else {


      return <>
        <li className="nav-item ">
          <Link className="nav-link text-white navtxt" to="/login">Login</Link>
        </li>

      </>
    }
  }


  return (

    <nav className="navbar navbar-light bg-light justify-content-between navbar-expand-lg ">
      

        <Link className="nav-link text-dark" to="/habilidades"><img src={img} alt="Imagem Logo" /></Link>

      <div className="form-inline w-75 p-3">
        <div className="navBarHome">
          <ul className="navbar-nav mr-auto">

            {Itens()}


          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

