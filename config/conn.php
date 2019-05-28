<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
$database = "demo_onemap";
mysqli_select_db($conn,$database);
?>