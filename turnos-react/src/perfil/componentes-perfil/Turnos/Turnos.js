import "./Turnos.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {httpDelete, httpGet} from "../../../utils/httpFunctions";
import {getToday} from "../../../utils/helpers";
import {Link} from "react-router-dom";
import {useAlert} from "react-alert";

function Turnos() {
    const alert = useAlert()
    const [turnos, setTurnos] = useState([]);
   // const [diaSeleccionado, setDiaSeleccionado] = useState(getToday())
    const fetchTurnos = () => {
        //No olvidar la barra al final de turnos
        httpGet("api/turnos/")
            .then((data) => {
                for(let day of data) {
                    day.horario = new Date(day.hour).toLocaleDateString() + " "
                    day.horario += new Date(day.hour).toLocaleTimeString() + " hs"
                }
                setTurnos(data)
            }).catch((err) => {
                alert.show('Error obtenido los turnos, intente mas tarde!',{
                    type: "error"
                })
            }
        )
    }

    const handleDelete = (id) => {
        httpDelete("api/turnos/" + id)
            .then((res) => {
                alert.show('Eliminado correctamente!', {
                    type: "success"
                })
                fetchTurnos();
            })
            .catch(err => alert.show('No se pudo eliminar, intente mas tarde!',{
                type: "error"
            }))
    }
    //UseEffect tiene dos argumentos, el primero una funcion (referencia, no el valor de retorno) que se ejecuta
    //El segundo es un array de dependencias, que son variables que React observa y cuando cambie alguna de ellas
    //va a ejecutarse la primer funcion.
    //Si pasamos un array vacio para que solamente se corra al principio
    // Si no ponemos nada , cada cambio que se produzca en el componente se corre la funcion (costoso)
    useEffect(fetchTurnos, [])
    return (
        <div className="turnos-contenido">
            <div className="turnos-contenido-tabla">
                <h2>Turnos</h2>
                {/*HACER ESTO SI QUEDA TIEMPO*/}
                {/*<div className="turnos-form-grupo">*/}
                {/*    <label htmlFor="fechas-turnos">Seleccionar Fecha</label>*/}
                {/*    <input id="fechas-turnos" type="date"/>*/}
                {/*</div>*/}
                {/*<h6>Turnos para el {today}</h6>*/}
                <table>
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Horario</th>
                        <th>Paciente</th>
                        <th>Descripción</th>
                        <th>Pagado</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {turnos.map(turno => {
                        return (
                            <tr key={turno.id}>
                                <td className="turnos-td-horario">{turno.id}</td>
                                <td className="turnos-td-horario">{turno.horario}</td>
                                <td>{turno.patient_name + " " + turno.patient_lastName}</td>
                                <td>{turno.description}</td>
                                <td>{turno.is_payed ? "SI" : "NO"}</td>
                                <td className="turnos-td-edit">
                                    <Link to={"/perfil/turnos/" + turno.id} test={"asd"}><i className="fas fa-edit"></i> </Link>
                                </td>
                                <td onClick={() => {handleDelete(turno.id)}} className="turnos-td-delete"><i className="fas fa-trash-alt"></i></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Turnos;