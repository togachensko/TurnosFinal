import "./Sing-in.css"
import {useEffect, useState} from "react";
import {httpPost, httpPostRegisterUser} from "../utils/httpFunctions";
import { useAlert } from "react-alert";
import {useHistory} from "react-router-dom"
//<a href="Ssignin" class="botons">Registrarme</a>

function Singin () {
    const history = useHistory()
    const alert = useAlert ()
    const [ name, setName] = useState("")
    const [ lastname, setLastname] = useState("")
    const [ username, setUsername] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const registerUser = (e) => {
        e.preventDefault()
        httpPost ("api/register/", {
            username:username,
            password:password,
            last_name:lastname,
            email:email,
            first_name:name
        }, false).then(res => {
            alert.show('Se ha creado el usuario ',{
                type: "success"
            })
            history.push("/Ssignin")

        }
        ).catch(err=> alert.show('No se ha podido crear el usuario',{
            type: "error"
        }))
    }
    return ( 
    <div className = "general">
        
    <div class="center-singin">
    <form class="center-singin" onSubmit={(e)=>registerUser(e)}>
        <h1 className="titulo-signin">Ingrese sus datos</h1>
        <div class="input-grupo" >
            <label className="label-signin" for="nombre">Nombre</label>
            <input id="nombre" placeholder="Nombre" value = {name}
             onChange={(e) => setName(e.target.value)}/> 
        </div>
        <div class="input-grupo">
            <label className="label-signin" for="apellido">Apellido </label>
            <input id="apellido" placeholder="Apellido"value = {lastname}
             onChange={(e) => setLastname(e.target.value)}/> 
        </div>
        <div class="input-grupo">
            <label  className="label-signin" for="Nombre de usuario">Nombre de usuario </label>
            <input id="Nombre de usuario" placeholder="Nombre de usuario" value = {username}
             onChange={(e) => setUsername(e.target.value)}/> 
        </div> 
        
        <div class="input-grupo">
         <label className="label-signin" for="E-mail">E-mail </label>
         <input id="E-mail" placeholder="E-mail" value = {email}
             onChange={(e) => setEmail(e.target.value)}/> 
     </div>
        <div class="input-grupo">
            <label className="label-signin" for="password">Contraseña </label>
            <input type="password" id="password" placeholder="Contraseña" value = {password}
             onChange={(e) => setPassword(e.target.value)}/> 
        </div>
        
        <button type= "submit" className="botons-signin" >Registrarme</button>
    </form>
 </div>
 </div>

    )
}
export default Singin