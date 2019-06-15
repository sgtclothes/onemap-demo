<?php
$layer_array = array();
$sql = "SELECT * FROM layer";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($layer_array, $row);
    }
}