
import {Link} from "react-router-dom";
import "./Home.css"
import header from "./header.jpg"

function Home(){
    return(
        <div id="home-container">
            <nav className="home-navbar">
                <div className="container">
                    <a className="home-nav-link " aria-current="page" href="#home-caracteristicas">Características</a>
                    <a className="home-nav-link" href="#home-historia">Guía</a>
                    <Link className="home-nav-link-button" id="home-ingresar"
                       to="/login" >Ingresar</Link>
                </div>
            </nav>
            <header>
                <div className="container-fluid">
                    <div id="gif-row" className="row">
                        <div id="home-img" className="col">
                            <h1 id="home-titulo">MIS TURNOS</h1>
                            <p id="gif-p">Administrá tus turnos facilmente</p>
                            <Link to="/Singin">
                                <button id="home-img-btn" type="" className="">REGISTRARME
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className="home-main">
                <div className="" id="home-caracteristicas">
                    <div className="">
                        <h2 className="">PROYECTO</h2>
                        <div className="">
                            <h2 className="">SOBRE MISTURNOS.COM</h2>
                            <p>Nuestra plataforma ofrece la oportunidad de que gestiones tus turnos vos mismo de una
                                menera fácil y práctica</p>
                            <p>Brinda informacion detallada sobre tus turnos y posee un registro sobre los pagos</p>
                            <h3 className="">Características:</h3>
                            <ul>
                                <li>Perfil con informacion resumida</li>
                                <li>Gestor de turnos donde puedes habilitar, modificar y eliminarlos</li>
                                <li>El paciente sólo necesita el link y puede reservar el turno rápidamente</li>
                                <li>Soporte mobile.</li>
                            </ul>
                        </div>
                        <div className="">
                        </div>
                    </div>
                </div>

                <div className="home-texto-container">
                    <hr className=""/>
                        <div id="home-historia" className="">
                            <div className="">
                            </div>
                            <div id="home-historia-col" className="">
                                <h2 className="">GUIA DE USO</h2>
                                <ol>
                                    <li>Te creás una cuenta e ingresas.</li>
                                    <li>Habilitás los turnos en los días y horarios que vos quieras</li>
                                    <li>Le mandas el link de registro a tus pacientes</li>
                                    <li>El paciente registra su turno y listo!</li>
                                </ol>
                            </div>
                        </div>
                </div>

            </main>
        </div>
          
            )
} 
export default Home ;