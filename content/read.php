<?php
session_start();
include '../config/data_login.php';

$result_array = array();
$user_id_array = array();
$conn = new mysqli('localhost', 'root', '', 'demo_onemap');
$data= data_login($conn,$_SESSION['email']);
$check = "SELECT GROUP_CONCAT(user_id) AS user_list FROM users_department GROUP BY department_id HAVING user_list LIKE '%$data[id]%' ORDER BY id";
$user_list = $conn->query($check);
if ($user_list->num_rows > 0) {
    while($row = $user_list->fetch_assoc()) {
        array_push($user_id_array, $row['user_list']);
    }
}
$duplicate_str = implode(",",$user_id_array);
$arr_duplicate_str = explode (",",$duplicate_str);
$array = array_unique($arr_duplicate_str);
$user = implode(",",$array);

$sql = "SELECT * FROM poi WHERE created_by IN ($user)";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
echo json_encode($result_array);
$conn->close();