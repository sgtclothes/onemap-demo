<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$conn = new mysqli ($dbhost, $dbuser, $dbpass);
$database = "demo_onemap";
mysqli_select_db($conn,$database);
?>