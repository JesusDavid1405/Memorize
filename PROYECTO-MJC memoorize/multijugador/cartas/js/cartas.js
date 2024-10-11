let parejasAcertadas = [];
let numImgVisibles = 0;

let puntos = 0;
let maxPuntos = 0;
let puntosAcumulados = 0;
let partidaIniciada = false;
let rondaActual = 1;
let numeroDeRondas = 1;

window.onload = grid;

function grid() {
    cargarImagenes();
    getMaxPuntos();

    const dificultad = localStorage.getItem('dificultad');
    numeroDeRondas = localStorage.getItem('rondas') || 1; 
	
    switch (dificultad) {
        case "facil":
            generarCartas(4, 8, animales); 
            break;
        case "medio":
            generarCartas(5, 13, animales); 
            break;
        case "dificil":
            generarCartas(6, 18, animales);
            break;
        default:
            console.log('Dificultad no reconocida');
    }
}


function generarCartas(valorDificultad, numImg, tematica) {
    cronometrar(); 
    cargarNumPartidas();  

    let parentElement = document.getElementById("wrapper");
    let numElements = valorDificultad * valorDificultad; 
    let listaImagenes = imagenes(numImg, tematica);  

    for (let i = 0; i < numElements; i++) {
        let img = document.createElement('INPUT');
        img.setAttribute("type", "image");
        img.setAttribute("class", "imagenCarta");
        img.setAttribute("visible", false);
        img.setAttribute("src", listaImagenes[i]);
        carta(parentElement, img, numImg);  
    }

    parentElement.style.setProperty('--rowNum', valorDificultad);  
    parentElement.style.setProperty('--colNum', valorDificultad);
}


function carta(contenedor, img, numImg) {
	let carta = document.createElement('DIV');
	carta.setAttribute("class", "carta");
	contenedor.appendChild(carta);

	let front = document.createElement('DIV');
	front.setAttribute("class", "front face");
	carta.appendChild(front);
	front.appendChild(img);

	let back = document.createElement('DIV');
	back.setAttribute("class", "back face");
	carta.appendChild(back);

	let imgReverso = document.createElement('INPUT');
	imgReverso.setAttribute("type", "image");
	imgReverso.setAttribute("src", "img/reversoC.jpeg");
	imgReverso.style.width = "100%";
	imgReverso.style.height = "100%";
	back.appendChild(imgReverso);

	carta.onclick = function () {
		if (img.getAttribute("visible") == "false") {
			carta.classList.add("mostrar");
			img.setAttribute("visible", true);
			numImgVisibles++;

			comprobarParejas(numImg); 
			scorePartida();

			if (parejasAcertadas.length == numImg) {
				cronometrar(); 
				guardarPuntuacion(); 
				finDeRonda(numImg);  
			}
		}
	}
}

function imagenes(numImg, tematica) {
	let imagenes = [];
	let i = 0;
	while (i < numImg) {
		let nuevaImagen = tematica[getAleatorio(tematica)];
		if (!imagenes.includes(nuevaImagen)) {
			imagenes[i] = nuevaImagen;
			i++;
		}
	}
	return mezclarImagenes(imagenes, numImg);
}

function mezclarImagenes(imagenes, numImg) {
	let baraja = [];
	baraja.length = numImg * 2;

	let i = 0;
	while (i < baraja.length) {
		let nuevaImagen = imagenes[getAleatorio(imagenes)];
		if (!baraja.includes(nuevaImagen) || contarRepeticiones(baraja, nuevaImagen) < 2) {
			baraja[i] = nuevaImagen;
			i++;
		}
	}
	return baraja;
}

function contarRepeticiones(lista, imagen) {
	let repeticiones = 0;
	for (let i = 0; i < lista.length; i++) {
		if (lista[i] == imagen) {
			repeticiones++;
		}
	}
	return repeticiones;
}

function comprobarParejas(numImg) {
	if (numImgVisibles == 2) {
		bloquearPanel(true);
		cronometrar();

		let parejas = [];
		numImgVisibles = 0;

		let imagenes = document.getElementsByClassName("imagenCarta");
		for (let i = 0; i < imagenes.length; i++) {
			if (!parejasAcertadas.includes(imagenes[i].getAttribute("src")) && imagenes[i].getAttribute("visible") == "true") {
				parejas.push(imagenes[i]);
			}
		}

		if (parejas[0].getAttribute("src") != parejas[1].getAttribute("src")) {
			if (puntos != 0) {
				puntos--;
				getMaxPuntos();
			}

			setTimeout(
				function () {
					girarParejas(parejas[0], parejas[1]);
					setTimeout(function () {
						bloquearPanel(false);
						cronometrar();
					}, 1000);
				},
				1000
			);
		} else {
			parejasAcertadas.push(parejas[0].getAttribute("src"));
			puntos += 10;
			bloquearPanel(false);
			getMaxPuntos();
			cronometrar();
		}
	}
}

function finDeRonda(numImg) {
	if (rondaActual < numeroDeRondas) {
		rondaActual++;
		alert(`Ronda ${rondaActual} de ${numeroDeRondas}`);
		reiniciarJuego(numImg); 
	} else {
		alert('¡Juego terminado! Has completado todas las rondas.');
		
	}
}

function reiniciarJuego(numImg) {
    parejasAcertadas = [];
    puntos = 0;
    document.getElementById("wrapper").innerHTML = ""; 
    grid();  
}

function girarParejas(pareja1, pareja2) {
	pareja1.closest(".carta").classList.remove("mostrar");
	pareja1.classList.add("ocultar");
	pareja1.setAttribute("visible", false);

	pareja2.closest(".carta").classList.remove("mostrar");
	pareja2.classList.add("ocultar");
	pareja2.setAttribute("visible", false);
}

function getAleatorio(tematica) {
	return Math.floor(Math.random() * tematica.length);
}

function bloquearPanel(bloquear) {
	let tablero = document.getElementById("wrapper");
	if (bloquear)
		tablero.classList.add("bloquear");
	else
		tablero.classList.remove("bloquear");

	let imagenes = document.getElementsByClassName("imagenCarta");
	for (let i = 0; i < imagenes.length; i++) {
		imagenes[i].disabled = bloquear;
	}
}

function scorePartida() {
	let divScore = document.getElementById("puntosValue");
	divScore.innerHTML = puntos;
}

//CRONOMETRO
function cronometrar() {
	if (partidaIniciada) {
		partidaIniciada = false;
		parar();
	}
	else {
		partidaIniciada = true;
		inicio();
	}
}

function getMaxPuntos() {
	let historial = JSON.parse(localStorage.getItem("partidas"));
	if (historial != null) {
		maxPuntos = historial[0]._puntos;
	} else {
		maxPuntos = puntos;
	}
	setMaxPuntos();
}

function setMaxPuntos() {
	let maxScore = document.getElementById("puntosMaxValue");
	maxScore.innerHTML = maxPuntos;
}

function cargarNumPartidas() {
	let clave = "numPartidas";
	let numPartidas = localStorage.getItem(clave);
	if (numPartidas == null) {
		numPartidas = 1;
	} else {
		numPartidas++;
	}
	localStorage.setItem(clave, numPartidas);
	document.getElementById("numPartidasValue").innerHTML = numPartidas;
}

