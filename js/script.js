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
            if (sec === 60) {
                sec = 0;
                min++;
            }
        }
    }
    else {
        miliSec = 0;
    }
    function mostrarDosDigitos(numero){
        if(numero<10){
            numero = "0" + numero;
            return numero;
        }else{
            return numero;
        };
    };
    $timer.textContent = mostrarDosDigitos(min) + ":" + mostrarDosDigitos(sec);
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

function asignarImagenes() {
    const $frenteTarjetas = document.querySelectorAll(".tarjeta-frente");

    $frenteTarjetas.forEach((e, index) => {
        e.innerHTML = '<img class="img-fluid" src="img/' + cards[index] + '.png" alt="" srcset="">';
        e.dataset.valor = cards[index];
        e.id = index;
    });
};

function manejarInputs() {

    let tarjetaActual = {
        frente: "",
        reverso: "",
        tarjeta: ""
    };

    let primeraTarjeta = null;

    const $tablero = document.querySelector("#tablero");

    $tablero.onclick = function (e) {

        if (e.target.classList.contains("img-fluid")) {
            const $tarjeta = e.target.parentElement.parentElement;
            manejarClickTarjeta($tarjeta);
        };

        function manejarClickTarjeta(tarjeta) {

            tarjetaActual = {
                frente: tarjeta.children[0],
                reverso: tarjeta.children[1],
                tarjeta: tarjeta
            };
            if(!(tarjeta.classList.contains("correcto"))){
                mostrarTarjeta(tarjetaActual.reverso);
            }else{
                return false;
            };
            if (primeraTarjeta === null) {

                primeraTarjeta = {
                    frente: tarjeta.children[0],
                    reverso: tarjeta.children[1],
                    tarjeta: tarjeta
                };
                cantidadIntentos++;
            }
            if (primeraTarjeta !== null && tarjetaActual.frente.id !== primeraTarjeta.frente.id) {
                if (tarjetasIguales(tarjetaActual.frente, primeraTarjeta.frente)) {
                    mostrarAcierto(tarjetaActual.tarjeta);
                    mostrarAcierto(primeraTarjeta.tarjeta);
                    paresEncontrados++;
                    primeraTarjeta = null;
                } else {
                    ocultarTarjeta(tarjetaActual.reverso);
                    ocultarTarjeta(primeraTarjeta.reverso);
                    primeraTarjeta = null;
                };
                cantidadIntentos++;
            };
        };
        if (paresEncontrados === 12) {
            finDelJuego();
        };
    };
};

function mostrarTarjeta(tarjeta) {
    tarjeta.classList.add("mostrar");
    tarjeta.classList.remove("ocultar");
};

function ocultarTarjeta(tarjeta) {
    setTimeout(function () {
        tarjeta.classList.remove("mostrar");
        tarjeta.classList.add("ocultar");
    }, 500);
};

function mostrarAcierto(tarjeta) {
    tarjeta.classList.add("correcto");
}

function tarjetasIguales(tarjeta1, tarjeta2) {
    return tarjeta1.dataset.valor === tarjeta2.dataset.valor && !(tarjeta1.id === tarjeta2.id);
}

function prepararPartida() {
    startTimer();

    mezclarArray(cards);

    asignarImagenes();

    manejarRonda();
};

function manejarRonda() {

    manejarInputs();
};

function finDelJuego() {
    stopTimer();
    Swal.fire({
        icon: 'success',
        title: `Encontraste todos los pares!`,
        text: `Sólo te tomó ${cantidadIntentos} intentos`,
        footer: '<a href>Click acá para volver a jugar</a>'
    });
}

prepararPartida();

