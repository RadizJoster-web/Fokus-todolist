<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    require_once '../config/Database.php'; 
    require_once '../models/Task.php'; 

    // Koneksi Database
    $database = new Database();
    $db = $database->getConnection();

    // Inisialisasi model
    $task = new Task($db);

    // MENGAMBIL DATA JSON (req.body di Express)
    $data = json_decode(file_get_contents("php://input"));

    if(!empty($data->title)) {
        if($task->create($data->title, $data->desc)){
            http_response_code(201);
            echo json_encode(["message" => "Task created"]);
        }else{
            http_response_code(503);
            echo json_encode(["error" => "Failed to created task"]);
        }
    }else{
        http_response_code(400);
        echo json_encode(["error" => "Title undefined"]);
    }
}else{
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

?>