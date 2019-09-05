<?php
include '../../config/conn.php';
$name= $_FILES['file']['name'];
$id = $_POST['user_id'];
if (!file_exists('../../assets/images/profile/user_id_'.$id)) {
    mkdir('../../assets/images/profile/user_id_'.$id, 0777, true);
}
$data = $_POST["base64_image"];
$image_array_1 = explode(";", $data);
$image_array_2 = explode(",", $image_array_1[1]);
$currentImage = base64_decode($image_array_2[1]);
$targetPath = "../../assets/images/profile/user_id_".$id."/".$name;
move_uploaded_file($_FILES['file']['tmp_name'],$targetPath);
file_put_contents($targetPath,$currentImage);
$query="UPDATE `users` SET `photo`='user_id_$id/$name', `updated_at`=NOW() WHERE id='$id'";
$upload=mysqli_query($conn,$query);