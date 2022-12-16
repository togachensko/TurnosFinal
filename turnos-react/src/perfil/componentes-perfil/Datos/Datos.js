import "./Datos.css";
import {Link, useHistory} from "react-router-dom";
import {httpDelete} from "../../../utils/httpFunctions";
import {useAlert} from "react-alert";

function Datos(props) {
    const history = useHistory()
    const alert = useAlert()
    let user = props.user
    const delete_user = (e) => {
        e.preventDefault()
        httpDelete("api/deleteuser").then((res) => {
            alert.show('Eliminado',{
                type: "success"
            })
            history.push("/")
        }).catch((error) => {
            alert.show('No se pudo eliminar',{
                type: "error"
            })
        })
    }
    return (
        <div className="datos-contenido">
            <h2>Datos personales</h2>
            <ul>
                <li><b>Nombre de usuario: </b>{user.username}</li>
                <li><b>Nombre:</b>{user.first_name}</li>
                <li><b>Apellido:</b>{user.last_name}</li>
                <li><b>Email:</b>{user.email}</li>
            </ul>
            <div className="botones-datos">
                <Link id="boton-modificar-datos" to="/perfil/datos/form">Modificar Datos</Link>
                <button onClick={(e) => delete_user(e)} id="boton-eliminar-datos" to="">Eliminar Cuenta</button>
            </div>
        </div>
    )
}

export default Datos;