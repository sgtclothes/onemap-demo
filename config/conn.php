<?php
$dbhost = '172.104.169.85';
$dbuser = 'gdbuser';
$dbpass = 'gdbuser';
$conn = new mysqli($dbhost, $dbuser, $dbpass);
$database = "pggdb";
mysqli_select_db($conn, $database);

date_default_timezone_set('Asia/Jakarta');
 