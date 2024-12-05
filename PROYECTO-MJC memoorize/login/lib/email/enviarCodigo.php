<!DOCTYPE html>
<html lang="es">
<head>
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="icon" href="../../../img/logo2.png" type="image/icon">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inicio de Sesión - aquac</title>
  <link href="../../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../assets/bootstrap/css/bootstrap.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/log.css">
</head>
<body>
  <div class="container">
    <div class="restaurant-card">
      <div class="salida">
        <a href="../../recuperar/index.html">
          <img src="../../../img/icon/back.png" alt="Regresar" />
        </a>
      </div>
      <h1 class="text1">Digita tu codigo</h1>
      <p class="text3">Escribe el código enviado a tu correo.</p>
      <form id="loginForm" method="POST" action="../correo/codigo.php">
        <div class="mb-3">
          <label for="codigo" class="form-label"></label>
          <input type="number" pattern="[0-9]*" class="form-control" id="codigo" name="codigo" required>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="text2">Enviar Código</button>
        </div>
      </form>
    </div>
  </div>
  
  <script src="../../assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
