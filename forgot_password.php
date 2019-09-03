<?php
include 'config/conn.php';
if (isset($_POST['send_email'])) {
	$email = $_POST['email'];
	$sel_query = "SELECT * FROM `users` WHERE email='".$email."'";
	$results = mysqli_query($conn,$sel_query);
	$row = mysqli_num_rows($results);
	if ($row==""){
		echo "<script>alert('No user is registered with this email address!'); location.href='';</script>";
	} else {
		$expFormat = mktime(
			date("H"), date("i"), date("s"), date("m") ,date("d")+1, date("Y")
		);
		$expDate = date("Y-m-d H:i:s",$expFormat);
		$key = md5(2418*2+$email);
		$addKey = substr(md5(uniqid(rand(),1)),3,10);
		$key = $key . $addKey;
		mysqli_query($conn,
			"INSERT INTO `password_reset_temp` (``, `email`, `key`, `expDate`)
			VALUES ('".$email."', '".$key."', '".$expDate."');"
		);

		$query=mysqli_query(
			$conn,
			"SELECT * FROM users WHERE email = '$email'"
		);
		$row = mysqli_fetch_assoc($query);
		$message = '<html>
		<head>
			<title></title>
		</head>
		<body>
			<table align="center" bgcolor="#EAECED" border="0" cellpadding="0"
			cellspacing="0" width="100%">
				<tbody>
					<tr>
						<td align="center" valign="top">
							<table width="600">
								<tbody>
									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td align="center">
											<table border="0" cellpadding="0"
											cellspacing="0" width="570">
												<tbody>
													<tr>
														<td width="70" align="center">
															<a href="onemap-demo.locatorlogic.com"
															target="_blank"><img alt=
															"Onemap Logo" src=
															"https://lh3.googleusercontent.com/PQy_nE60iaIbzKUkKaBkCoaCwsaN3lHVq_Q-mNMSFwOHe_1M_qyRMtO8XRDv4psO-i9WcuEcYa6kXsFupcR2h0ZdhAz_k1esn8WwuEDth1Lad1v9Nlttk_o6B8L1d1A_BPLKMpeIKmNKV-ROhDiasRBve7K2LA0a6UHPvi5Nwj2rcJsSPzE6PJ6NS9DnVuvqGRdiSysjJ6rSbegf4hLSSE_QRZ3Szh9RPv9B8hlUk2cs-eObc-3bk5adP9eiKj2An_-Dnl4qshlaaVYK8P-FGjIEBEFH7hx95k2QkWOin9RgooeaH3d88GN1Dz1Pq78GT-3EAkCA3Fjgzx5CqAMp3jwOgqYMilKDvlOFwdtsNPI4CFiPzXs2axYP_N-9ydxO93hvq7q8yfG4CT5MzObbzInSnQPui-ldKTgS2GpxW4gBr7fnD0_w58mgRj-Sn5IcIcYyiBINMXTfafGFMHh8gH3DQ3DlB9yxhOpCUI326wuTcFGno7xDOMXs0_vgiMLAc-p-RvJW1BQ73w5OYC_d2EcQYpYv4olfKNlDtcvcziBwRy181qfYy-NyDslbS0aaJ7qVNbzPqJEqD4l36TrNm5okDu3X_urjAiosbyC7Cr5ddw0Q0lU93JCUomAVyFlFXuA5XrwDb-njVjXHinoNywsm0Qiwacg2ldcj-3RSlj7dWvwivLhncm4=w640-h153-no"
															height="50%"></a>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td align="center" valign="top">
											<table bgcolor="#FFFFFF" border="0"
											cellpadding="0" cellspacing="0" style=
											"overflow:hidden!important;border-radius:3px"
											width="580">
												<tbody>
													<tr>
														<td>&nbsp;</td>
													</tr>
													<tr>
														<td align="center">
															<table width="85%">
																<tbody>
																	<tr>
																		<td align=
																		"center">
																			<h2 style=
																			"margin:0!important;font-family:Open Sans,arial,sans-serif!important;line-height:38px!important;font-weight:200!important;color:#252b33!important">
																			Dear '.$row['name'].',</h2>
																		</td>
																	</tr>
																	<tr>
																		<td align=
																		"center" style=
																		"font-family:Open Sans,arial,sans-serif!important;color:#7e8890!important;">
																		You can click on below button to reset your password. This password reset is only valid for the next 24 hours.</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													<tr>
														<td>&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign=
														"top">
															<table border="0"
															cellpadding="0"
															cellspacing="0">
																<tbody>
																	<tr>
																		<td align=
																		"center"
																		valign="top">
																			<a href=
																			"http://get.invisionapp.com/e1t/c/*W8q197m87bTZDW3GQmLK13hZky0/*VClLHz1cdzQpW8w09wP6-dDkH0/5/f18dQhb0Sq5w4fnnwSW43BfBd1m65n7W2shn2V2MDC5CW5-qVB31mhDGsW99bMYS975cK1W4rxpl_5DQqVhV9X0H996Ls8bV43d0S64-rwcW50l_G32yBkSCW2JlhfY5K134SW7cPhlV5lK4xPW33k-n51VctNQW2MznrN5nbq6BVGXpVf3-9KlWW2RRS4L55WhgFW7dDxTN7mWsnXW7dzcsS51vDG6W1ftJ7Z1x4lQBN6Hq25xphxl5W1njMtB6GFVmfW2gvtCX3NnV4FW1nJpwv26pdfjW35y0Td26LytGVM79Bg386nYwW1kLZ4N2CDwWlVgBFGZ6NdswFW4tVp436PbN90W5rb8q2360hP2W6R8LR34TcVnQW4Zy2Z898cxBrW1m9NYf4ph-LLW37SpSR25qFdNMc2CQ-MpgQpW5wdVdL3bYqJqW7q7-Qc6kl2SyW7dr9qW72YqDyW8pnqwr34p5LqW5G0hSP5D3X_kW5BJqQx49jM9bV84rVz6PxM5dW6Q63ZP6MXGH5W4BKzDk8tf9ykN8yly0PQZnnGW2kt1qQ6jFZQYF73vnPn42Pnf5FF9yT03"
																			style=
																			"background-color:#3869D4;padding:14px 28px 14px 28px;border-radius:3px;line-height:18px!important;letter-spacing:0.125em;text-transform:uppercase;font-size:13px;font-family:Open Sans,Arial,sans-serif;font-weight:400;color:#ffffff;text-decoration:none;display:inline-block;line-height:18px!important"
																			target=
																			"_blank">Reset Password</a>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													<tr>
														<td>&nbsp;</td>
													</tr>
													<tr>
														<td align="center">
															<table border="0"
															cellpadding="0"
															cellspacing="0" width=
															"78%">
																<tbody>
																	<tr>
																		<td align=
																		"center" style=
																		"font-family:Open Sans,arial,sans-serif!important;font-size:16px!important;line-height:30px!important;font-weight:400!important;color:#7e8890!important">
																		If you are having trouble with the button above, copy and paste the URL below into your web browser. <br><a href="localhost/onemap/reset.php?token='.$key.'">localhost/onemap/reset.php?token='.$key.'</a><br> Wishing you a pleasant day ahead!.</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
													<tr>
														<td>&nbsp;</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td align="center">
											<table border="0" cellpadding="0"
											cellspacing="0" width="580">
												<tbody>
													<tr>
														<td>
															<div style=
															"width:31%;float:left;display:inline">
															<table bgcolor="#46A9E3"
																border="0" cellpadding=
																"0" cellspacing="0"
																style=
																"border-radius:3px!important"
																width="100%">
																	<tbody>
																		<tr>
																			<td align=
																			"center"
																			valign=
																			"middle">
																				<a href="https://twitter.com/locatorlogic"
																				style=
																				"line-height:50px;display:block;text-decoration:none!important;width:100%"
																				target=
																				"_blank">
																				<img alt="Follow us on Twitter"
																				height=
																				"13"
																				src=
																				"https://ci6.googleusercontent.com/proxy/IwrZh9EljWKss-T4PTfKURLR-mao24jW6K2RkQILCHnJMdnysoqJJMDXyIHwp4rW9oeHUpy5Lxkcp4mfvr8Cbu4-p3FsHlaRVXFJM-_yTU4V6HY4fqNNxlq1ZX9lvGrw2Ts7Wya2CnsoMJvw1W6ctiCkou3rqeW9jW0Z-sTbT2-Avwg7zTmbKypfqt77647yRjetb4rnEQLM=s0-d-e1-ft#https://cdn2.hubspot.net/hub/425470/file-2544477426-png/email/weekly-digest/common/twitter2x.png?t=1452605472977&amp;width=15&amp;height=13"
																				width=
																				"15">
																				<span style="text-decoration:none">
																				&nbsp;</span>
																				<span style="font-family:Open Sans,arial,sans-serif!important;font-size:12px!important;color:#fefefe!important;text-transform:uppercase!important;border-radius:3px!important;text-decoration:none!important;font-weight:400!important">
																				Follow
																				on
																				Twitter</span></a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
															<div style=
															"width:3.5%;min-height:50px;float:left;display:inline">
															</div>
															<div style=
															"width:31%;float:left;display:inline">
															<table bgcolor="#0077B5"
																border="0" cellpadding=
																"0" cellspacing="0"
																style=
																"border-radius:3px!important"
																width="100%">
																	<tbody>
																		<tr>
																			<td align=
																			"center"
																			valign=
																			"middle">
																				<a href="https://www.linkedin.com/company/locator-logic/"
																				style=
																				"line-height:50px;display:block;text-decoration:none!important;width:100%"
																				target=
																				"_blank">
																				<img alt=""
																				src=
																				"https://lh3.googleusercontent.com/FUScQ1ga-NaioB3ZweXkn5hb5Uy_obF4UBRFAMe8Ui9D1prQUpAAWiy8Ct90kylQ5x7bNDU_u44ATVL3vd9chW30CBKiWlS4mAvBJfY6LtWFJbmBPP9XaPESulhpP3Rx9d1-idXQVtJNdDJdJb953fA4w08unkdSHyi7L9pC5Ah4KwSOCQkkECELSNE-6iZXb5yyj1qBb6E82duRJNtnw715S_3BGRlMrjDJHLxCw-1KSunO6r-fpUYey0k8HmgACG5wgjjv948Lf-nkp8J23AhVDkykNTmM5nPr3pIZtDWcUJDdXRjFmPKd8ZDfoufvjLfCkYIEi_Fi_SbY0moSWe5-XHjjt7Z2jpA0qi11xTFwi6JAyxGCx6p5_YNskg3dw_R3YKSUDA9PaL8LPMFvAmZcizi7Yd8cw5cXxEvcLLl2zW-UMDWHMfXoCUwA6hGNCAKujN4-bf3WfdvKIDOaMUWIX_ExJxnnKx6B6sQB1A5S_PSCkDqMwU0ZFtuUgUzMZe9WcyNgL5qkBR5NPHVnLtj7PUbIUI-p6SM5JdbQr4ocJO-YtY9mrczmhcCior8S5vEhYExnxsbNNxGSbdYzFUxJdXLxoxyK3W3zelskL4YdPWlHrATn8ED1Hkh4gwM7XfDDakNYT0o05D9TwHHG4M4h2JJv7-MaeWxTdW3Tmf2vKrAkgJoRYOg=w129-h138-no"
																				style=
																				"border:0;display:inline-block;vertical-align:middle"
																				width=
																				16>
																				<span style="text-decoration:none">
																				&nbsp;</span>
																				<span style="font-family:Open Sans,arial,sans-serif!important;font-size:12px!important;color:#fefefe!important;text-transform:uppercase!important;border-radius:3px!important;text-decoration:none!important;font-weight:400!important">
																				Follow on
																				LinkedIn</span></a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
															<div style=
															"width:3.5%;min-height:50px;float:left;display:inline">
															</div>
															<div style=
															"width:31%;float:left;display:inline">
															<table bgcolor="#A43E9D"
																border="0" cellpadding=
																"0" cellspacing="0"
																style=
																"border-radius:3px!important"
																width="100%">
																	<tbody>
																		<tr>
																			<td align=
																			"center"
																			valign=
																			"middle">
																				<a href="https://instagram.com/locator.logic"
																				style=
																				"line-height:50px;display:block;text-decoration:none!important;width:100%"
																				target=
																				"_blank">
																				<img alt=""
																				height=
																				"15"
																				src=
																				"https://lh3.googleusercontent.com/MzlibXhVdRDgknSJV9GURsS2wfb4lytMypcoIWB0Uslr2KEdrFmF4Vkv9aIy0t9em6Hbe3G4z50-kfPRNJ6VI0gaHN-wcoXEScQzjkNcTCpw-fWvbjd9Y12TDmb8FWJEn-zxz3mj75gFeEB2nKpGYLTmgchWFWI_LH4lxY6Zrb-LyoZ8wN6CXIhyXA96wa68i1ygSGWOHGN7jOUWpEwTMqD0sLuEKy655k0J6j59aTVXWgwTZmegvo1C1J-oWjwxhkanfPvo5CiGOCsfDJv_NmJ-CZ6p_B-9PlnwtD7y2Zbc9F1ba17rgqDmvEm_ArJ04tIGn1NFZVqK9GAq4uO_YIR4B2zpgm9kTyi7O0uGB1F7jb8H5gd1VY9pO1NCGqedhxcpwTpPJqnFH9574kZEPGUndcg31C1XTWyGHVOMMIf9hPFFSW3YwsprClDSZXji7bXVSztVwEQJQPhYU8Wc37vwqeSXCnqoWYD1MoUVhU0L8TXfEIEPXXCyelA_uJRHY5AfccotYi1dT1nZ8WUpvvBPY-MKZ89FldyLs-kdb8GSSzKitN8weQf18yK1GEokB2xYC8GkseYIVOTLhRVnOEFvK5BYP1uzCA7DZQCluL86TcOEL6f1e522xR7eSa23khO1GkgbUGIY1TUK1A2sYZQj7xb3JNvtoE5NWnIU1ZwDJpA4q7eIy9E=w577-h576-no"
																				style=
																				"border:0;display:inline-block;vertical-align:middle">
																				<span style="text-decoration:none">
																				&nbsp;</span>
																				<span style="font-family:Open Sans,arial,sans-serif!important;font-size:12px!important;color:#fefefe!important;text-transform:uppercase!important;border-radius:3px!important;text-decoration:none!important;font-weight:400!important">
																				Follow
																				on
																				Instagram</span></a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td align="center">
											<table border="0" cellpadding="0"
											cellspacing="0" width="580">
												<tbody>
													<tr>
														<td align="center" style=
														"font-family:Open Sans,sans-serif!important;font-weight:400!important;color:#7e8890!important;font-size:12px!important;text-transform:uppercase!important;letter-spacing:.045em!important"
														valign="top">&copy; 2018 Locator Logic Solutions. All rights
												reserved.</td>
													</tr>
													<tr>
														<td>&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign=
														"top">
															<p style=
															"margin-bottom:1em;font-family:Open Sans,sans-serif!important;padding:0!important;margin:0!important;color:#7e8890!important;font-size:12px!important;font-weight:300!important">
															PT. LOCATOR LOGIC SOLUTIONS
															<br>World Trade Centre 1, 14th Floor
															Jl. Jenderal Sudirman Kav. 29 - 31,
															Jakarta 12920, Indonesia
															<br><span role="link"><a href="callto:+62 21 3043 6888">+62 21 3043 6888</a></span>
															<span role="link" ><a href="callto:+62 819 0501 1977">+62 819 0501 1977</a></span>
															</p>
														</td>
													</tr>
													<tr>
														<td>&nbsp;</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</body>
		</html>';

		$subject = "Forget Password - Locator Logic";
		// Enter Your Email Address Here To Receive Email
		$email_to = $email;

		$email_from = "noreply@locatorlogic.com"; // Enter Sender Email
		require("assets/PHPMailer/PHPMailerAutoload.php");

		$mail = new PHPMailer(true);
		$mail->IsSMTP();
		$mail->SMTPSecure = 'tls';
		$mail->Host       = 'mail.locatorlogic.com';
		$mail->Port       = 587;
		$mail->SMTPAuth   = true; 
		$mail->Username   = 'noreply@locatorlogic.com';
		$mail->Password   = 'abc_DEF123!@#';
		$mail->setFrom($email_from, "No-Reply Locator Logic");
		$mail->addAddress($email_to);
		$mail->Subject = $subject;
		$mail->MsgHTML($message);
		// If you know receiver name using following
		//$mail->AddAddress($email_to, "Recepient Name");
		// To send CC remove comment from below
		//$mail->AddCC('username@email.com', "Recepient Name");
		// To send attachment remove comment from below
		//$mail->AddAttachment('files/readme.txt');
		/*
		Please note file must be available on your
		host to be attached with this email.
		*/
		$mail->send();
	}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Locator Logic</title>
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
						Forget Password
					</span>

					<span class="txt1 p-b-11">
						Email
					</span>
					<div class="wrap-input100 validate-input m-b-36" data-validate = "Email is required">
						<input class="input100" type="email" name="email" >
						<span class="focus-input100"></span>
					</div>
					
					<div class="flex-sb-m w-full p-b-48">
						<a role="button" href="login.php" class="login100-form-btn">
						&#8592; Login
						</a>
						<button type="submit" name="send_email" class="login100-form-btn">
						Reset Password &#8594;
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