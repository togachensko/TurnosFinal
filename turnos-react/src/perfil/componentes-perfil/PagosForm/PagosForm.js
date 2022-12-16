import "./PagosForm.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {httpGet, httpPut} from "../../../utils/httpFunctions";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom"

function PagosForm(props) {
    const alert = useAlert()
    const {id} = useParams()
    const [pago, setPago] = useState({})
    let history = useHistory();

    const getPago = (id) => {
        httpGet("api/pagos/" + id).then((res) => {
            setPago(res)
        }).catch((err) => alert.show('No se pudo obtener el pago',{
            type: "error"
        }))
    }

    const editPago = (e) => {
        e.preventDefault()
        httpPut("api/pagos/" + id + "/", pago).then((res) => {
            history.push('/perfil/pagos')
            alert.show('Pago modificado correctamente',{
                type: "success"
            })
        }).catch((err) => alert.show('No se pudo modificar, intente mas tarde!',{
            type: "error"
        }))

    }

    useEffect(() => getPago(id), [])

    return (
        <div className="pagosform-contenido">
            <h1 className="pagosform-h1">Modificar pago</h1>
            <form className="center"  onSubmit={(e) => editPago(e)}>
                <div className="pagosform-input-grupo">
                    <label htmlFor="pagosform-monto">Monto</label>
                    <input id="pagosform-monto" value={pago.monto || "Sin datos"}
                           onChange={(e) => setPago({...pago, monto:e.target.value})}/>
                </div>
                <div className="pagosform-input-grupo">
                    <label htmlFor="pagosform-codigo">Código de pago </label>
                    <input id="pagosform-codigo" value={pago.payment_code || "Sin datos"}
                           onChange={(e) => setPago({...pago, payment_code:e.target.value})}/>
                </div>
                <button type="submit">Modificar</button>
            </form>
        </div>
    )
}

export default PagosForm;