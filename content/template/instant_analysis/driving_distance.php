<div class="collapsible" style="padding-right:5px;">
    <h4>
        Driving Distance
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-drive-distance ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <!-- Driving Navigator -->
        <div class="form-group">
            <label>Driving Data</label>
            <select class="select-driving-distance form-control" required name="options">
                <option>Please Select</option>
                <option value=1>Live</option>
                <option value=2>Typical</option>
                <option value=3>Historical</option>
            </select>
        </div>

        <div class="driving-historical">
            <div class="form-group">
                <label>Distance</label>
                <input type="text" class="distance-time-distance number-mask-dis form-control" required name="distance">
            </div>

            <div class="form-group">
                <label>Unit</label>
                <select class="select-unit-time-distance form-control" required name="unit">
                    <option value="kilometers">Kilometers</option>
                    <option value="miles">Miles</option>
                    <option value="meters">Meters</option>
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
            <button type="button" class="btn btn-primary btn-create-drive-time-distance">OK</button>
        </div>
        <!-- End of Driving Navigator -->
    </div>
</div>
<script>
$(function(){
    // initialize collapsibles:
    $( document ).trigger( "enhance" );
});

var numberMaskTimeClass = document.getElementsByClassName('number-mask-dis');
var aa;

for (aa = 0; aa < numberMaskTimeClass.length; aa++) {
    var numberMask = IMask(numberMaskTimeClass[aa],
        {
            mask: Number,
            scale: 0,
            min: 0,
            max: 999,
            thousandsSeparator: ' '
        }
    );
}
</script>