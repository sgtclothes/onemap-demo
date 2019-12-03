<!DOCTYPE html>
<html lang="en">

<head>
	<title>Locator Logic</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="assets/js/jquery-1.12.4.js"></script>
	<script src="assets/js/jquery-1.12.1.js"></script>
	<script src="assets/js/jquery.cookie.min.js"></script>
	<script>
		if (Cookies.get('username') && Cookies.get('password')) {
			window.location.replace("index.php")
		} else {
			console.log("Logged out")
		}
	</script>
	<link rel="icon" type="image/png" href="assets\images\icons\onemap-no-title.png" />
	<link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/themes/light/main.css">
	<script src="https://js.arcgis.com/4.11/"></script>
	<script type="module" src="lib/lib.js"></script>
	<script src="sample/loginBoot.js"></script>
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
		<div style="background-color: #1A255D;" class="container-login100">
			<div>
				<div class="wrap-login100 p-l-85 p-r-85 p-t-20 p-b-30">
					<img src="assets\images\icons\onemap-no-title.png" style="margin-left:37%;" width="100" height="100" />
					<span style="text-align:center" class="login100-form-title p-b-10 p-t-10">
						Log in to your account
					</span>
					<div id="username-password-handler-login-onemap" class="alert alert-error">
						<button class="close" data-dismiss="alert"></button>
						<div>
							Invalid username and password.
						</div>
					</div>
					<span class="txt1 p-b-11">
						Username
					</span>
					<div class="wrap-input100 m-b-20" data-validate="Username is required">
						<input id="user-username-onemap" class="input100" type="username" name="username" />
						<span class="focus-input100"></span>
					</div>
					<span class="txt1 p-b-11">
						Password
					</span>
					<div class="wrap-input100 validate-input m-b-12" data-validate="Password is required">
						<span id="see-password-user-onemap" class="btn-show-pass">
							<i class="fa fa-eye"></i>
						</span>
						<input id="user-password-onemap" class="input100" type="password" name="password" minlength="5" />
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-20">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
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
						<button style="background-color: #1A255D;" id="submit-login-onemap" class="login100-form-btn">
							Login
						</button>
					</div>
				</div>
				<div style="color: white; margin-top: 10px; text-align: center;">
					2019 © locatorlogic.com
				</div>
			</div>
		</div>

	</div>
	<div id="dropDownSelect1"></div>
	<script src="assets/js/query/query.js"></script>
	<script src="assets/js/crypt/Barret.js"></script>
	<script src="assets/js/crypt/BigInt.js"></script>
	<script src="assets/js/crypt/RSA.js"></script>
	<script src="assets/js/crypt/token.js"></script>
	<script src="assets/js/request/request.js"></script>
</body>

</html>