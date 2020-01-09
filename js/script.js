const cards = [
    "bootstrap",
    "chrome-canary",
    "css",
    "cypress",
    "docker",
    "html",
    "js",
    "node",
    "npm",
    "react",
    "slack",
    "vsc",
    "bootstrap",
    "chrome-canary",
    "css",
    "cypress",
    "docker",
    "html",
    "js",
    "node",
    "npm",
    "react",
    "slack",
    "vsc"
];

let coso;

function mezclarArray(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;

};

function asignarImagenes(){
    const $frenteTarjetas = document.querySelectorAll(".tarjeta-frente");

    $frenteTarjetas.forEach((e, index)=>{
        e.innerHTML = '<img class="img-fluid" src="img/'+cards[index]+'.png" alt="" srcset="">';
        e.dataset.valor = cards[index];
        e.id = index;
    });
};

function manejarInputs() {
    let tarjetaSeleccionada = [];
    const $cuadro = document.querySelectorAll(".tarjeta");
    $cuadro.forEach((e) => {
        e.onclick = function () {
            const $reversoTarjeta = e.children[1];
            const $frenteTarjeta = e.children[0];
            mostrarTarjeta($reversoTarjeta);
            if(tarjetaSeleccionada.length == 0){
                tarjetaSeleccionada.push($frenteTarjeta.dataset.valor);
                tarjetaSeleccionada.push($frenteTarjeta.id);
            }else if(tarjetaSeleccionada[0] === $frenteTarjeta.dataset.valor && tarjetaSeleccionada[1] !== $frenteTarjeta.id){
                document.getElementById(tarjetaSeleccionada[1]).parentElement.classList.add("correcto");
                $reversoTarjeta.parentElement.classList.add("correcto");
            }else{
                const perdon = document.getElementById(tarjetaSeleccionada[1]).parentElement.children[1];
                tarjetaSeleccionada = [];
                console.log(perdon);
                setTimeout(function(){
                    ocultarTarjeta($reversoTarjeta)
                    ocultarTarjeta(perdon);
                }, 300);
            }
        };
    });
};

function mostrarTarjeta(tarjeta){
    tarjeta.classList.add("mostrar");
    tarjeta.classList.remove("ocultar");   
};

function ocultarTarjeta(tarjeta){
    tarjeta.classList.remove("mostrar");
    tarjeta.classList.add("ocultar");  
};

function prepararPartida(){
    mezclarArray(cards);

    asignarImagenes();
    
    manejarRonda();
};

function manejarRonda(){
    
    manejarInputs();
};

prepararPartida();

