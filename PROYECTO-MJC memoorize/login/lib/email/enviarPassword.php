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
</head>
<style>
    body, html {
      height: 100%;
      margin: 0;
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .restaurant-card {
      background: rgb(34,145,195);
background: linear-gradient(0deg, rgba(34,145,195,1) 23%, rgba(253,223,45,1) 74%);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      box-shadow: 0 8px 32px 0 rgba(70, 38, 135, 0.37);
      padding: 2rem;
      width: 100%;
      max-width: 350px;
      animation: float 6s ease-in-out infinite;
      position: relative;
      
    }
    @keyframes float {
      0% { transform: translatey(0px); }
      50% { transform: translatey(-20px); }
      100% { transform: translatey(0px); }
    }
    .form-control {
      background-color: #f0f8ff;
      border: 1px solid #1e3c72;
      transition: all 0.3s ease;
    }
    .form-control:focus {
      background-color: #e6f2ff;
      box-shadow: 0 0 15px rgba(30, 60, 114, 0.2);
    }
    .btn-primary {
      background: #FF5733;
      border: none;
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      background: #2a5298;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(31, 38, 135, 0.3);
    }
    .salida {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .salida img {
      width: 24px;
      height: 24px;
      transition: transform 0.2s ease;
    }
    .salida img:hover {
      transform: scale(1.1);
    }
    /* Estilos responsivos para dispositivos móviles */
    @media (max-width: 768px) {
      .restaurant-card {
        padding: 1.5rem;
      }
      h1.card-title {
        font-size: 1.5rem;
      }
      p.subtitle {
        font-size: 0.9rem;
      }
      .form-control, .btn {
        font-size: 0.9rem;
      }
    }
  </style>
<body>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="restaurant-card">
    <div class="salida">
        <a  href="../email/enviarCodigo.php">
        <img src="../../../img/icon/back.png" alt="Regresar" />
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
