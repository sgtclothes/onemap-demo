<?php
header('Content-Type: image/jpeg');

include '../../config/conn.php';
$name= $_FILES['file']['name'];

// Load
$thumb = imagecreatetruecolor($_POST['newWidth'], $_POST['newHeight']);
$source = imagecreatefromjpeg($name);

// Resize
imagecopyresized($thumb, $source, 0, 0, 0, 0, $_POST['newWidth'], $_POST['newHeight'], $_POST['originalWidth'], $_POST['originalHeight']);

$id = $_POST['user_photo'];
$targetPath = "../../assets/images/profile/Photo_Profile_".$id."_".basename($name);
$name_file = "Photo_Profile_".$id."_".basename($name);
print_r($_FILES['file']['size']);
if($name_file){
    move_uploaded_file($_FILES['file']['tmp_name'],$targetPath);
}

$query="UPDATE users SET photo='$name_file' WHERE id='$id'";
$upload=mysqli_query($conn,$query);