<?php
function data_login($conn,$email){
    $query = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
    $data = mysqli_fetch_array($query);
    return $data;
}
function data_user($conn,$user_id){
    $user_id_array = array();
    $check = "SELECT GROUP_CONCAT(user_id) AS user_list FROM users_department GROUP BY department_id HAVING user_list LIKE '%$user_id%' ORDER BY id";
    $user_list = $conn->query($check);
    if ($user_list->num_rows > 0) {
        while($row = $user_list->fetch_assoc()) {
            array_push($user_id_array, $row['user_list']);
        }
    }
    $duplicate_str = implode(",",$user_id_array);
    $arr_duplicate_str = explode (",",$duplicate_str);
    $array = array_unique($arr_duplicate_str);
    $userlist = implode(",",$array);
    return $userlist;
}