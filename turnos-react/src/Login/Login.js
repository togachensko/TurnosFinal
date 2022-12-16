import {useEffect, useState} from "react";
import "./Login.css"
import { httpPost } from "../utils/httpFunctions";
import { useAlert } from "react-alert";
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom";

function Login() {
    const history = useHistory()
    const alert = useAlert()
    const [ username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const login = (e) => {
        e.preventDefault()
        httpPost('api/login/', {username: username, password: password}, false)
            .then((res) => {
            
                localStorage.setItem('token', res.data.access)
                 history.push('/perfil')
            }).catch((err)=> alert.show('No se ha podido loguear',{
                type: "error"

            }))
      }
    
    return (

        <div className="general">
            <div className="center-login">
                <form className="center-login" onSubmit={(e) => login(e)}>
                    <h1>Ingrese sus datos</h1>
                    <div className="input-grupo">
                        <label for="userName">Nombre de usuario</label>
                        <input id="userName" placeholder="Nombre de usuario" value={username}
                            onChange={(e) => setUsername(e.target.value)}  />
                    </div>
                    <div className="input-grupo">
                        <label for="password">Contraseña </label>
                        <input type="password" id="password" placeholder="Contraseña" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type= "submit" className="login-botons" >Loguearse</button>
                </form>
            <div className="register">
                <p>Si aun no se ha registrado 
                <Link  to="/Singin"> Registrese aqui</Link>
                </p>
                </div>
            </div>
        </div>
    )
}
export default Login