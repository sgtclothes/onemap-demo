<div class="collapsible" style="padding-right:5px;">
    <h4>
        Buffer
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-buffer ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <div class="form-group">
            <label>Result Type</label>
            <select class="select-buffer form-control">
                <option value="aggregation">Aggregation</option>
                <option value="segmentation">Segmentation</option>
            </select>
        </div>

        <div class="form-group">
            <label>Distance</label>
            <input type="text" class="distance form-control">
            <!-- <input type="text" class="form-control" id="tag-input1"> -->
        </div>

        <div class="form-group">
            <label>Unit</label>
            <select class="select-unit form-control">
                <option value="meters">Meters</option>
                <option value="kilometers">Kilometers</option>
            </select>
        </div>

        <div class="text-right">
            <button type="submit" class="btn btn-primary btn-create-buffer">OK</button>
        </div>
    </div>
</div>
<script>
$(function(){
    // initialize collapsibles:
    $( document ).trigger( "enhance" );
});
</script>
<!-- <link href="assets/js/plugins/tags/style.css" rel="stylesheet" type="text/css" />
<script src="assets/js/plugins/tags/tags.js"></script> -->