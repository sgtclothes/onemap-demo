<?php
include '../config/connData.php';
include '../config/ConsolePhp.php';

function data_user($conn)
{
    $user_id_array = array();
    $check = "SELECT GROUP_CONCAT(user_id) AS user_list FROM users_department GROUP BY department_id ORDER BY id";
    $user_list = mysqli_query($conn, $check);
    if (mysqli_num_rows($user_list) > 0) {
        while ($row = mysqli_fetch_assoc($user_list)) {
            array_push($user_id_array, $row['user_list']);
        }
    }
    $duplicate_str = implode(",", $user_id_array);
    $arr_duplicate_str = explode(",", $duplicate_str);
    $array = array_unique($arr_duplicate_str);
    $userlist = implode(",", $array);
    return $userlist;
}

echo data_user($conn);
