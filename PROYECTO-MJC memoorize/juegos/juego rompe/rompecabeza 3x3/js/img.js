var images = [
    { src: 'images/nuevo2.jpg', title: 'BARCO PIRATA' },
    { src: 'images/ballena.jpg', title: 'CAZA DE BALLENA' },
    { src: 'images/oe.jpg', title: 'BUCEO' },
    { src: 'images/tib.jpg', title: 'BALLENA' },
    { src: 'images/arrecife.jpg', title: 'ARRECIFE' }
];

window.onload = function () {
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    imagePuzzle.startGame(images, gridSize);
};
function restart() {
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    imagePuzzle.startGame(images, gridSize);
}

