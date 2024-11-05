window.addEventListener('load', () => {
    const ship = document.getElementById('ship');
    
    const savedTop = localStorage.getItem('shipTop');
    const savedLeft = localStorage.getItem('shipLeft');

    if (savedTop && savedLeft) {
        ship.style.top = savedTop;
        ship.style.left = savedLeft;
    }
});
