document.addEventListener('DOMContentLoaded', function() {
    const readMoreButton = document.getElementById('readMore');
    const creatures = document.querySelectorAll('.creature');
    const porthole = document.querySelector('.porthole');
    
    readMoreButton.addEventListener('click', function() {
        alert('¡Bienvenido a **AQUA MEMORY**! 🌊💧 Prepárate para sumergirte en un desafío de memoria lleno de diversión acuática. ¡Pon a prueba tu mente y descubre lo que el océano tiene reservado para ti!');
    });

    // Randomly position creatures
    creatures.forEach(creature => {
        creature.style.left = `${Math.random() * 80}%`;
        creature.style.top = `${Math.random() * 80}%`;
    });

    // Add more bubbles dynamically
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        porthole.appendChild(bubble);
    }
});