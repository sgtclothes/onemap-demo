<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
<<<<<<< HEAD
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
$database = "user_data";
mysqli_select_db($conn,$database);
?>
=======
$conn = new mysqli ($dbhost, $dbuser, $dbpass);
$database = "user_data";
mysqli_select_db($conn,$database);
?>
>>>>>>> master
