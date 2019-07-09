<?php
$an_id_array = array();
$sql = "SELECT * FROM analysis";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($an_id_array, $row['id']);
    }
}