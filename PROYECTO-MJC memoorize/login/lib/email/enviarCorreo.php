<?php
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inicio de Sesión - Aquac</title>
  <link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.min.css">
  <link href="../../assets/bootstrap/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/log.css">
</head>

<body>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="restaurant-card">
      <div class="salida">
        <a  href="../login.html">
          <img src="../../assets/img/botones/salida.png"  />
        </a>
      </div>
      <h1 class="card-title text-center">correo electrónico</h1>
      <p class="text-center subtitle">por favor digita tu correo electrónico</p>
      
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" id="txtemail" name="txtemail" required>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">Restablecer Contraseña</button>
        </div>
        <div class="col-3 d-flex justify-content-center">
        </div>
      </form>
    </div>
  </div>

  <script src="../../assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>