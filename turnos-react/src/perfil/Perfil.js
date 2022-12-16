import './Perfil.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NavPerfil from "./componentes-perfil/NavPerfil";
import MenuPerfil from "./componentes-perfil/MenuPerfil";
import Turnos from "./componentes-perfil/Turnos/Turnos";
import Dashboard from "./componentes-perfil/Dashboard/Dashboard";
import Horarios from "./componentes-perfil/Horarios/Horarios";
import Pagos from "./componentes-perfil/Pagos/Pagos";
import Datos from "./componentes-perfil/Datos/Datos";
import DatosForm from "./componentes-perfil/DatosForm/DatosForm";
import {useState} from "react";
import TurnosForm from "./componentes-perfil/TurnosForm/TurnosForm";
import {httpGet} from "../utils/httpFunctions";
import PagosForm from "./componentes-perfil/PagosForm/PagosForm";

function Perfil() {
    //Usamos el state para ir cambiando la visiblidad del menu en version mobile
    //Cuando se invoca esta funcion handleCallback cambia el estado de visible a hidden y viceversa
    //El state es usado por el elemento hijo MenuPerfil para determinar si tiene o no que ser visible
    const [menuVisible, setMenuVisible] = useState("hidden");
    const [user, setUser] = useState({});

    const fetchUser = () => {
        httpGet("api/me").then(res => {
            setUser(res)
        }).catch((err) => {
            "Error cargando datos del usuario"
        })

    }
    function handleCallback() {
        menuVisible === "hidden" ? setMenuVisible("visible") : setMenuVisible("hidden");
    }
    //Esta funcion permite que cuando se invoque en el elemento hijo menu, al seleccionar una opcion se cierre.
    function handleCerrarMenu() {
        setMenuVisible("hidden");
    }
    useState(fetchUser, []);
    return (
        <div>
            <NavPerfil handleClick={handleCallback} user={user}/>
            <section className="main">
                <MenuPerfil visibilidadMenu={menuVisible} handleCerrarMenu={handleCerrarMenu}/>
                <Switch>
                    <Route path="/perfil/turnos/:id">
                        <TurnosForm user={user}/>
                    </Route>
                    <Route path="/perfil/pagos/:id">
                        <PagosForm user={user}/>
                    </Route>
                    <Route path="/perfil/turnos">
                        <Turnos user={user}/>
                    </Route>
                    <Route path="/perfil/horarios">
                        <Horarios user={user}/>
                    </Route>
                    <Route path="/perfil/pagos">
                        <Pagos user={user}/>
                    </Route>
                    <Route path="/perfil/datos/form">
                        <DatosForm user={user}/>
                    </Route>
                    <Route path="/perfil/datos">
                        <Datos user={user}/>
                    </Route>
                    <Route path="/perfil/">
                        <Dashboard user={user}/>
                    </Route>
                </Switch>
            </section>
        </div>
    )
}

export default Perfil;