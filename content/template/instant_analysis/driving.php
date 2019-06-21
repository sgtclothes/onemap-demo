<div class="collapsible" style="padding-right:5px;">
    <h4>
        Driving Time
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-drive ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <!-- Driving Navigator -->
        <p style="margin-left:10px; margin-top:10px;">Driving Data</p>
        <select class="select-driving">
            <option>Please Select</option>
            <option value="live">Live</option>
            <option value="typical">Typical</option>
            <option value="historical">Historical</option>
        </select>
        <p style="margin-left:10px; margin-top:10px;">Result Type</p>
        <select class="select-buffer">
            <option value="aggregation">Aggregation</option>
            <option value="segmentation">Segmentation</option>
        </select>
        <div id="driving-live">
            <p style="margin-left:10px; margin-top:10px;">Distance</p>
            <div id="input-distance-div">
                <input class="input-distance" type="number" />
            </div>
            <p style="margin-left:10px; margin-top:10px;">Unit</p>
            <select class="select-unit">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
            </select>
            <p style="margin-left:10px; margin-top:10px;">Driving Direction</p>
            <select class="select-driving-direction">
                <option value="toward">Towards Site</option>
                <option value="away">Away from Site</option>
            </select>
        </div>
        <div class="button-driving">
            <button class="pointingDrive" style="margin-right: 10px;">
                Pointing
            </button>
            <button style="margin-right: 10px;">Save</button>
            <button id="remove" style="margin-right: 10px;">Clear</button>
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