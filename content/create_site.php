<form method="POST" id="form-site">
    <div class="form-group row">
        <div class="col-md-6">
            <label class="col-form-label">Latitude</label>
            <input id="lat-site" name="lat" type="text" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="col-form-label">Longitude</label>
            <input id="lon-site" name="lon" type="text" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="col-form-label">Name</label>
            <input id="name" type="text" name="name" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="col-form-label">Address</label>
            <textarea id="address" rows="3" cols="3" class="form-control" name="address"></textarea>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center">
        <button type="button" id="point-the-site" class="btn btn-light"><i class="icon-pin-alt ml-2"></i> Pointing</button>
        <button type="submit" id="save-site" class="btn bg-teal-400">Save Site <i class="icon-paperplane ml-2"></i></button>
    </div>
</form>