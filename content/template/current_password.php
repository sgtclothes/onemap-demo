<?php
include '../../config/conn.php';
$sql = 'SELECT `password` FROM `users` WHERE id ='.$_POST['user_id'];
$query = mysqli_query($conn,$sql);
$password = mysqli_fetch_array($query);
echo $password['password'];