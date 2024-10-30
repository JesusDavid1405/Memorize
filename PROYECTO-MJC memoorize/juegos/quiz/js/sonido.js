function goToLevel(level) {
    const ship = document.getElementById('ship');
    const levelElement = document.querySelector(`.level.level-${level}`);
    
    ship.style.top = levelElement.offsetTop + 'px';
    ship.style.left = levelElement.offsetLeft + 'px';

  
    setTimeout(() => {
        window.location.href = '';
    }, 1000); 
}