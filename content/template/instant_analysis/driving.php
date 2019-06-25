<div class="collapsible" style="padding-right:5px;">
    <h4>
        Driving Time
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-drive ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <!-- Driving Navigator -->
        <div class="form-group">
            <label>Driving Data</label>
            <select class="select-driving form-control">
                <option>Please Select</option>
                <option value="live">Live</option>
                <option value="typical">Typical</option>
                <option value="historical">Historical</option>
            </select>
        </div>

        <div class="form-group">
            <label>Result Type</label>
            <select class="select-result-type form-control">
                <option value="aggregation">Aggregation</option>
                <option value="segmentation">Segmentation</option>
            </select>
        </div>

        <div class="driving-historical">
            <div class="form-group">
                <label>Distance</label>
                <input type="text" class="distance-time form-control">
            </div>

            <div class="form-group">
                <label>Unit</label>
                <select class="select-unit-time form-control">
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                </select>
            </div>
        </div>

        <!-- <div class="form-group">
            <label>Driving Direction</label>
            <select class="select-driving-direction form-control">
                <option value="toward">Towards Site</option>
                <option value="away">Away from Site</option>
            </select>
        </div> -->

        <div class="text-right">
            <button type="submit" class="btn btn-primary btn-create-drive-time">OK</button>
        </div>
        <!-- End of Driving Navigator -->
    </div>
</div>

<script>
$(function(){
    // initialize collapsibles:
    $( document ).trigger( "enhance" );
});

var $driveClass = $(".remove-drive").parents().get(2).className
$('.'+$driveClass).on("click", ".remove-drive", function() {
    $(this)
    .closest(".collapsible")
    .remove();
});
</script>