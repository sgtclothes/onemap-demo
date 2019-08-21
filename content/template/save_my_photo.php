<?php
include '../../config/conn.php';
$name= $_FILES['file']['name'];
$id = $_POST['user_photo'];
$targetPath = "../../assets/images/profile/Photo_Profile_".$id."_".basename($name);
$name_file = "Photo_Profile_".$id."_".basename($name);
print_r($_FILES['file']['tmp_name']);
if($name_file){
    move_uploaded_file($_FILES['file']['tmp_name'],$targetPath);
}

$query="UPDATE users SET photo='$name_file' WHERE id='$id'";
$upload=mysqli_query($conn,$query);