function goToLevel3(level) {
    const ship = document.getElementById('ship');
    const levelElement = document.querySelector(`.level.level-${level}`);
    
    const topPosition = levelElement.offsetTop + 'px';
    const leftPosition = levelElement.offsetLeft + 'px';
    
    ship.style.top = topPosition;
    ship.style.left = leftPosition;

    localStorage.setItem('selectedLevel', level);
    localStorage.setItem('shipTop', topPosition);
    localStorage.setItem('shipLeft', leftPosition);

    setTimeout(() => {
        window.location.href = '../rompecabeza 5x5/index.html';
    }, 2000); 
}