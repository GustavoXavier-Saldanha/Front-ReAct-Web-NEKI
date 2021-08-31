import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagina404 from "./screen/404";
import CadastroUsuario from "./screen/CadastroUsuario";
import TelaHabilidades from "./screen/Home"
import NovaHabilidade from "./screen/CadastroHabilidade"
import EditaHabilidade from "./screen/EdicaoHabilidade"
import Login from "./screen/login";
import Navbar from "./components/navbar/index";
import HabilidadeEspecifica from "./screen/HabilidadeEspecifica"


function App() {
  const [token, setToken] = useState("");
  const onLogin = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  useEffect(() => {
    const tokenAntigo = localStorage.getItem('token')
    if (tokenAntigo) {
      setToken(tokenAntigo)
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} aoLogout={logout}  />
        <div className="container">

        <Switch> 
          
          {/* <Route exact path="/">
                <Home />
          </Route> */}

          <Route exact path="/login">
              <Login onLogin={onLogin} />
          </Route>


          <Route exact path="/habilidades">
              <TelaHabilidades />
          </Route>

          <Route exact path="/cadastrousuario">
              <CadastroUsuario />
          </Route>
          <Route exact path="/editahabilidade">
              <EditaHabilidade />
          </Route>
 
          <Route exact path="/cadastrohabilidade">
              <NovaHabilidade />
          </Route>
     
          <Route exact path="/habilidade/:id">
              <HabilidadeEspecifica />
          </Route>
          <Route>            
              <Pagina404 />
          </Route>
        </Switch> 

        </div>        
      </BrowserRouter>
    </div>
  );
}

export default App;