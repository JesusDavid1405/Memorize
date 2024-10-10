document.addEventListener('DOMContentLoaded', function() {
    const leaderboard = document.getElementById('leaderboard');
    const changeAvatarModal = document.getElementById('changeAvatarModal');
    const avatarOptions = document.querySelectorAll('.avatar-option');
    let scores = JSON.parse(localStorage.getItem('scores')) || [
        { name: 'Jugador 1', score: 150, avatar: '../img/avatar1.png' },
        { name: 'Jugador 2', score: 200, avatar: '../img/avatar2.png' },
        { name: 'Jugador 3', score: 180, avatar: '../img/avatar3.png' },
        { name: 'Jugador 4', score: 220, avatar: '../img/avatar4.png' },
        { name: 'Jugador 5', score: 300, avatar: '../img/avatar5.png' },
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
                <td>
                    <button class="btn btn-secondary change-avatar" data-index="${index}">Cambiar Avatar</button>
                </td>
            `;
            leaderboard.appendChild(row);
        });

        const changeAvatarButtons = document.querySelectorAll('.change-avatar');
        changeAvatarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = button.dataset.index;
                changeAvatarModal.dataset.index = index;
                const modal = new bootstrap.Modal(changeAvatarModal);
                modal.show();
            });
        });
    }

    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedAvatar = option.dataset.avatar;
            const index = changeAvatarModal.dataset.index;
            scores[index].avatar = selectedAvatar;
            localStorage.setItem('scores', JSON.stringify(scores)); 
            updateLeaderboard();
            const modal = bootstrap.Modal.getInstance(changeAvatarModal);
            modal.hide();
        });
    });

    updateLeaderboard(); 
});
