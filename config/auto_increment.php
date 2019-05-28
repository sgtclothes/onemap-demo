<?php
function generateUserId() {
    include 'conn.php';
    $query = mysqli_query($conn, "SELECT id from users ORDER BY id DESC LIMIT 1");
    $number = mysqli_fetch_array($query);
    $num = substr($number[0],0);
    $current_number = $number + 1;
    return $current_number;
}
?>