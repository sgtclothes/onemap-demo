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
$dbdata = "[";
$query_tables = mysqli_query($conn, "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='user_data' ");
while ($table = mysqli_fetch_assoc($query_tables)) {
    $read = "SELECT * FROM " . $table['TABLE_NAME'];
    if ($query = mysqli_query($conn, $read)) {
        $data = '"' . $table['TABLE_NAME'] . '"' . ",[{";
        while ($row = mysqli_fetch_assoc($query)) {
            foreach ($row as $key => $val) {
                $data .= '"' . $key . '":"' . $val . '",';
            }
            $data = rtrim($data, ", ");
            $data .= "},{";
        }
        $data = rtrim($data, ",{ ");
        $dbdata .= $data . "],";
    }
}
$dbdata = rtrim($dbdata, ", ");
$dbdata .= "]";
echo $dbdata;
$conn->close();
