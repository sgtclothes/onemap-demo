<?php
include '../config/conn.php';
include '../config/ConsolePhp.php';

function data_user($conn)
{
    $user_id_array = "";
    $check = "SELECT users.id, users.name, department.department FROM users,department,users_department WHERE users.id=users_department.user_id AND users_department.department_id=department.id";
    $user_list = mysqli_query($conn, $check);
    if (mysqli_num_rows($user_list) > 0) {
        while ($row = mysqli_fetch_assoc($user_list)) {
            foreach ($row as $key) {
                $user_id_array .= '"' . $key . '",';
            }
        }
    }
    $user_id_array = rtrim($user_id_array, ", ");
    return "[" . $user_id_array . "]";
}

echo data_user($conn);
