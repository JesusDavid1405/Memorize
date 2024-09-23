document.addEventListener('DOMContentLoaded', function() {
    const readMoreButton = document.getElementById('readMore');
    const creatures = document.querySelectorAll('.creature');
    const porthole = document.querySelector('.porthole');
    
    document.getElementById("readMore").addEventListener("click", function() {
        window.location.href = "bar.html"; 
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