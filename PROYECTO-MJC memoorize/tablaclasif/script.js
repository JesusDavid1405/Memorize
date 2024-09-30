document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeBtn');
    const leaderboard = document.getElementById('leaderboard');

    closeBtn.addEventListener('click', function() {
        leaderboard.style.display = 'none';
    });
});