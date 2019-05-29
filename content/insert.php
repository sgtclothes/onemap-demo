<?php
include '../config/ConsolePhp.php';
$conn = new mysqli('localhost', 'root', '', 'demo_onemap');
$type = $_POST['type'];
$name = $_POST['name'];
$lat = $_POST['lat'];
$lon = $_POST['lon'];
$region = $_POST['region'];
$shape = $_POST['shape'];
$created_by = $_POST['created_by'];
$sql = "INSERT INTO `poi` (`id`, `type`, `name`, `lat`, `lon`, `region`, `shape`, `created_by`) VALUES ('', '$type', '$name', '$lat', '$lon', '$region', '$shape', '$created_by')";
if ($conn->query($sql) === TRUE) {
    ConsolePhp::log('data inserted!');
} else {
    ConsolePhp::log('failed!');
}
$conn->close();