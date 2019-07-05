<?php 
include '../config/conn.php';
include '../config/auto_increment.php';

$analysis_pk = autoIncrement($conn, 'analysis');
$name_analysis = mysqli_real_escape_string($conn,$_POST['name_analysis']);
$created_by = $_POST['created_by'];
mysqli_query($conn,"INSERT INTO analysis VALUES ($analysis_pk,'$name_analysis', $created_by, NOW())");

if(isset($_POST["latitude"])){
    $latitude = $_POST["latitude"];
    $longitude = $_POST["longitude"];
    for($count = 0; $count<count($latitude); $count++){
        $analysis_points_pk = autoIncrement($conn, 'analysis_points');
        mysqli_query($conn,"INSERT INTO analysis_points VALUES ($analysis_points_pk, $analysis_pk, $latitude[$count], $longitude[$count])");
        if(isset($_POST["distance"])){
            $distance = $_POST["distance"];
            $unit = $_POST["unit"];
            $options = $_POST["options"];
            for($i = 0; $i<count($distance); $i++){
                mysqli_query($conn,"INSERT INTO spec_buffer_analysis VALUES ('', $analysis_points_pk, $distance[$i], '$unit[$i]', $options[$i])");
            }
        }
    }
}