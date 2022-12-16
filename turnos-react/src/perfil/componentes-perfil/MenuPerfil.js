import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import "./MenuPerfil.css"

function MenuPerfil(props){
    const history = useHistory()
    //Recibe en las props el estado del padre visibilidadMenu para determinar la clase de css a aplicar y asi mostrar o no el menu.
    //Recibe la funcion en las props para cerrar el menu, que es manejado por el estado del elemento padre
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        history.push("/")
    }
    return(
        <div id="menu-perfil" className={"menu-container " + props.visibilidadMenu}>
            <div className="menu">
                <h3 className="menu-titulo">Menu</h3>
                <Link to="/perfil/" className="menu-button" onClick={props.handleCerrarMenu}>
                    <i className="fas fa-chart-line"></i> <h5>Dashboard</h5>
                </Link>
                <Link to="/perfil/turnos" className="menu-button" onClick={props.handleCerrarMenu}>
                    <i className="far fa-calendar-alt"></i> <h5>Turnos</h5>
                </Link>
                <Link to="/perfil/horarios" className="menu-button" onClick={props.handleCerrarMenu}>
                    <i className="far fa-clock"></i> <h5>Horarios</h5>
                </Link>
                <Link to="/perfil/pagos" className="menu-button" onClick={props.handleCerrarMenu}>
                    <i className="fas fa-wallet"></i> <h5>Pagos</h5>
                </Link>
                <Link to="/perfil/datos" className="menu-button" onClick={props.handleCerrarMenu}>
                    <i className="fas fa-window-maximize"></i> <h5>Datos</h5>
                </Link>
                <button onClick={(e) => logOut(e)} className="menu-button">
                    <i className="fas fa-times-circle"></i> <h5>Salir</h5>
                </button>
            </div>
        </div>
    )
}

export default MenuPerfil;