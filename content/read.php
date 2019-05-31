<?php
session_start();
include '../config/conn.php';
include '../config/data_login.php';
$data = data_login($conn,$_SESSION['email']);
$userlist = data_user($conn,$data['id']);
$result_array = array();
$sql = "SELECT a.type AS type, 
        a.name AS name, 
        a.lat AS lat, 
        a.lon AS lon, 
        a.region AS region, 
        a.shape AS shape, 
        b.name AS created_by
        FROM poi a
        INNER JOIN users b ON a.created_by=b.id
        WHERE a.created_by IN ($userlist)";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
echo json_encode($result_array);
$conn->close();