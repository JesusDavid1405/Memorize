<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/icono.png" type="image/icon">
    <title>Presentacion</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="porthole">
            <?php
            $sea_creatures = ['fish', 'jellyfish', 'starfish', 'seahorse', 'turtle'];
            foreach ($sea_creatures as $creature) {
                echo "<div class='creature $creature'></div>";
            }
            ?>
            <div class="coral"></div>
            <div class="bubbles"></div>
        </div>
        <div class="content">
            <h1>AQUA MEMORY</h1>
            <p><?php echo "Bienvenido Aventurero, hoy iniciaras con tu gran viaje a  “Aquac Memory” Una manera de disfrutar y ejercitar tu mente mediante juegos que pronto conoceras
suerte..."; ?></p>
            <button id="readMore">INICIAR</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>