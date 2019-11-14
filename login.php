<?php
include 'config/conn.php';
if (isset($_POST['login'])) {
	$email = mysqli_real_escape_string($conn, htmlentities($_POST['email']));
	$passwordStr = md5($_POST['password']);
	$password = mysqli_real_escape_string($conn, htmlentities($passwordStr));
	$check = mysqli_query(
		$conn,
		"SELECT * FROM users WHERE email = '$email' AND password = '$password' AND active = 1"
	);
	if (mysqli_num_rows($check) === 1) {
		session_start();
		$userData = mysqli_fetch_array($check);
		$_SESSION['auth']['id'] = $userData['id'];
		$_SESSION['auth']['email'] = $email;
		$_SESSION['role'] = $userData['role'];
		$_SESSION['name'] = $userData['name'];
		$result_array = array();
		$resQuery = $conn->query(
			'SELECT department_id FROM users_department WHERE user_id = ' . $userData['id']
		);
		if ($resQuery->num_rows > 0) {
			while ($row = $resQuery->fetch_assoc()) {
				array_push($result_array, $row['department_id']);
			}
		}
		$_SESSION['departments'] = $result_array;
		if (isset($_POST['remember-me'])) {
			setcookie('cd_onmp', $userData['id'], time() + 43200);
			setcookie('ml_onmp', hash('sha256', $email), time() + 43200);
			setcookie('psss_onmp', $password, time() + 43200);
		}
		header('location:index.php');
		exit;
	} else {
		echo "<script>alert('Invalid email and password'); location.href='login.php';</script>";
	}
}

if (isset($_COOKIE['cd_onmp']) && isset($_COOKIE['ml_onmp']) && isset($_COOKIE['psss_onmp'])) {
	$id = $_COOKIE['cd_onmp'];
	$email = $_COOKIE['ml_onmp'];
	$password = $_COOKIE['psss_onmp'];
	$check = mysqli_query(
		$conn,
		"SELECT * FROM users WHERE id = '$id'"
	);
	$row = mysqli_fetch_assoc($check);
	if ($email === hash('sha256', $row['email']) && $password === $row['password']) {
		header('location:index.php');
		exit;
	}
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Locator Logic</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/png" href="assets/images/icons/favicon.ico" />
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
					<img src="assets\images\icons\onemap-no-title.png" style="margin-left:35%;" width="100" height="100">
					<span class="login100-form-title p-b-10 p-t-25">
						Log in to your account
					</span>
					<span class="txt1 p-b-11">
						Email
					</span>
					<div class="wrap-input100 validate-input m-b-36" data-validate="Email is required">
						<input class="input100" type="email" name="email">
						<span class="focus-input100"></span>
					</div>

					<span class="txt1 p-b-11">
						Password
					</span>
					<div class="wrap-input100 validate-input m-b-12" data-validate="Password is required">
						<span class="btn-show-pass">
							<i class="fa fa-eye"></i>
						</span>
						<input class="input100" type="password" name="password" minlength=5>
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-20">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<a href="forgot_password.php" class="txt3">
								Forgot Password?
							</a>
						</div>
					</div>

					<div class="container-login100-form-btn">
						<button type="submit" name="login" class="login100-form-btn">
							Login
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