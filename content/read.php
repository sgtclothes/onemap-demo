<?php
session_start();
include '../config/conn.php';
$result_array = array();
$sql = 'SELECT a.type AS type, 
        a.name AS name, 
        a.lat AS lat, 
        a.lon AS lon, 
        a.region AS region, 
        a.shape AS shape,
        b.name AS created_by,
        a.color AS color
        FROM poi a
        INNER JOIN (
            select id,name from users 
            where 
            id in (
                select user_id from users_department 
                where department_id in ('. implode(',',$_SESSION['departments']).')
            )
        ) b ON a.created_by=b.id';

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
echo json_encode($result_array);
$conn->close();