document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('readMore');
    
    btnIniciar.addEventListener('click', () => {
        window.location.href = '../menu/index.html'; 
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const texto = "Bienvenido a Aqua Memorize, disfruta del desafío y que la suerte te acompañe en esta aventura, ¡pon a prueba tu memoria!"
    const velocidad = 40; // Velocidad de escritura en milisegundos
    const elemento = document.getElementById("escritura");
    let index = 0;

    function escribir() {
        if (index < texto.length) {
            elemento.textContent += texto[index];
            index++;
            setTimeout(escribir, velocidad);
        }
    }

    escribir();
});
