<?php
class Conexion {
    private $server;
    private $usuario;
    private $baseDatos;
    private $password;

    public function __construct(){
        // Using environment variables for security (ensure you set these in your environment)
        $this->server = getenv('DB_SERVER') ?: 'localhost'; // Default to localhost
        $this->usuario = getenv('DB_USER') ?: 'root'; // Default to root user
        $this->baseDatos = getenv('DB_NAME') ?: 'prueba'; // Default to 'prueba' database
        $this->password = getenv('DB_PASSWORD') ?: ''; // Default to empty password
    }

    public function conectar(){
        // DSN for MySQL database
        $dsn = "mysql:host=$this->server;dbname=$this->baseDatos;charset=utf8"; // Specify charset to avoid encoding issues
        try {
            $conexion = new PDO($dsn, $this->usuario, $this->password);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Set error mode to exception
            return $conexion;
        } catch (PDOException $e) {
            // If connection fails, print error message
            echo "Error al conectar a la base de datos: " . $e->getMessage();
            return null;
        }
    }

    public function consulta($querysql, $values = []){
        try {
            $conexion = $this->conectar();
            $consulta = $conexion->prepare($querysql);
            $consulta->execute($values);
            return $consulta->fetchAll(PDO::FETCH_ASSOC); // Fetch all results
        } catch (PDOException $e) {
            // If query fails, print error message
            echo "Error en la consulta: " . $e->getMessage();
            return [];
        }
    }
    
    public function consultaValor($querysql, $values) {
        $conexion = $this->conectar();
        $consulta = $conexion->prepare($querysql);
        $consulta->execute($values);
    
        $resultados = []; // Inicializa $resultados como un array vacío
    
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $resultados[] = $fila;
        }
    
        return $resultados;
    }
    
    public function ejecutar($querysql, $values){
        try {
            $conexion = $this->conectar();
            $queryEjecutar = $conexion->prepare($querysql);
            $queryEjecutar->execute($values);
        } catch (PDOException $e) {
            // If query execution fails, print error message
            echo "Error al ejecutar la consulta: " . $e->getMessage();
        }
    }

    public function numeroRegistro($querysql, $values){
        try {
            $conexion = $this->conectar();
            $consulta = $conexion->prepare($querysql);
            $consulta->execute($values);
            return $consulta->fetchColumn(); // Fetch a single value (e.g., count)
        } catch (PDOException $e) {
            // If fetching column fails, print error message
            echo "Error al contar registros: " . $e->getMessage();
            return 0;
        }
    }
}
?>
