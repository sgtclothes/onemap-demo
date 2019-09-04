<?php
include 'config/conn.php';
if (isset($_GET['token'])) {
    $token = $_GET['token'];
    $curDate = date("Y-m-d H:i:s");
    $query = mysqli_query($conn,
        "SELECT * FROM `password_reset_temp` WHERE `token`='".$token."';"
    );
    $row = mysqli_num_rows($query);
    if ($row == "") {
        echo "<script>alert('The link is invalid.'); location.href='forgot_password.php';</script>";
    }
    else {
        $row = mysqli_fetch_assoc($query);
        $expDate = $row['expDate'];
        $email = $row['email'];
        if ($expDate >= $curDate){
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Reset Password - Locator Logic</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="icon" type="image/png" href="assets/images/icons/favicon.ico"/>
            <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" type="text/css" href="assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
            <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">	
            <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
            <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
            <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">	
            <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
            <link rel="stylesheet" type="text/css" href="assets/css/util.css">
            <link rel="stylesheet" type="text/css" href="assets/css/login.css">
        </head>
        <body>
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                        <form action="" method="POST" class="login100-form validate-form flex-sb flex-w">
                            <span class="login100-form-title p-b-32">
                                Reset your password
                            </span>

                            <span class="txt1 p-b-11">
                                Password
                            </span>
                            <div class="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                <input class="input100" type="password" name="password" minlength=5>
                                <span class="focus-input100"></span>
                            </div>

                            <span class="txt1 p-b-11">
                                Re-type Password
                            </span>
                            <div class="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                <input class="input100" type="password" name="re_password" minlength=5>
                                <span class="focus-input100"></span>
                            </div>
                            
                            <div class="flex-sb-m w-full p-b-48">
                                <a role="button" href="login.php" class="login100-form-btn">
                                &#8592; Login
                                </a>
                                <button type="submit" name="reset_password" class="login100-form-btn">
                                Reset &#8594;
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div id="dropDownSelect1"></div>
            <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
            <script src="vendor/animsition/js/animsition.min.js"></script>
            <script src="vendor/bootstrap/js/popper.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
            <script src="vendor/select2/select2.min.js"></script>
            <script src="vendor/daterangepicker/moment.min.js"></script>
            <script src="vendor/daterangepicker/daterangepicker.js"></script>
            <script src="vendor/countdowntime/countdowntime.js"></script>
            <script src="assets/js/login.js"></script>
        </body>
        </html>
        <?php
        }
        else {
            echo "<script>alert('The link is expired. You are trying to use the expired link which as valid only 24 hours (1 days after request).'); location.href='forgot_password.php';</script>";
        }
    }
}

if (isset($_POST['reset_password'])) {
    $password = $_POST['password'];
    $re_password = $_POST['re_password'];
    $pass = mysqli_real_escape_string($conn,htmlentities($password));
    $re_pass = mysqli_real_escape_string($conn,htmlentities($re_password));
    if ($pass!=$re_pass){
        echo "<script>alert('Password do not match, both password should be same.'); location.href='';</script>";
    }
    else {
        $new_password = md5($pass);
        mysqli_query($conn,
            "UPDATE `users` SET `password`='".$new_password."', `updated_at`=NOW() 
            WHERE `email`='".$email."';"
        );
        
        mysqli_query($conn,"DELETE FROM `password_reset_temp` WHERE `email`='".$email."';");
        
        echo "<script>alert('Your password has been updated successfully,'); location.href='login.php';</script>";
    }
}
?>