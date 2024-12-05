<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enviar Contraseña - Aquac</title>
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="icon" href="../../../img/logo2.png" type="image/icon">
  <link href="../../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../assets/bootstrap/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/log.css">
  <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet">
</head>

<body>
<div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="restaurant-card">
    <div class="salida">
        <a  href="../email/enviarCodigo.php">
        <img src="../../../img/icon/back.png" alt="Regresar" />
        </a>
      </div>
      <h1 class="text1">Cambio </h1>
      <p class="text3">Escribe la contraseña nueva</p>
      <form id="loginForm" method="POST" action="../correo/cambiarPassword.php">
        <div class="mb-3">
          <label for="password" class="form-label"></label>
          <input type="password" class="form-control" id="password" name="password" required> 
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="text2">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  </div>
  
  <script src="../../assets/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- <script src="../assets/js/operador.js"></script> -->
</body>
</html>

