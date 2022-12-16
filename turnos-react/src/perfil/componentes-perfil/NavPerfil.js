import {Link} from "react-router-dom";
import './NavPerfil.css';
import {useEffect, useState} from "react";
import {httpGet} from "../../utils/httpFunctions";

// El boton hamburguesa invoca una funcion que obtiene a traves de las props llamado handleClick
// El funcionamiento de dicha funcion esta detallado en el componente padre que es Perfil.js
function NavPerfil(props) {
    const user = props.user;
    return (
        <nav className="perfil-navbar">
            <Link to="/perfil" href="#">Perfil de Usuario</Link>
            <Link to="/perfil" id="nav-usuario" href="#">{user.username ? user.username : "Cargando"}</Link>
            <div id="menu-icono" href="" onClick={props.handleClick}><i className="fas fa-bars"></i></div>
        </nav>
    )
}

export default NavPerfil;