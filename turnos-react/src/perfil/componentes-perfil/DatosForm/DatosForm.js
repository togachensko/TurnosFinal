import "./DatosForm.css"
import {useEffect, useState} from "react";
import {httpDelete, httpPatch} from "../../../utils/httpFunctions";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";

function DatosForm(props) {
    const alert = useAlert()
    const history = useHistory()
    const [username, setUsername] = useState(props.user.username);
    const [first_name, setFirstName] = useState(props.user.first_name);
    const [last_name, setLast_name] = useState(props.user.last_name);
    const [email, setEmail] = useState(props.user.email);

    const update_user = (e) => {
        e.preventDefault();
        let data = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email
        }
        httpPatch("api/updateuser/", data).then((res) => {
            alert.show('Modificado correctamente',{
                type: "success"
            })
            history.push("/perfil/datos")
        }).catch((error) => {
            alert.show('No se pudo modificar',{
                type: "error"
            })
        })
    }


    return (
        <div className="datosform-contenido">
            <h1 className="datosform-h1">Modificar datos</h1>
            <form className="center" onSubmit={(e) => update_user(e)}>
                <div className="datosform-input-grupo">
                    <label htmlFor="datosform-nombreusuario">Nombre de Usuario</label>
                    <input id="datosform-nombreusuario" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="datosform-input-grupo">
                    <label htmlFor="datosform-nombre">Nombre</label>
                    <input id="datosform-nombre" value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="datosform-input-grupo">
                    <label htmlFor="datosform-apellido">Apellido </label>
                    <input id="datosform-apellido" value={last_name} onChange={(e) => setLast_name(e.target.value)}/>
                </div>
                <div className="datosform-input-grupo">
                    <label htmlFor="datosform-email">Apellido </label>
                    <input type="email" id="datosform-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button>Modificar</button>
            </form>
        </div>
    )
}

export default DatosForm;