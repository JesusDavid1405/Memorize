
var images = [
    
    { src: '../../../img/rompecabezas/ballena.jpg', title: 'CAZA DE BALLENA' },
    { src: '../../../img/rompecabezas/barco.jpg', title: 'BARCO' },
    { src: '../../../img/rompecabezas/barco.jpg', title: 'BALLENA' },
    { src: 'images/arrecife.jpg', title: 'ARRECIFE' }
];
var gridSize


window.onload = function () {
    gridSize = 3;
    imagePuzzle.startGame(images, gridSize);
};
function restart() {
    gridSize = 3;
    imagePuzzle.startGame(images, gridSize);
}

