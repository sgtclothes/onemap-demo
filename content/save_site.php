<?php 
include '../config/conn.php';
include '../config/data_login.php';
session_start();
$data = data_login($conn, $_SESSION['email']);
$lat = $_POST['lat'];
$lon = $_POST['lon'];
$name = mysqli_real_escape_string($conn,htmlentities($_POST['name']));
$address = mysqli_real_escape_string($conn,htmlentities($_POST['address']));
mysqli_query($conn,"INSERT INTO `site` VALUES ('','$lat', '$lon', '$name', '$address', '$data[id]')");
?>