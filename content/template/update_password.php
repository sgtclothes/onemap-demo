<?php
include '../../config/conn.php';
$id = $_POST['user_id'];
$new_password = md5($_POST['new_password']);
$query="UPDATE `users` SET `password`='$new_password', `updated_at`=NOW() WHERE id='$id'";
$updated=mysqli_query($conn,$query);