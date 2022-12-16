import React from "react";
import './RegistroPacientes.css'
import "../perfil/componentes-perfil/Turnos/Turnos.css";
import {httpGet, httpGetSinLogin, httpDelete, httpPut, httpPatch, httpPost} from "../utils/httpFunctions";
import {useAlert} from "react-alert";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getToday} from "../utils/helpers";
import {Link} from "react-router-dom";
import Turnos from "../perfil/componentes-perfil/Turnos/Turnos";

function RegistroPacientes(props) {
    const history = useHistory()
    const {doctorid} = useParams()
    const alert = useAlert()
    const [registropacientes, setTurnos] = useState([])
    const [turno, setTurno] = useState({})
    // const [pago, setPago] = useState({})
    const [cantidadTurnos, setCantidadTurnos] = useState(0)
    const [id, setid] = useState()
    const [turnoseleccionado, setTurnoSeleccionado] = useState({})

    const fetchTurnos = () => {
        ///No olvidar la barra al final de turnos
        httpGet("api/turnosdisponibles/?doctor_id=" + doctorid, false)
            .then((data) => {
                for (let day of data) {
                    day.horario = new Date(day.hour).toLocaleDateString() + " "
                    day.horario += new Date(day.hour).toLocaleTimeString() + " hs"
                }
                setTurnos(data)
                setCantidadTurnos(data.length)
            }).catch((err) => {
                alert.show('Error obtenido los turnos, intente mas tarde!', {
                    type: "error"
                })
            }
        )
    }

    const editTurno = (e) => {
        e.preventDefault()
        httpPatch("api/reservarturno/?id=" + id, turno, false).then((res) => {
            alert.show('Turno modificado correctamente', {
                type: "success"
            })
            history.push("/confirmacionTurno/" + id )
        }).catch((err) => alert.show("Error", {
            type: "error"
        }))
        // let pagopost = pago
        // pagopost.turno = id

        // if (turno.is_payed) {
        //     httpPost("api/pagos/", pagopost, false).then((res) => {
        //         alert.show('Pago modificado correctamente', {
        //             type: "success"
        //         })
        //     }).catch((err) => alert.show("Error", {
        //         type: "error"
        //     }))
        // }

    }

    useEffect(fetchTurnos, []);
    // const mostrarPago = (e) => {
    //     let test = e.target.value
    //     if (test == "true") {
    //         setTurno({...turno, is_payed: true})
    //     } else {
    //         setTurno({...turno, is_payed: false})
    //     }
    // }

    return (
        <div className="registropaciente-contenedor">
            <title>Página Turnos</title>
            <div>
                <h1 className="registropaciente-custom_title registropaciente-center">
                    REGISTRO DE TURNOS
                </h1>
            </div>
            <div>
                <h2 className="registropaciente-tit">
                    Complete el siguiente formulario
                </h2>
                <form className="registropaciente-tit" onSubmit={(e) => editTurno(e)} name="formu">
                    <div className="registropaciente-input-grupo">
                        <label htmlFor="nombre">Nombre:</label>
                        <input required id="nombre" value={turno.patient_name ? turno.patient_name : ""}
                               placeholder="Nombre"
                               onChange={(e) => setTurno({...turno, patient_name: e.target.value})}/>
                    </div>
                    <div className="registropaciente-input-grupo">
                        <label htmlFor="apellido">Apellido:</label>
                        <input required id="apellido" value={turno.patient_lastName ? turno.patient_lastName : ""}
                               placeholder="Apellido"
                               onChange={(e) => setTurno({...turno, patient_lastName: e.target.value})}/>
                    </div>
                    <div className="registropaciente-input-grupo">
                        <label htmlFor="numero">Número celular:</label>
                        <input required id="numero" value={turno.patient_phone ? turno.patient_phone : ""}
                               placeholder="Numero"
                               onChange={(e) => setTurno({...turno, patient_phone: e.target.value})}/>
                    </div>
                    <div className="registropaciente-input-grupo">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input required id="email" value={turno.patient_email ? turno.patient_email : ""}
                               placeholder="Mail"
                               onChange={(e) => setTurno({...turno, patient_email: e.target.value})}/>
                    </div>

                    {/* <div className="registropaciente-input-grupo">*/}
                    {/*   <label for="pagoturno">¿Pagar ahora?</label>*/}
                    {/*     <select required name="Pago" id='pagoturno' className="botons" value={turno.is_payed}*/}
                    {/*       onChange={(e) => mostrarPago(e)}>*/}
                    {/*       /!* /* onChange={optionpago}> *!/*/}
                    {/*         <option>SELECCIONAR</option>*/}
                    {/*         <option value={true}>SI</option>*/}
                    {/*         <option value={false}>NO</option>*/}
                    {/*     </select>    */}
                    {/*</div>*/}


                    {/*<div>*/}
                    {/*    <div className="registropaciente-input-grupo">*/}
                    {/*        <label for="pagos">Monto:</label>*/}
                    {/*        <input disabled={turno.is_payed ? null : true} id="pagos"*/}
                    {/*               value={pago.monto ? pago.monto : ""}*/}
                    {/*               placeholder="$"   {document.getElementById("pagoturno").value} */}
                    {/*               onChange={(e) => setPago({...pago, monto: e.target.value})}/>*/}
                    {/*    </div>*/}

                    {/*    <div className="registropaciente-input-grupo">*/}
                    {/*        <label for="pagos">Codigo Pago</label>*/}
                    {/*        <input required disabled={turno.is_payed ? null : true} name="pagos" id="pagos"*/}
                    {/*               value={pago.payment_code ? pago.payment_code : ""}*/}
                    {/*               placeholder="- - - -"   {document.getElementById("pagoturno").value} */}
                    {/*               onChange={(e) => setPago({...pago, payment_code: e.target.value})}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="registropaciente-input-grupo">
                        <label htmlFor="fechaturno">Fecha de turnos disponibles</label>
                        <select required name="Fecha" id='fechaturno' className="botons" value={turno.hour}
                                onChange={(e) => setid(e.target.value)}>
                            <option value="">SELECCIONAR</option>
                            {registropacientes.map(turno => {
                                if (turno.is_taken == false) {
                                    return (
                                        <option key={turno.id} value={turno.id}> {turno.horario} </option>
                                    )
                                }
                            })}
                        </select>
                        {turno.is_taken = true}
                    </div>
                    <button type="submit"> Enviar formulario</button>
                </form>
            </div>
        </div>
    );
}

export default RegistroPacientes;