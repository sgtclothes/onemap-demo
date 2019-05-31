<?php
function data_login($conn,$email){
    $query = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
    $data = mysqli_fetch_array($query);
    return $data;
}