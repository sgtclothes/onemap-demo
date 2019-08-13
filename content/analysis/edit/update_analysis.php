<?php 
include '../../../config/conn.php';
include '../../../config/auto_increment.php';

$name_analysis = mysqli_real_escape_string($conn,$_POST['name_analysis']);
$id = $_POST['id_analysis'];
mysqli_query($conn,"UPDATE analysis SET name='$name_analysis', updated_at = NOW() WHERE id = '$id'");

if(isset($_POST["latitude"])){
    $latitude = $_POST["latitude"];
    $longitude = $_POST["longitude"];
    $id_points = $_POST["id_points"];
    for($count = 0; $count<count($latitude); $count++){
        if ($id_points[$count] == "undefined") {
            $analysis_points_pk = autoIncrement($conn, 'analysis_points');
            mysqli_query($conn,"INSERT INTO analysis_points VALUES ($analysis_points_pk, $id, $latitude[$count], $longitude[$count], NOW(), NULL)");
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
        else {
            $distance = $_POST["distance"];
            $distance_i = $distance[$count];
            $unit = $_POST["unit"];
            $options = $_POST["options"];
            $options_i = $options[$count];
            $unit_i = $unit[$count];
            if(isset($distance_i)){
                for($i = 0; $i<count($distance_i); $i++){
                    $check=mysqli_query(
                        $conn,
                        "SELECT * FROM spec_buffer_analysis WHERE analysis_points_id = '$id_points[$count]' AND distance = '$distance_i[$i]' AND unit = '$unit_i[$i]' AND options ='$options_i[$i]'"
                    );
                    if (mysqli_num_rows($check)===0) {
                        mysqli_query($conn,"INSERT INTO spec_buffer_analysis VALUES ('', $id_points[$count], $distance_i[$i], '$unit_i[$i]', $options_i[$i], NOW(), NULL)");
                    }
                }
            }   
        }
    }
}