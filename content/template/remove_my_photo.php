<?php
include '../../config/conn.php';
$id = $_POST['user_id'];
$query="UPDATE `users` SET `photo`='', `updated_at`=NOW() WHERE id='$id'";
$upload=mysqli_query($conn,$query);