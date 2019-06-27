<div class="collapsible" style="padding-right:5px;">
    <h4>
        Buffer
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-buffer ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <div class="form-group">
            <label>Result Type</label>
            <select class="select-buffer form-control" required>
                <option value="aggregation">Aggregation</option>
                <option value="segmentation">Segmentation</option>
            </select>
        </div>

        <div class="form-group">
            <label>Distance</label>
            <input type="text" class="distance form-control" onkeypress="isInteger(event)" title="Please enter number and comma" required>
        </div>

        <div class="form-group">
            <label>Unit</label>
            <select class="select-unit form-control" required>
                <option value="meters">Meters</option>
                <option value="kilometers">Kilometers</option>
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
<script>
$(document).ready(function() {
    $(".distance").each(function() {
        $(this).bind("copy paste cut", function(e){
            e.preventDefault(); //disable cut,copy,paste
            alert('cut,copy & paste options are disabled !!');
        });
    });
});
</script>