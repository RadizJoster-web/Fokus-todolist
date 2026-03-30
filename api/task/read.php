<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; char-set=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {
require_once "../config/Database.php";
require_once "../models/Task.php";

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);
$stmt = $task->read();

// Cek apakah ada data yang ditemukan
$num = $stmt->rowCount();

if($num > 0) {
    $tasks_arr = [];
    $tasks_arr["data"] = [];

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $task_item = [
            "task_id" => $task_id,
            "title" => $title,
            "desc" => $desc,
            "status" => $status,
            "created_at" => $created_at
        ];

        array_push($tasks_arr["data"], $task_item);
    }

    http_response_code(200);
    echo json_encode($tasks_arr);
} else {
    http_response_code(404);
    echo json_encode(["error" => "No tasks found"]);
}
}else{
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
} 

?>