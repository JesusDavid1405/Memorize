var images = [
    { src: 'images/nuevo2.jpg', title: 'BARCO PIRATA' },
    { src: 'images/pulpa.jpeg', title: 'FONDO DEL MAR' },
    { src: 'images/pulpo.jpeg', title: 'PULPO' },
    { src: 'images/tiburon.jpeg', title: 'TIBURON' },
    { src: 'images/subamarino.jpeg', title: 'SUBMARINO' }
];

window.onload = function () {
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    imagePuzzle.startGame(images, gridSize);
};
function restart() {
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    imagePuzzle.startGame(images, gridSize);
}
/*function rules() {
    alert('Une todas las piezas hasta completar la imagen. Comienza por los bordes y sigue hacia el centro. ¡La paciencia y el enfoque te llevarán a la meta! \n ¡Disfruta el desafío!🧩');
}
function about() {
    alert('El rompecabezas es un juego que consiste en unir diversas piezas para formar una imagen completa. Cada pieza tiene una forma única, y su ensamblaje requiere atención y habilidades de resolución de problemas.  \nEste juego no solo es entretenido, sino que también estimula la mente, mejora la concentración y fomenta la paciencia. Los rompecabezas pueden variar en dificultad, desde simples hasta complejos, lo que los hace adecuados para todas las edades.🧩🌊');
}*/
