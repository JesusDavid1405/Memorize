const container = document.getElementById("container");
const btn = document.getElementById("btn");
let ArrayImg = [];
let ElementImg = [];

// Variables para el temporizador y control de completado
let tiempoRestante = 30; // 30 segundos
let intervalo;
let tiempoInicio = Date.now(); // Guardar el tiempo de inicio del juego

const GetImgUrl = (e) => {
  let value = e.target.classList.contains("img");
  if (value) {
    let url_img = e.target.getAttribute("src");
    ArrayImg.push(url_img);
    ElementImg.push(e.target);
    ElementImg[0].classList.add("border_img");
  }
};

const ChangeImg = () => {
  if (ArrayImg.length > 1) {
    ElementImg[0].setAttribute("src", ArrayImg[1]);
    ElementImg[1].setAttribute("src", ArrayImg[0]);
    ElementImg[0].classList.remove("border_img");
    ElementImg = [];
    ArrayImg = [];
    
    // Verificar si el rompecabezas está completo
    if (isPuzzleComplete()) {
      clearInterval(intervalo); // Detener el temporizador
      mostrarModalCompletado(); // Mostrar modal de completado
    }
  }
};

const ramdon = () => {
  for (let index = container.children.length; index >= 0; index--) {
    container.appendChild(container.children[(Math.random() * index) | 0]);
  }
};

// Verificar si las imágenes están en el orden correcto
const isPuzzleComplete = () => {
  const images = Array.from(container.getElementsByTagName("img"));
  for (let i = 0; i < images.length; i++) {
    if (images[i].getAttribute("src") !== `IMG2//${i + 1}.jpg`) {
      return false;
    }
  }
  return true;
};

container.addEventListener("click", (e) => {
  GetImgUrl(e);
  ChangeImg();
});

btn.addEventListener("click", () => {
  ramdon();
  tiempoInicio = Date.now(); // Reiniciar el tiempo de inicio al iniciar un nuevo juego
  tiempoRestante = 30; // Reiniciar el tiempo restante
  iniciarTemporizador(); // Reiniciar el temporizador
});

//iniciar el temporizador automáticamente al cargar la página
window.onload = function() {
    iniciarTemporizador();
};

function iniciarTemporizador() {
    intervalo = setInterval(() => {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
        
        // Formatear tiempo en MM:SS
        segundos = segundos < 10 ? '0' + segundos : segundos;
        document.getElementById('temporizador').textContent = `${minutos}:${segundos}`;
        
        //  modal cuando el tiempo se acabe
        if (tiempoRestante === 0) {
            clearInterval(intervalo);
            mostrarModal();
        }
        
        tiempoRestante--;
    }, 1000);
}

// Función para mostrar el modal de tiempo agotado
function mostrarModal() {
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal de tiempo agotado
document.getElementById('cerrar').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Función para mostrar el modal de completado
function mostrarModalCompletado() {
    const modal = document.getElementById('modal-completado');
    const tiempoTotal = ((Date.now() - tiempoInicio) / 1000).toFixed(2);
    document.getElementById('tiempo-completado').textContent = tiempoTotal;
    modal.style.display = 'block';
}

// Función para cerrar el modal de completado
document.getElementById('cerrar-completado').onclick = function() {
    document.getElementById('modal-completado').style.display = 'none';
};

// Esconder la imagen de la esquina superior izquierda después de 2.5 segundos
setTimeout(() => {
  const imagen = document.getElementById('imagen-container');
  imagen.style.display = 'none';
}, 2500);
