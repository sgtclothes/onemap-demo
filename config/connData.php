<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$conn = new mysqli ($dbhost, $dbuser, $dbpass);
$database = "user_data";
mysqli_select_db($conn,$database);
?>
