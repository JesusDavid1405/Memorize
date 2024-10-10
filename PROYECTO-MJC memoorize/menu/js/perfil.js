document.addEventListener('DOMContentLoaded', function() {
    const avatarOptions = document.querySelectorAll('.avatar-option2');
    const currentAvatar = document.getElementById('currentAvatar');
    const profileAvatar = document.getElementById('profileAvatar');
    const usernameDisplay = document.getElementById('playerName'); 
    const personalInfoDisplay = document.getElementById('personalInfoDisplay');
    const saveUsernameButton = document.getElementById('saveUsername');
    const newUsernameInput = document.getElementById('newUsername');
    const personalInfoInput = document.getElementById('personalInfo');

    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedAvatar = option.dataset.avatar; 
            currentAvatar.src = selectedAvatar; 
            profileAvatar.src = selectedAvatar; 
            localStorage.setItem('playerAvatar', selectedAvatar);
        });
    });

    const savedAvatar = localStorage.getItem('playerAvatar');
    if (savedAvatar) {
        currentAvatar.src = savedAvatar;
        profileAvatar.src = savedAvatar; 
    }

    saveUsernameButton.addEventListener('click', function() {
        const newUsername = newUsernameInput.value.trim();
        const personalInfo = personalInfoInput.value.trim();
        if (newUsername) {
            usernameDisplay.textContent = newUsername; 
            localStorage.setItem('playerName', newUsername);
        }
        if (personalInfo) {
            personalInfoDisplay.textContent = personalInfo; 
            localStorage.setItem('personalInfo', personalInfo);
        }
        newUsernameInput.value = '';
        personalInfoInput.value = ''; 
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();
    });

    const savedName = localStorage.getItem('playerName');
    if (savedName) {
        usernameDisplay.textContent = savedName;
    }

    const savedInfo = localStorage.getItem('personalInfo');
    if (savedInfo) {
        personalInfoDisplay.textContent = savedInfo; 
    }
});
