
var images = [
    
    { src: '../../../img/rompecabezas/ballena.jpg', title: 'CAZA DE BALLENA' },
    { src: '../../../img/rompecabezas/barco.jpg', title: 'BARCO' },
    { src: '../../../img/rompecabezas/barco.jpg', title: 'BALLENA' },
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

