<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; char-set=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}


if($_SERVER['REQUEST_METHOD'] === 'POST') {
require_once "../../config/Database.php";
require_once "../../models/Task.php";

// Setup database
$database = new Database();
$db = $database->getConnection();

// Setup Models
$task = new Task($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->task_id)) {
    // Logic update status
    // Jika status dari client 0 maka ubah status jadi 1 dan sebaliknya
    $new_status = ($data->status === "0" ? "1" : "0");

    if($task->update_status($data->task_id, $new_status)) {
        http_response_code(200);
        echo json_encode(["message" => "Status updated"]);
    }else{
        http_response_code(500);
        echo json_encode(["error" => "Failed to update status"]);
    }
}else{
    http_response_code(400);
    echo json_encode(["error" => "Task id undifined"]);
}
}else{
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

?>