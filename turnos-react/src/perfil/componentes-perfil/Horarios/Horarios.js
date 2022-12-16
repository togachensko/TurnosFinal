import "./Horarios.css";
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {useEffect, useState} from "react";
import {httpGet, httpPost} from "../../../utils/httpFunctions";
import {makeDateTime} from "../../../utils/helpers";
import {useAlert} from "react-alert";

// Utilizamos la libreria react-day-picker para facilitar la seleccion de dias en qeu se habilitan turnos.
// Utiliza el State para determinar que dias son seleccionados.

// AGREGAR https://react-day-picker.js.org/examples/selected-multiple/
function Horarios(props) {
    const user = props.user;
    const alert = useAlert()
    const [selectedDays, setDay ] = useState({selectedDays: []}); // Generamos el estado para los dias seleccionados
    const [disabledDays, setDisabledDays] = useState("")
    const [turnosDayCount, setTurnosDayCount] = useState(1)
    const [turnosStartHour, setTurnosStartHour] = useState("08:30")
    const [turnosDuration, setTurnosDuration] = useState(30)
    const [price, setPrice] = useState("")
    // Funcion que maneja los dias seleccionados en el estado
    // El primer parametro recibe un dia seleccionado, el segundo parametro es para eliminar la seleccion si se vuelve a presionar sobre el mismo dia
    const handleDayClick = (day, { selected, disabled }) => {
        if (disabled) {
            alert.show('Ya existen turnos en el día seleccionado',{
                type: "error"
            })
            return;
        }
        const selectedDays2 = selectedDays.selectedDays;

        if (selected) {
            const selectedIndex = selectedDays2.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays2.splice(selectedIndex, 1);
        } else {
            selectedDays2.push(day);
        }
        setDay({ selectedDays: selectedDays2 })
    }

    const createTurnos = async (e) => {
        try {
            e.preventDefault()
            if(selectedDays.selectedDays.length === 0) {
                alert.show("Debe seleccionar un dia",{
                    type: "info"
                })
                return
            }

            for (const day of selectedDays.selectedDays) {
                let startHourISO = makeDateTime(day,turnosStartHour);
                for(let i = 0; i < turnosDayCount; i++ ) {
                    await httpPost("api/turnos/", {
                        doctor: user.id,
                        hour: new Date(startHourISO).toISOString(),
                        price: price
                    })
                    startHourISO = startHourISO + (60000 * turnosDuration)
                    alert.show('Turno/s creado correctamente',{
                        type: "success"
                    })
                    setDay({selectedDays: []})
                    fetchTurnos()
                }
            }

        } catch (error) {
            console.log(error)
            alert.show('Error en la creación, intente mas tarde!',{
                type: "error"
            })
        }

    }


    const fetchTurnos = async () => {
        //No olvidar la barra al final de turnos
        try {
            let turnos = await httpGet("api/turnos/")
            let disabled = turnos.map(day => {
                return new Date(day.hour)
            })
            setDisabledDays(disabled)
        } catch (error) {
            alert.show('Error obteniendo los turnos',{
                type: "error"
            })
        }
    }

    useEffect(fetchTurnos, [] )

    return (
        <div className="horarios-contenido">
            <h2>Habilitar turnos</h2>
            <div className="horarios-contenido-items">
                <div className="contenido-calendario">
                    <DayPicker onDayClick={handleDayClick} selectedDays={selectedDays.selectedDays}  disabledDays={[...disabledDays, {before: new Date()}]} />
                </div>
                <div className="horarios-contenedor">
                    <h5>Seleccione la franja horaria</h5>
                    <form onSubmit={(e) => createTurnos(e)}>
                        <div className="horarios-contenedor-desde">
                            <label htmlFor="horarios-desde-input">Desde</label>
                            <input
                                id='horarios-desde-input'
                                type='time'
                                className='form-control'
                                value={turnosStartHour} step="600"
                                onChange={(e) => setTurnosStartHour(e.target.value)}
                            />
                        </div>
                        <div className="contenedor-cant-turnos">
                            <label htmlFor="horarios-cant-input">Cantidad de turnos en el dia</label>
                            <select name=""  id="horarios-cant-input" className='form-control' value={turnosDayCount}
                            onChange={(e) => setTurnosDayCount(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>

                        </div>
                        <div className="contenedor-duracion">
                            <label htmlFor="horarios-duracion">Duracion turnos (en min)</label>
                            <select name=""   id='horarios-duracion-input' className='form-control' value={turnosDuration}
                                    onChange={(e) => setTurnosDuration(e.target.value)}>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                        <div className="contenedor-duracion">
                            <label htmlFor="horarios-precio">Ingrese el precio de los turnos</label>
                            <input type="text" id="horarios-precio" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <button type="submit">Habilitar</button>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default Horarios;