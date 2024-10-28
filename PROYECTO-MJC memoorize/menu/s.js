const girarBtn = document.getElementById('girar');
const ruleta = document.getElementById('ruleta');

girarBtn.addEventListener('click', () => {
    const randomDegree = Math.floor(Math.random() * 360) + 720; // Gira varias veces
    ruleta.style.transition = 'transform 4s ease-out';
    ruleta.style.transform = `rotate(${randomDegree}deg)`;

    // Reiniciar la transformación después de la animación
    setTimeout(() => {
        ruleta.style.transition = 'none';
        ruleta.style.transform = 'rotate(0deg)';
    }, 4000);
});
