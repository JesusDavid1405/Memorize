const container = document.getElementById("container");
const btn = document.getElementById("btn");
let ArrayImg = [];
let ElementImg = [];

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
  }
};

const ramdon = () => {
  for (let index = container.children.length; index >= 0; index--) {
    container.appendChild(container.children[(Math.random() * index) | 0]);
  }
};

container.addEventListener("click", (e) => {
  GetImgUrl(e);
  ChangeImg();
});

btn.addEventListener("click", () => {
  ramdon();
});

let tiempoRestante = 30; // 30 segundos
let intervalo;

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

// Función para mostrar el modal
function mostrarModal() {
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
document.getElementById('cerrar').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};
// Espera 3 segundos y luego oculta la imagen
setTimeout(() => {
  const imagen = document.getElementById('imagen-container');
  imagen.style.display = 'none';
}, 2500);