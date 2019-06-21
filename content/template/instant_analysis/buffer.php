<div class="collapsible" style="padding-right:5px;">
    <h4>
        Buffer
        <button type="button" class="btn btn-sm bg-transparent alpha-pink text-pink-800 btn-icon remove-buffer ml-2" style="float:right; margin-top:-6px;"><i class="icon-minus-circle2"></i></button>
    </h4>
    <div class="collapsible-content">
        <p>Result Type</p>
        <select class="select-buffer">
            <option value="aggregation">Aggregation</option>
            <option value="segmentation">Segmentation</option>
        </select>
        <p style="margin-left:10px; margin-top:10px;">Distance</p>
        <div id="input-distance-div">
            <input class="input-distance" type="number" value="1" />
        </div>
        <div id="input-distance-div">
            <input class="input-distance" type="number" value="1" />
        </div>
        <p style="margin-left:10px; margin-top:10px;">Unit</p>
        <select class="select-unit">
            <option value="meters">Meters</option>
            <option value="kilometers">Kilometers</option>
        </select>
        <div class="button-buffer">
            <button class="pointingBuffer" style="margin-right: 10px;">
                Pointing
            </button>
            <button style="margin-right: 10px;">Save</button>
            <button id="remove" style="margin-right: 10px;">Clear</button>
        </div>
        <!-- End of Buffer Navigator -->
    </div>
</div>
<script>
$(function(){
    // initialize collapsibles:
    $( document ).trigger( "enhance" );
});

$(".form-buffer").on("click", ".remove-buffer", function(event) {
    $(this)
    .closest(".collapsible")
    .remove();
});
</script>