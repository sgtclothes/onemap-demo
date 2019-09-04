<div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <a href="admin.php" class="breadcrumb-item">Users</a>
                <span class="breadcrumb-item active">Add User</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            User
        </h6>
        <div class="add-element" style="margin-left: 59.1rem;">
            <a class="btn btn-outline btn btn-outline-danger btn-sm" href="admin.php" role="button"><i class="icon-cross2 mr-2"></i> Cancel</a>
        </div>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">Form Insert</h6>
                    <div class="header-elements">
                        <div class="list-icons">
                            <a class="list-icons-item" data-action="collapse"></a>
                            <a class="list-icons-item" data-action="reload"></a>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <form class="form-validate-jquery" action="" method="POST">
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label class="col-form-label">Email <span class="text-danger">*</span></label>
                                <input type="email" name="email" class="form-control" id="email" required>
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Name <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control" required>
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Role <span class="text-danger">*</span></label>
                                <select name="role" class="form-control" required>
                                    <option value="">Choose an option</option> 
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Password <span class="text-danger">*</span></label>
                                <input type="password" name="password" id="password" class="form-control" required placeholder="Minimum 5 characters allowed">
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Department <span class="text-danger">*</span></label>
                                <select data-placeholder="Choose options" multiple="multiple" class="form-control select" name="department[]" required data-fouc>
                                    <option></option>
                                    <?php
                                    $sql=mysqli_query($conn,"SELECT * FROM department");
                                    while($res=mysqli_fetch_array($sql)){
                                    echo "<option value='$res[id]'>$res[department]</option>";
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center">
                            <button type="reset" class="btn btn-light" id="reset">Reset <i class="icon-reload-alt ml-2"></i></button>
                            <button type="submit" name="add" class="btn btn-primary ml-3">Submit <i class="icon-paperplane ml-2"></i></button>
                        </div>
                    </form>			
                </div>
            </div>
        </div>
    </div>
</div>

<?php 
    include 'config/auto_increment.php';
    if (isset($_POST['add'])) {
        $user_id = generateUserId($conn);
        $name = mysqli_real_escape_string($conn,htmlentities($_POST['name']));
        $email = mysqli_real_escape_string($conn,htmlentities($_POST['email']));
        $role = mysqli_real_escape_string($conn,htmlentities($_POST['role']));
        $department = $_POST['department'];
        $passwordStr = md5($_POST['password']);
	    $password = mysqli_real_escape_string($conn,htmlentities($passwordStr));
        $add = mysqli_query($conn,"INSERT INTO users VALUES ('$user_id','$email','$name','$role', '$password', '', 1, NOW(), NULL)");

        if ($add) {
            $count_of_department = count($department);
            for ($i=0; $i < $count_of_department ; $i++) {
                $users_department = mysqli_query($conn,"INSERT INTO users_department VALUES ('','$user_id','$department[$i]', NOW(), NULL)");
            }

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
                                                                            <td>
                                                                                <h2 style=
                                                                                "margin:0!important;font-family:Open Sans,arial,sans-serif!important;line-height:38px!important;font-weight:200!important;color:#252b33!important">
                                                                                Dear '.$name.',</h2>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style=
                                                                            "font-family:Open Sans,arial,sans-serif!important;font-size:16px!important;line-height:30px!important;font-weight:400!important;color:#7e8890!important">
                                                                            Welcome to Locator Logic !
                                                                            <br>Your account has been successfully created.<br>
                                                                            Login using this email and your password.<br>
                                                                            Your password is '.mysqli_real_escape_string($conn,htmlentities($_POST['password'])).'<br>Good luck with your analysis!</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
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
																				"http://onemap-demo.locatorlogic.com"
																				style=
																				"background-color:#3869D4;padding:14px 28px 14px 28px;border-radius:3px;line-height:18px!important;letter-spacing:0.125em;text-transform:uppercase;font-size:13px;font-family:Open Sans,Arial,sans-serif;font-weight:400;color:#ffffff;text-decoration:none;display:inline-block;line-height:18px!important"
																				target=
																				"_blank">Click here to login</a>
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
                                                                <table width="85%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style=
                                                                            "font-family:Open Sans,arial,sans-serif!important;font-size:16px!important;line-height:30px!important;font-weight:400!important;color:#7e8890!important">
                                                                            Regards,<br>Locator Logic<br></td>
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

            $subject = "Account created Notification - Locator Logic";
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
            $mail->send();
            echo "<script>alert('Data succeed to save'); location.href='admin.php';</script>";
        }
        else {
            die('Query Error : '.mysqli_errno($conn).' - '.mysqli_error($conn));
            echo "<script>alert('Data failed to save'); location.href='admin.php';</script>";
        }
    }
?>