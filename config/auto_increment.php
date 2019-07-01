<?php
function generateUserId($conn) {
    $query = mysqli_query($conn, "SELECT id from users ORDER BY id DESC LIMIT 1");
    $number = mysqli_fetch_array($query);
    $num = substr($number[0],0);
    $current_number = $num + 1;
    return $current_number;
}
function autoIncrement($conn,$table) {
    $querypk = mysqli_query($conn, "SELECT id from $table ORDER BY id DESC LIMIT 1");
    if (mysqli_num_rows($querypk)===0) {
        $current_pk = 1;
    }
    else {
        $number = mysqli_fetch_array($querypk);
        $num = substr($number[0],0);
        $current_pk = $num + 1;
    }
    return $current_pk;
}