<!-- Vertical form modal -->
<div id="modal_form_input_point" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Input Latitude and Longitude</h5>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
                <div class="form-group row">
                    <div class="col-md-6">
                        <label style="font-size:12px" class="lat-message col-form-label"></label>
                        <label class="col-form-label">Latitude</label>
                        <input id="lat-input" name="lat" type="text" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label style="font-size:12px" class="lon-message col-form-label"></label>
                        <label class="col-form-label">Longitude</label>
                        <input id="lon-input" name="lon" type="text" class="form-control" required>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <button type="button" id="ok-input" class="btn bg-teal-400">OK</button>
                </div>
            </div>
		</div>
	</div>
</div>
<!-- /vertical form modal -->