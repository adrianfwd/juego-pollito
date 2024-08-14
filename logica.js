const celdas = document.querySelectorAll('.cell');
var jugadorActual = 'pollito';
var juegoActivo = true;
var turnoEnProceso = false;
var scores = obtenerScore() || {
    scoreCpu: 0,
    scoreJug: 0,
    empate: 0
};
let vic = document.getElementById("1")
let derr = document.getElementById("2")
let empate = document.getElementById("3")

function verificarGanador() {
    var patronesGanadores = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (var i = 0; i < patronesGanadores.length; i++) {
        var patron = patronesGanadores[i];
        var a = patron[0];
        var b = patron[1];
        var c = patron[2];

        if (celdas[a].classList.contains(jugadorActual) &&
            celdas[b].classList.contains(jugadorActual) &&
            celdas[c].classList.contains(jugadorActual)) {
           
            if (jugadorActual === 'pollito') {
                scores.scoreJug++;

                guardarScore();
                actualizarPuntajes(); 
            }
            else {
                scores.scoreCpu++;
                guardarScore();
                actualizarPuntajes(); 
            }
            juegoActivo = false;
            return;
        }
    }

    var empate = true;
    for (var j = 0; j < celdas.length; j++) {
        if (!celdas[j].classList.contains('pollito') && !celdas[j].classList.contains('Don Pollo')) {
            empate = false;
            break;
        }
    }

    if (empate) {
        scores.empate++;
   

        juegoActivo = false;
        guardarScore();
        actualizarPuntajes();
    }

}


function movimientoPC() {
    if (!juegoActivo) return;

    var celdasVacías = [];
    for (var i = 0; i < celdas.length; i++) {
        if (!celdas[i].classList.contains('pollito') && !celdas[i].classList.contains('polloPC')) {
            celdasVacías.push(celdas[i]);
        }
    }

    if (celdasVacías.length === 0) return;

    var indiceAleatorio = Math.floor(Math.random() * celdasVacías.length);
    var celda = celdasVacías[indiceAleatorio];
    celda.classList.add('polloPC');


    setTimeout(function () {
        celda.classList.add('animacion-terminada');
    }, 2000);

    verificarGanador();
    jugadorActual = 'pollito';
}


function manejarClick(evento) {
    if (!juegoActivo) return;

    var celda = evento.target;

    if (!celda.classList.contains('pollito') && !celda.classList.contains('polloPC')) {
        celda.classList.add('pollito');

        setTimeout(function () {
            celda.classList.add('animacion-terminada');
        }, 2000);

        verificarGanador();
        jugadorActual = 'polloPC';
        setTimeout(movimientoPC, 2000);
    }
}


for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click', manejarClick);
}

function guardarScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

function obtenerScore() {
    const scoresString = localStorage.getItem('scores');
    return scoresString ? JSON.parse(scoresString) : null;
}

function actualizarPuntajes() {
    vic.textContent = "victorias : "+scores.scoreJug;
    derr.textContent = "derrotas : "+scores.scoreCpu;
    empate.textContent = "empates : "+scores.empate;
}

actualizarPuntajes();
