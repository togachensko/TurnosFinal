/* Da la funcionalidad para que el menu aparezca y desaparezca segun el tamaño de pantalla*/

// Selecciono los elementos de HTML
let menuPerfil = document.querySelector("#menu-perfil");
let botonMenu = document.querySelector("#menu-icono");

//En html el menu esta visible por defecto, entonces si se ingresa a la pagina con una pantalla chica, el menu hamburguesa aparece abierto
// Para evitar esto usamos el media query de js para darle hidden true
if (window.matchMedia("(max-width: 1200px)").matches) {
    menuPerfil.hidden = true;
}

//Escucha si se redimensiona la pantalla, es para cuando estaba en una pantalla chica con el menu hidden y se agranda no siga con hidden y se muestre el menu
window.addEventListener("resize", (e) => {
        if (window.matchMedia("(min-width: 1200px)").matches) {
            menuPerfil.hidden = false;
        } else {
            menuPerfil.hidden = true;
        }
    }
)

// Escucha si se apreta el boton hamburguesa mobile para mostrar el menu o cerrarlo
botonMenu.addEventListener("click", (e) => {
    menuPerfil.toggleAttribute("hidden");
})

