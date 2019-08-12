<?php
include '../../config/conn.php';
$site_anly_id = $_POST['id_analysis'];
$lat_array = array();
$lon_array = array();
$latsql = 'SELECT * FROM analysis_points WHERE analysis_id='.$site_anly_id;
$result = $conn->query($latsql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($lat_array, $row['lat']);
        array_push($lon_array, $row['lon']);
    }
}
$latitude = json_encode($lat_array);
$longitude = json_encode($lon_array);

$buffer_group_array = array();
$buffer_group = 'SELECT a.id FROM analysis_points a INNER JOIN analysis b ON a.analysis_id=b.id WHERE b.id='.$site_anly_id;
$result_buffer_group = $conn->query($buffer_group);
if ($result_buffer_group->num_rows > 0) {
    while($row_buffer_group = $result_buffer_group->fetch_assoc()) {
        array_push($buffer_group_array, $row_buffer_group['id']);
    }
}

$buffersql = 'SELECT analysis_points_id, distance,unit,options
FROM spec_buffer_analysis a INNER JOIN analysis_points b ON a.analysis_points_id=b.id WHERE analysis_points_id IN (
    SELECT id FROM analysis_points WHERE analysis_id IN (
        SELECT id FROM analysis WHERE id='.$site_anly_id.'
    )
)';

$distance_array = array();
$unit_array = array();
$options_array = array();            
foreach($buffer_group_array as $key=>$value) {
    $result_buffer = $conn->query($buffersql);
    if ($result_buffer->num_rows > 0) {
        $distance_array_i = array();
        $unit_array_i = array();
        $options_array_i = array();
        while($row_buffer = $result_buffer->fetch_assoc()) {
            if ($row_buffer['analysis_points_id']===$value) {
                array_push($distance_array_i, $row_buffer['distance']);
                array_push($unit_array_i, $row_buffer['unit']);
                array_push($options_array_i, $row_buffer['options']);
            }
        }
        array_push($distance_array, $distance_array_i);
        array_push($unit_array, $unit_array_i);
        array_push($options_array, $options_array_i);
    }
}

$distance = json_encode($distance_array);
$unit = json_encode($unit_array);
$options = json_encode($options_array);
$buffer_group = json_encode($buffer_group_array);

$string = "$latitude|$longitude|$distance|$unit|$options|$buffer_group";
echo $string;
?>