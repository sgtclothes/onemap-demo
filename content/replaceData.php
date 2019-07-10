<?php
session_start();
include '../config/connData.php';
function debug_to_console($data)
{
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo $output;
}

$tableName = $_POST['tableName'];

$drop = "DROP TABLE $tableName";
$conn->query($drop);

array_pop($_POST);
array_pop($_POST);
$keys = array_keys($_POST);
$values = array_values($_POST);
$column_names = implode(" VARCHAR(100), ", $keys);
$column = implode("`, `", $keys);
$field = implode("', '", $values);
$result = mysqli_query($conn, "SELECT 1 FROM $tableName");
if ($result !== FALSE) {
    $insert = "INSERT INTO `$tableName` (`" . $column . "`) VALUES ('" . $field . "')";
    $conn->query($insert);
} else {
    $sql = "CREATE TABLE `$tableName` (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        $column_names VARCHAR(100)
        )";
    $insert = "INSERT INTO `$tableName` (`" . $column . "`) VALUES ('" . $field . "')";
    $conn->query($sql);
    $conn->query($insert);
    $conn->close();
}

<<<<<<< HEAD
$_POST = array();


// while ($table = mysqli_fetch_assoc($query_tables)) {
//     $read = "SELECT * FROM " . $table['TABLE_NAME'];
//     if ($query = mysqli_query($conn, $read)) {
//         $data = '"' . $table['TABLE_NAME'] . '"' . ",[{";
//         while ($row = mysqli_fetch_assoc($query)) {
//             foreach ($row as $key => $val) {
//                 $data .= '"' . $key . '":"' . $val . '",';
//             }
//             $data = rtrim($data, ", ");
//             $data .= "},{";
//         }
//         $data = rtrim($data, ",{ ");
//         $dbdata .= $data . "],";
//     }
// }
// $dbdata = rtrim($dbdata, ", ");
// $dbdata .= "]";
// echo $dbdata;
=======
$_POST = array();
>>>>>>> master
