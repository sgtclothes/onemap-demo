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

<<<<<<< HEAD
echo $tableName;
=======
echo $tableName;
>>>>>>> master
