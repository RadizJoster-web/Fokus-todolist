<?php

class Database {
    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $db = "todolist";
    public $connect;
    
    // Method untuk membuat koneksi
    public function getConnection() {
        $this->connect = null;
        
        try{
            $this->connect = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db, $this->user, $this->pass);
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $exception) {
            echo "Error Koneksi: " . $exception->getMessage();
        }

        return $this->connect;
    }
}

?>