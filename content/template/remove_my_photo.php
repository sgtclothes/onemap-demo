<?php
include '../../config/conn.php';
$id = $_POST['user_id'];
$query="UPDATE users SET photo='' WHERE id='$id'";
$upload=mysqli_query($conn,$query);