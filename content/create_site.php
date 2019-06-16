<form action="" method="POST">
    <div class="form-group row">
        <div class="col-md-6">
            <label class="col-form-label">Latitude</label>
            <input id="lat-site" name="lat" type="text" class="form-control" required class="readonly" readonly>
        </div>
        <div class="col-md-6">
            <label class="col-form-label">Longitude</label>
            <input id="lon-site" name="lon" type="text" class="form-control" required class="readonly" readonly>
        </div>
        <div class="col-md-6">
            <label class="col-form-label">Name</label>
            <input type="text" name="name" class="form-control" required>
        </div>
        <div class="col-md-6">
            <label class="col-form-label">Address</label>
            <textarea rows="3" cols="3" class="form-control" name="address"></textarea>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center">
        <button type="button" id="point-the-site" class="btn btn-light"><i class="icon-pin-alt ml-2"></i> Pointing</button>
        <button type="submit" class="btn bg-teal-400" name="save-site">Save Site <i class="icon-paperplane ml-2"></i></button>
    </div>
</form>	

<?php 
    if (isset($_POST['save-site'])) {
        $lat = $_POST['lat'];
        $lon = $_POST['lon'];
        $name = mysqli_real_escape_string($conn,htmlentities($_POST['name']));
        $address = mysqli_real_escape_string($conn,htmlentities($_POST['address']));
        $add = mysqli_query($conn,"INSERT INTO `site` VALUES ('','$lat', '$lon', '$name', '$address', '$data[id]')");
      
        if ($add) {
            echo "<script>alert('Data succeed to save'); location.href='index.php';</script>";
        }
        else {
            echo "<script>alert('Data failed to save'); location.href='index.php';</script>";
        }
    }
?>