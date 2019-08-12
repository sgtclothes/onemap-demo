<?php 
$distance = $_POST['distance'];
$unit = $_POST['unit'];
?>
<div class="collapsible collapsible-collapsed" style="padding-right:5px;">
    <h4>
        Buffer</button>
    </h4>
    <div class="collapsible-content">
        <div class="form-group">
            <label>Distance</label>
            <input type="text" class="distance number-mask form-control" value="<?php echo $distance; ?>" name="distance" disabled>
        </div>

        <div class="form-group">
            <label>Unit</label>
            <select class="select-unit form-control" name="unit" disabled>
            <?php
                if ($unit === "kilometers") {
                    $unitStr = "Kilometers"; 
                }
                else if ($unit === "miles") {
                    $unitStr = "Miles";
                }
                else {
                    $unitStr = "Meters";
                }
                echo "<option selected value='$unit'>$unitStr</option>";
            ?>
            </select>
        </div>

        <div class="text-right">
            <button type="button" class="btn btn-primary btn-create-buffer">OK</button>
        </div>
    </div>
</div>
<script>
$(function(){
    // initialize collapsibles:
    $( document ).trigger( "enhance" );
});
</script>