
document.addEventListener('DOMContentLoaded', function() {
    const leaderboard = document.getElementById('leaderboard');
    let scores = JSON.parse(localStorage.getItem('scores')) || [
        { name: 'Jugador 1', score: 150, avatar: '../img/nose1.png' },
        { name: 'Jugador 2', score: 200, avatar: '../img/avatar20.png' },
        { name: 'Jugador 3', score: 180, avatar: '../img/nose2.png' },
        { name: 'Jugador 4', score: 220, avatar: '../img/nose3.png' },
        { name: 'Jugador 5', score: 300, avatar: '../img/nose4.png' },
    ];

    function updateLeaderboard() {
        leaderboard.innerHTML = '';
        scores.sort((a, b) => b.score - a.score);

        scores.forEach((score, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>
                    <div class="player-info">
                        <div class="avatar-container">
                            <img src="${score.avatar}" alt="${score.name}" class="avatar">
                            <span class="avatar-number">${index + 1}</span> <!-- Número sobre el avatar -->
                        </div>
                        <span>${score.name}</span>
                    </div>
                </td>
                <td>${score.score}</td>
            `;
            leaderboard.appendChild(row);
        });
    }

    updateLeaderboard(); 
});
