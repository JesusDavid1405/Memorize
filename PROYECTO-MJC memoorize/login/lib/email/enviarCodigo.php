<!DOCTYPE html>
<html lang="es">
  <link rel="stylesheet" href="css/estilos.css">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inicio de Sesión - aquac</title>
  <link href="../../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../assets/bootstrap/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/log.css">
</head>
<body>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="restaurant-card">
    <div class="salida">
        <a  href="../email/enviarCorreo.php">
          <img src="../../assets/img/botones/salida.png"  />
        </a>
      </div>
      <h1 class="card-title text-center"> digita tu codigo</h1>
      <p class="text-center subtitle">por favor digita tu codigo</p>
      <form id="loginForm"  method="POST" action="../correo/codigo.php">
        <div class="mb-3">
          <label for="codigo" class="form-label">codigo</label>
          <input  type="number" pattern="[0-9]*" class="form-control" id="codigo" name="codigo" required >
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary" >Iniciar Sesión</button>
        </div>
      </form>
    </div>
  </div>
  
  <script src="../../assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
