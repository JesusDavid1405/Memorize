function createBubbles(event) {
    event.preventDefault(); 
    const bubbleContainer = event.currentTarget.querySelector('.bubbles');
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 20 + 20; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = '0px'; 

        bubble.style.animation = `rise 1s ease forwards`;
        bubble.style.animationDelay = `${Math.random() * 0.1}s`; 
        bubbleContainer.appendChild(bubble);
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }
    setTimeout(function() {
        window.location.href = '../views/bar.html';
    }, 1400);
}
document.addEventListener("DOMContentLoaded", function () {
    const texto = "JUGAR"
    const velocidad = 200; // Velocidad de escritura en milisegundos
    const elemento = document.getElementById("btnTex");
    let index = 0;

    function btnTex() {
        if (index < texto.length) {
            elemento.textContent += texto[index];
            index++;
            setTimeout(btnTex, velocidad);
        }
    }

    btnTex();
});
