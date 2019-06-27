<div class="collapsible" style="padding-right:5px;">
    <h4>
        Driving Time
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-drive ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <!-- Driving Navigator -->
        <div class="form-group">
            <label>Driving Data</label>
            <select class="select-driving form-control" required>
                <option>Please Select</option>
                <option value="live">Live</option>
                <option value="typical">Typical</option>
                <option value="historical">Historical</option>
            </select>
        </div>

        <div class="form-group">
            <label>Result Type</label>
            <select class="select-result-type form-control" required>
                <option value="aggregation">Aggregation</option>
                <option value="segmentation">Segmentation</option>
            </select>
        </div>

        <div class="driving-historical">
            <div class="form-group">
                <label>Distance</label>
                <input type="text" class="distance-time form-control" onkeypress="isNumber(event)" title="Please enter number and comma" required>
            </div>

            <div class="form-group">
                <label>Unit</label>
                <select class="select-unit-time form-control" required>
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
<script>
$(document).ready(function() {
    $(".distance-time").each(function() {
        $(this).bind("copy paste cut", function(e){
            e.preventDefault(); //disable cut,copy,paste
            alert('cut,copy & paste options are disabled !!');
        });
    });
});
</script>