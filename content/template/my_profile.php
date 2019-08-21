<?php
$sqlprofile = "SELECT * FROM users WHERE id=".$_SESSION['auth']['id'];
$queryprofile = mysqli_query($conn,$sqlprofile);
$profile = mysqli_fetch_array($queryprofile);
if ($profile['photo'] === '') {
    $name_user_profile = "icons-profile.png";
    $src = "assets/images/profile/$name_user_profile";
    $display = "display:none;";
}
else {
    $name_user_profile = $profile['photo'];
    $src = "assets/images/profile/$name_user_profile";
    $display = "display:block;";
}
?>
<div id="modal_my_profile" class="modal fade" tabindex="-1">
	<div class="modal-dialog modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">My Profile</h5>
				<button type="button" class="close" id="reset" data-dismiss="modal">&times;</button>
			</div>

            <div class="modal-body">
                <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                    <li class="nav-item"><a href="#bottom-justified-tab1" class="nav-link active" data-toggle="tab">My Profile</a></li>
                    <li class="nav-item"><a href="#bottom-justified-tab2" class="nav-link" data-toggle="tab">Change Photo</a></li>
                    <li class="nav-item"><a href="#bottom-justified-tab3" class="nav-link" data-toggle="tab">Change Password</a></li>
                </ul>

                <div class="tab-content">
                    <div id="bottom-justified-tab1" class="tab-pane fade show active">
                        <table style="border:0px;" class="table table-borderless">
							<tbody>
								<tr style="border:0px;">
                                    <td rowspan='3' align='center'>
                                        <form id="deletePhoto" action="" method="post">
                                        <input type="hidden" class="user_id" name="user_id" value="<?php echo $_SESSION['auth']['id']; ?>">
                                        <div class='delete-photo' style="<?php echo $display; ?>">
                                        <button type="submit" class="btn btn-md btn-light btn-icon rounded-round ml-2"><i style="font-size:18px;" class="mi-delete-forever"></i></button>
                                        </div>
                                        </form>
                                        <img class="user_photo" src="<?php echo $src; ?>" alt="My Photo" width="140px" style="border-radius: 50%; border: 3px solid #F8F8F8; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);">
                                    </td>
									<td style="color:#bcbcbc;">Name</td>
									<td><?php echo $profile['name']; ?></td>
                                </tr>
                                <tr style="border:0px;">
									<td style="color:#bcbcbc;">E-mail</td>
									<td><?php echo $profile['email']; ?></td>
                                </tr>
                                <tr style="border:0px;">
									<td style="color:#bcbcbc;">E-mail</td>
									<td><?php echo $profile['email']; ?></td>
								</tr>
							</tbody>
						</table>
                    </div>

                    <div id="bottom-justified-tab2" class="tab-pane fade">
                        <div class="profile">
                            <div class="photo">
                                <form id="uploadImage" action="" method="post" enctype="multipart/form-data">
                                    <input id="file" type="file" name="file" value="" accept="image/*">
                                    <input type="hidden" class="user_id" name="user_id" value="<?php echo $_SESSION['auth']['id']; ?>">
                                    <div class="photo__helper">
                                        <div class="photo__frame photo__frame--circle">
                                            <canvas class="photo__canvas" title="Drag Photo"></canvas>
                                            <div class="message is-empty">
                                                <p class="message--desktop">Drop your photo here or browse your computer.</p>
                                                <p class="message--mobile">Tap here to select your picture.</p>
                                            </div>
                                            <div class="message is-loading">
                                                <i class="icon-spinner4"></i>
                                            </div>
                                            <div class="message is-dragover">
                                                <i class="icon-cloud-upload"></i>
                                                <p>Drop your photo</p>
                                            </div>
                                            <div class="message is-wrong-file-type">
                                                <p>Only images allowed.</p>
                                                <p class="message--desktop">Drop your photo here or browse your computer.</p>
                                                <p class="message--mobile">Tap here to select your picture.</p>
                                            </div>
                                            <div class="message is-wrong-image-size">
                                                <p>Your photo must be larger than 240px.</p>
                                            </div>
                                            <!-- <div id="success-message-upload" style="display:none;">
                                                <p>File Uploaded Successfully</p>
                                            </div> -->
                                        </div>
                                    </div>

                                    <div class="photo__options hide">
                                        <div class="photo__zoom">
                                            <input type="range" title="Zoom" class="zoom-handler">
                                            <button type="button" class="btn btn-danger remove-my-photos"><i class="mi-delete-forever"></i> Cancel</button>
                                            <button type="submit" id="uploadBtn" class="btn btn-primary">Save <i class="mi-save"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="bottom-justified-tab3"></div>
                </div>
            </div>
		</div>
	</div>
</div>