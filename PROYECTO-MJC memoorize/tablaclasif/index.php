<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TABLA CLASIFICACION</title>
    <link rel="icon" href="IMG/logo2.png" type="image/icon">

    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="leaderboard">
        <h1>TABLA DE CLASIFICACION</h1>
        <button id="closeBtn">×</button>
        <table>
            <tbody>
                <?php
                $jsonData = file_get_contents('players.json');
                $players = json_decode($jsonData, true);

                foreach ($players as $index => $player) {
                    echo "<tr>";
                    echo "<td class='rank'>" . ($index + 1) . "</td>";
                    echo "<td class='player-name'>" . $player['name'] . "</td>";
                    echo "<td class='score'>" . $player['score'] . "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
    <script src="script.js"></script>
</body>
</html>