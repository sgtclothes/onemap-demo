<?php 
include '../config/conn.php';
$name_analysis = mysqli_real_escape_string($conn,htmlentities($_POST['name_analysis']));
$created_by = $_POST['created_by'];
$timestamp = NOW();
mysqli_query($conn,"INSERT INTO analysis VALUES ('','$name_analysis', $created_by, $timestamp");
