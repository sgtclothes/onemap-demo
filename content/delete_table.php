<?php
session_start();
include '../config/conn_user_data.php';
function debug_to_console($data)
{
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo $output;
}

$table_name = $_POST['tableName'];

$drop = "DROP TABLE $table_name";
$conn->query($drop);

echo $table_name;
