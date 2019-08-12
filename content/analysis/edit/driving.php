<?php 
$distance = $_POST['distance'];
$unit = $_POST['unit'];
$options = intval($_POST['options']);
?>
<div class="collapsible collapsible-collapsed" style="padding-right:5px;">
    <h4>
        Driving Time</button>
    </h4>
    <div class="collapsible-content">
        <!-- Driving Navigator -->
        <div class="form-group">
            <label>Driving Data</label>
            <select class="select-driving form-control" name="options" disabled>
                <?php
                    if ($options === 1) {
                        $str = "Live"; 
                    }
                    else if ($options === 2) {
                        $str = "Typical";
                    }
                    else if ($options === 3) {
                        $str = "Historical";
                    }
                    echo "<option selected value='$options'>$str</option>";
                ?>
            </select>
        </div>

        <?php 
        if ($options === 3) {
        ?>
        <div class="driving-historical" style="display: block;">
            <div class="form-group">
                <label>Distance</label>
                <input type="text" class="distance-time number-mask-time form-control" name="distance" value="<?php echo $distance; ?>" disabled>
            </div>

            <div class="form-group">
                <label>Unit</label>
                <select class="select-unit-time form-control" name="unit" disabled>
                <?php
                    if ($unit === "minutes") {
                        $unitStr = "Minutes"; 
                    }
                    else {
                        $unitStr = "Hours";
                    }
                    echo "<option selected value='$unit'>$unitStr</option>";
                ?>
                </select>
            </div>
        </div>
        <?php 
        }
        ?>

        <!-- <div class="form-group">
            <label>Driving Direction</label>
            <select class="select-driving-direction form-control">
                <option value="toward">Towards Site</option>
                <option value="away">Away from Site</option>
            </select>
        </div> -->

        <div class="text-right">
            <button type="button" class="btn btn-primary btn-create-drive-time">OK</button>
        </div>
        <!-- End of Driving Navigator -->
    </div>
</div>
<script>
$(function(){
    // initialize collapsibles:
    $( document ).trigger( "enhance" );
});
</script>