<?php

/**
 * Class Task
 *
 * Model untuk operasi CRUD tabel "tasks".
 *
 * Properti:
 * - $conn: Koneksi PDO ke database.
 * - $table_name: Nama tabel di database.
 *
 * Method:
 * - __construct($db): Inisialisasi objek model dengan koneksi database.
 * - create($task_name, $task_desc): Simpan task baru ke database.
 */
class Task {
    /** @var PDO Koneksi database */
    private $conn;

    /** @var string Nama tabel database */
    private $table_name = "task";

    /**
     * Konstruktor model Task
     *
     * @param PDO $db Objek koneksi database
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    /**
     * Simpan task baru ke tabel tasks
     *
     * @param string $title Judul task
     * @param string $desc Deskripsi task
     * @return bool True jika berhasil, false jika gagal
     */
    public function create($title, $desc) {
        $query = "INSERT INTO " . $this->table_name . "(title, `desc`) VALUES (?, ?)";
        $smtm = $this->conn->prepare($query);

        return $smtm->execute([$title, $desc]);
    }

    public function delete($task_id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE task_id = (?)";
        $stmt = $this->conn->prepare($query);

        return $stmt->execute([$task_id]);
    } 

    public function update_title($task_id, $title) {
        $query = "UPDATE " . $this->table_name . " SET title = (?) WHERE task_id = (?)";
        $smtm = $this->conn->prepare($query);

        return $smtm->execute([$title, $task_id]);
    }

    public function update_status($task_id, $status) {
        $query = "UPDATE " . $this->table_name . " SET status = (?) WHERE task_id = (?)";
        $stmt = $this->conn->prepare($query);

        return $stmt->execute([$status, $task_id]);
    }

    public function update_desc($task_id, $desc) {
        $query = "UPDATE " . $this->table_name . " SET `desc` = (?) WHERE task_id = (?)";
        $stmt = $this->conn->prepare($query);

        return $stmt->execute([$desc, $task_id]);
    }
}

?>