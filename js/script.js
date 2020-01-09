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

let cantidadIntentos = 0;

let paresEncontrados = 0;

const $timer = document.querySelector('#timer');

let min = 0,
    sec = 0;
    miliSec = 0;

let timer;

function callTimer() {
    miliSec++;
    if (miliSec < 100) {
        if (miliSec === 99) {
            miliSec = 0;
            sec++;
            if (sec === 60)  {
                sec = 0;
                min++;
            }
        }
    }
    else{
        miliSec = 0;
    }
    $timer.textContent = min + ":" + sec;
}


function startTimer() {
    timer = setInterval(callTimer, 10);
}

function stopTimer() {
    clearInterval(timer);
}

// function reset() {
//     stop();
//     min = 0;
//     sec = 0;
//     miliSec = 0;
//     document.getElementById("timer").innerHTML = min + ":" + sec;
// }

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
            cantidadIntentos++;
            if(tarjetaSeleccionada.length == 0){
                tarjetaSeleccionada.push($frenteTarjeta.dataset.valor);
                tarjetaSeleccionada.push($frenteTarjeta.id);
            }else if(tarjetaSeleccionada[0] === $frenteTarjeta.dataset.valor && tarjetaSeleccionada[1] !== $frenteTarjeta.id){
                document.getElementById(tarjetaSeleccionada[1]).parentElement.classList.add("correcto");
                $reversoTarjeta.parentElement.classList.add("correcto");
                tarjetaSeleccionada = [];
                paresEncontrados ++;
            }else{
                const $tarjetaAnterior = document.getElementById(tarjetaSeleccionada[1]).parentElement.children[1];
                tarjetaSeleccionada = [];
                console.log($tarjetaAnterior);
                setTimeout(function(){
                    if(!$reversoTarjeta.parentElement.classList.contains("correcto")){
                        ocultarTarjeta($reversoTarjeta)
                    };
                    if(!$tarjetaAnterior.parentElement.classList.contains("correcto")){
                        ocultarTarjeta($tarjetaAnterior);
                    };
                }, 500);
            }
            if(paresEncontrados === 12){
                finDelJuego();
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
    startTimer();

    mezclarArray(cards);

    asignarImagenes();
    
    manejarRonda();
};

function manejarRonda(){
    
    manejarInputs();
};

function finDelJuego(){
    stopTimer();
    Swal.fire({
        icon: 'success',
        title: `Encontraste todos los pares!`,
        text: `Sólo te tomó ${cantidadIntentos} intentos`,
        html: `Duración de la partida ${min} minutos y ${sec} segundos`,
        footer: '<a href>Click acá para volver a jugar</a>'
      });
}

prepararPartida();

