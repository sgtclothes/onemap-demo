<?php
session_start();
include '../config/data_login.php';

$conn = new mysqli('localhost', 'root', '', 'demo_onemap');
$data = data_login($conn,$_SESSION['email']);
$userlist = data_user($conn,$data['id']);
$result_array = array();
$sql = "SELECT * FROM poi WHERE created_by IN ($userlist)";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
echo json_encode($result_array);
$conn->close();