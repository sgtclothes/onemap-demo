<?php 
include '../config/conn.php';
include '../config/auto_increment.php';

$analysis_pk = autoIncrement($conn, 'analysis');
$name_analysis = mysqli_real_escape_string($conn,$_POST['name_analysis']);
$created_by = $_POST['created_by'];
mysqli_query($conn,"INSERT INTO analysis VALUES ($analysis_pk,'$name_analysis', $created_by, NOW(), NULL)");

if(isset($_POST["latitude"])){
    $latitude = $_POST["latitude"];
    $longitude = $_POST["longitude"];
    for($count = 0; $count<count($latitude); $count++){
        $analysis_points_pk = autoIncrement($conn, 'analysis_points');
        mysqli_query($conn,"INSERT INTO analysis_points VALUES ($analysis_points_pk, $analysis_pk, $latitude[$count], $longitude[$count], NOW(), NULL)");
        $distance = $_POST["distance"];
        $distance_i = $distance[$count];
        if(isset($distance_i)){
            $unit = $_POST["unit"];
            $options = $_POST["options"];
            $options_i = $options[$count];
            $unit_i = $unit[$count];
            for($i = 0; $i<count($distance_i); $i++){
                mysqli_query($conn,"INSERT INTO spec_buffer_analysis VALUES ('', $analysis_points_pk, $distance_i[$i], '$unit_i[$i]', $options_i[$i], NOW(), NULL)");
            }
        }
    }
}