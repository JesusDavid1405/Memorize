document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordField = document.getElementById("contraseñaLogin");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.src = "../img/icon/password.png"; // Cambia al icono de ojo abierto
    } else {
        passwordField.type = "password";
        eyeIcon.src = "../img/icon/candado1.png"; // Cambia al icono de contraseña cerrado
    }
});
