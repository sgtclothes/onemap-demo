<?php
include '../../config/conn.php';
$result_array = array();
$sql = 'SELECT * FROM `analysis` ORDER BY created_at DESC';
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
echo json_encode($result_array);
$conn->close();