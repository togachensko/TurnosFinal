import "./Pagos.css"
import {httpDelete, httpGet} from "../../../utils/httpFunctions";
import {useEffect, useState} from "react";
import {useAlert} from "react-alert";
import {Link} from "react-router-dom";

function Pagos() {
    const alert = useAlert()
    const [pagos, setPagos] = useState([]);
    const fetchPagos = () => {
        //No olvidar la barra al final de turnos
        httpGet("api/pagos/")
            .then((data) => {
                setPagos(data)
            }).catch((err) => {
                alert.show('Error obtenido los pagos, intente mas tarde!',{
                    type: "error"
                })
            }
        )
    }

    const handleDelete = (id) => {
        httpDelete("api/pagos/" + id)
            .then((res) => {
                alert.show('Eliminado correctamente!', {
                    type: "success"
                })
                fetchPagos();
            })
            .catch(err => alert.show('No se pudo eliminar, intente mas tarde!',{
                type: "error"
            }))
    }
    useEffect(fetchPagos, [])
    return (
        <div className="pagos-contenido">
            <div className="pagos-contenido-tabla">
                <h2>Pagos</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id pago</th>
                        <th>Monto</th>
                        <th>Código de pago</th>
                        <th>ID Turno</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagos.map(pago => {
                        return (
                            <tr key={pago.id}>
                                <td className="pagos-td-horario">{pago.id}</td>
                                <td>${pago.monto}</td>
                                <td>{pago.payment_code}</td>
                                <td>{pago.turno}</td>
                                <td className="pagos-td-edit">
                                    <Link to={"/perfil/pagos/" + pago.id} test={"asd"}><i className="fas fa-edit"></i> </Link>
                                </td>
                                <td onClick={() => {handleDelete(pago.id)}} className="pagos-td-delete"><i className="fas fa-trash-alt"></i></td>
                            </tr>
                        )
                    })}
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Pagos;