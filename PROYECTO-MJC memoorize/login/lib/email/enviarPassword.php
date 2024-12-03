<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inicio de Sesión - Aquac</title>
  <link href="../../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../assets/bootstrap/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/log.css">
</head>
<body>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="restaurant-card">
    <div class="salida">
        <a  href="../email/enviarCodigo.php">
          <img src="../../assets/img/botones/salida.png"  />
        </a>
      </div>
      <h1 class="card-title text-center"> Nueva Contraseña </h1>
      <p class="text-center subtitle">por favor digita tu Nueva Contraseña </p>
      <form id="loginForm" method="POST" action="../correo/cambiarPassword.php">
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password" name="password" required> 
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  </div>
  
  <script src="../../assets/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- <script src="../assets/js/operador.js"></script> -->
</body>
</html>
