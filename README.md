
## Descripciòn 📖
Busca crear una solución para la administración y gestión de turnos y sus respectivos pagos, orientado a profesionales de la salud.
Con tan solo enviar un link a sus pacientes, ellos mismos pueden decidir qué horario y día reservar el turno e incluso pagarlo anticipadamente.

## Funcionamiento ⌨️
Permite al profesional registrarse donde puede ingresar a su perfil personal, desde allí puede:
- Habilitar turnos en los días y horarios que prefiera, como también determinar la duración de los mismos.
- Ver un resumen de los turnos y pagos, donde puede eliminarlos y modificarlos.
- Ver un dashboard con información resumida sobre los turnos y pagos.
- Permite actualizar los datos del profesional y tiene la posibilidad de eliminar su cuenta.
- Obtener el link para enviar a sus pacientes.
Una vez habilitado los turnos, cuando el paciente ingresa con el link provisto por el profesional, va a visualizar un formulario donde en el mismo completa sus datos personales, elige el turno en el horario que prefiera y elige o no pagar allì mismo y lo reserva.

## Comenzando con la instalación 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_¿Qué cosas necesitas para empezar con la instalación?_

```
Python 3.*, preferentemente 3.9 o 3.10 y el administrador de paquetes pipenv
Node y el administrador de librerias npm
git 
```

### Instalación 🔧

_Lo primero que debemos hacer es clonar el repositorio en un directorio de preferencia.
Abrimos la consola y ponemos el comando:_


_Luego de la clonaciòn es necesario instalar las dependencias que requiere el proyecto_
_Empezamos instalando las dependencias necesarias para el Front-end_
_Ingresamos a la carpeta turnos-react con el comando_

```
cd turnos-react 
```
_Instalamos las dependencias_
```
npm install
```
_Ahora debemos instalar las dependencias que utiliza el backend_
_Volvemos a la raiz del proyecto y entramos al directorio backend_
```
cd ..
cd backend
```
_Iniciamos el entorno de trabajo de Python con el comando e instalamos las dependencias_
```
pipenv shell
pipenv install
```
_Creamos la base de datos_
```
py manage.py makemigrations
py manage.py migrate
```
Listo! Ahoa podemos poner en funcionamiento la aplicaciòn

## Despliegue 📦

_Para iniciar la aplicación debemos inicializar el front-end y el back-end_
_Partiendo del directorio raìz del proyecto colocamos los siguientes comandos:
```
cd turnos-react
npm start
cd ..
cd backend
py manage.py runserver
```

## Construido con 🛠️

* [React](https://es.reactjs.org/) - El framework para front-end
* [Django](https://www.djangoproject.com/) - Framework para el back-end
* [react-day-picker](https://react-day-picker.js.org/) - Libreria que nos facilitó el manejo de selección de fechas
* [react-alert](https://www.npmjs.com/package/react-alert) - Libreria para dar de manera simple feedback al usuario.

---
