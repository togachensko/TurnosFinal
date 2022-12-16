import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Perfil from "./perfil/Perfil";
import Home from './Home/Home';
import Inicio from './Login/Login';
import Login from './Login/Login';
import Singin from './sing-in/Sing-in';
import Ssignin from './S-signin/S-signin';
import RegistroPacientes from './RegistroPacientes/RegistroPacientes';
import AuthRoute from "./AuthRoute";
import ConfirmacionTurno from "./ConfirmacionTurnos/ConfirmacionTurno"

function App() {
  return (
      <Router>
          <Switch>
            <AuthRoute exact={false} path={`/perfil`}>
                <Perfil />
            </AuthRoute>
            <Route path="/Singin">
              <Singin/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/Ssignin">
              <Ssignin/>
            </Route>
            <Route path="/confirmacionTurno/:turnoid">
              <ConfirmacionTurno/>
            </Route>
            <Route path="/RegistroPacientes/:doctorid">
              <RegistroPacientes/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
