 <?php
    class Database {
        // Propiedades de la clase
        private $host = "localhost";
        private $dbname = "prueba";
        private $username = "root";
        private $password = "";
        private $conn;

        // Método para establecer la conexión
        public function connect() {
            $this->conn = null;
            
            // Intentar la conexión usando MySQLi
            try {
                $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbname);
                if ($this->conn->connect_error) {
                    throw new Exception("Error en la conexión: " . $this->conn->connect_error);
                }
            } catch (Exception $e) {
                echo $e->getMessage();
            }
            
            return $this->conn;
        }

        // Método para cerrar la conexión
        public function disconnect() {
            if ($this->conn) {
                $this->conn->close();
            }
        }
    }
