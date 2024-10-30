function goToLevel(level) {
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
        window.location.href = '../quiz/niveles/index.html';
    }, 2000); 
}
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
