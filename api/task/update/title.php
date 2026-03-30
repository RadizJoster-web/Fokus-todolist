<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; char-set=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once "../../config/Database.php";
    require_once "../../models/Task.php";

    $database = new Database();
    $db = $database->getConnection();

    $task = new Task(($db));

    $data = json_decode(file_get_contents("php://input"));

    if(!empty($data->task_id)){
        if($task->update_title($data->task_id, $data->title)){
            http_response_code(200);
            echo json_encode(["message" => "Title updated"]);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Failed to update title"]);
        }
    }else{
        http_response_code(400);
        echo json_encode(["error" => "Task id undifined"]); 
    }
}

?>