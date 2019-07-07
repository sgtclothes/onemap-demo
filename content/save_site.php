<?php 
include '../config/conn.php';
session_start();
$lat = $_POST['lat'];
$lon = $_POST['lon'];
$name = mysqli_real_escape_string($conn,htmlentities($_POST['name']));
$address = mysqli_real_escape_string($conn,htmlentities($_POST['address']));
$created_by = $_SESSION['auth']['id'];
mysqli_query($conn,"INSERT INTO `site` VALUES ('','$lat', '$lon', '$name', '$address', $created_by, NOW(), NULL)");
?>