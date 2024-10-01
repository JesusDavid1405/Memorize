document.addEventListener('DOMContentLoaded', function() {
    const playerTable = document.getElementById('player-table');

    const players = [
        {"name": "Isabella", "score": 340000},
        {"name": "Jhoan", "score": 340000},
        {"name": "Marcos", "score": 290000},
        {"name": "Camilo", "score": 270000},
        {"name": "Jesus", "score": 250000},
        {"name": "Juan", "score": 230000},
        {"name": "Carlos", "score": 200000},
        {"name": "Blessd", "score": 170000},

    ];

    function loadPlayers() {
        playerTable.innerHTML = ''; 

        players.forEach(player => {
            const row = document.createElement('tr'); 
            const nameCell = document.createElement('td');
            nameCell.textContent = player.name; 

            const scoreCell = document.createElement('td');
            scoreCell.textContent = player.score; 

            row.appendChild(nameCell); 
            row.appendChild(scoreCell);
            playerTable.appendChild(row); 
        });
    }

    const leaderboardModal = document.getElementById('leaderboardModal');
    leaderboardModal.addEventListener('show.bs.modal', loadPlayers);
});