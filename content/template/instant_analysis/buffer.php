<div class="collapsible" style="padding-right:5px;">
    <h4>
        Buffer
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-buffer ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <div class="form-group">
            <label>Distance</label>
            <input type="number" min='0' step='.01' class="distance form-control" required>
        </div>

        <div class="form-group">
            <label>Unit</label>
            <select class="select-unit form-control" required>
                <option value="kilometers">Kilometers</option>
                <option value="miles">Miles</option>
                <option value="meters">Meters</option>
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