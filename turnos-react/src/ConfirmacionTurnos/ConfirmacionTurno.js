import {useEffect, useState} from "react";
import {httpGet, httpPatch, httpPost} from "../utils/httpFunctions";
import "./ConfirmarPago.css"
import {useParams} from "react-router-dom";
import {useAlert} from "react-alert";



function ConfirmacionPago() {
    const alert = useAlert()
    const [preferenceId, setPreferenceId] = useState(null);
    const [turno, setTurno] = useState();
    const {turnoid} = useParams()
    const [pago, setPago] = useState()

    const pagarTurno = () => {
        let pagopost = {
            monto: turno.price,
            payment_code: 123123,
            turno: turno.id
        }
        console.log(pagopost)
        httpPost("api/pagos/", pagopost, false).then((res) => {
            alert.show('Pago modificado correctamente', {
                type: "success"
            })
        }).catch((err) => alert.show("Error 1", {
            type: "error"
        }))

        httpPatch("api/reservarturno/?id=" + turno.id, {...turno, is_payed: true}, false).then((res) => {
            alert.show('Turno modificado correctamente', {
                type: "success"
            })
        }).catch((err) => alert.show("Error 2", {
            type: "error"
        }))
    }



    const fetchTurnos = () => {
        ///No olvidar la barra al final de turnos
        httpGet("api/getturno/?turno_id=" + turnoid, false)
            .then((data) => {
                console.log(data)
                setTurno(data);
            }).catch((err) => {
                alert.show('Error obteniendo los turnos, intente mas tarde!', {
                    type: "error"
                })
            }
        )
    }
    useEffect(fetchTurnos, []);


    useEffect(() => {
        if(turno) {
            let preferencia = {
                titulo: "Turno",
                precio: turno.price
            }
            // luego de montarse el componente, le pedimos al backend el preferenceId
            httpPatch("api/generarlpreferencia/", preferencia, false).then((order) => {
                console.log(order)
                setPreferenceId(order.id);
            });
        }
    }, [turno]);

    useEffect(() => {
        if (preferenceId) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src =
                'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
            script.setAttribute('data-preference-id', preferenceId);
            const form = document.querySelector(".botonpago");
            form.appendChild(script);
        }
    }, [preferenceId]);

    return (
        <div className="confpagos-contenedor">
            <div className= "confpagos-tit confpagos-center">
            <h1>Turno confirmado correctamente</h1>
            <h2>Datos del turno:</h2>
            <ul >
                <li className= "confpagos-li">Doctor: {turno?turno.doctor.last_name + " " + turno.doctor.first_name :"Cargando"}</li>
                <li className= "confpagos-li">Horario: {turno?turno.hour:"Cargando"}</li>
                <li className= "confpagos-li" >Nombre paciente: {turno?turno.patient_name:"Cargando"}</li>
                <li className= "confpagos-li" >Apellido paciente: {turno?turno.patientlastName:"Cargando"}</li>
                <li className= "confpagos-li">Telefono paciente: {turno?turno.patient_phone:"Cargando"}</li>
            </ul>
            <h2>Puede abonar el turno haciendo click en pagar!</h2>
                <h4>Costo: {turno?turno.price:"Cargando"}</h4>
                <form onClick={pagarTurno} className="botonpago" method="GET"></form>
                </div>
        </div>
    )
}

export default ConfirmacionPago;