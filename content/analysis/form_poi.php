<?php
for ($i=0; $i <count($an_id_array) ; $i++) { 
?>
<div id="modal_form_poi_<?php echo $an_id_array[$i]; ?>" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Select POI</h5>
				<button type="button" class="close-<?php echo $an_id_array[$i]; ?>" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
            <form id="all-poi-analysis-<?php echo $an_id_array[$i]; ?>">
                <ul>
                    <li>
                        <label>
                        <input type="checkbox" value="16" class="an_poi-<?php echo $an_id_array[$i]; ?>">
                        Bank DKI
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="27" class="an_poi-<?php echo $an_id_array[$i]; ?>">
                        Bank Mandiri
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="48" class="an_poi-<?php echo $an_id_array[$i]; ?>">
                        Bank Sumut
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="4" class="an_poi-<?php echo $an_id_array[$i]; ?>">
                        Apotek K24
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="5" class="an_poi-<?php echo $an_id_array[$i]; ?>">
                        Apotek Kimia Farma
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="7" class="an_poi-<?php echo $an_id_array[$i]; ?>">
                        Apotek Watsons
                        </label>
                    </li>
                </ul>
            </div>
		</div>
	</div>
</div>
<?php
}
?>

<?php $current = count($an_id_array)+1; ?>
<div id="modal_form_poi_<?php echo $current; ?>" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Select POI</h5>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
            <form id="all-poi-analysis-<?php echo $current; ?>">
                <ul>
                    <li>
                        <label>
                        <input type="checkbox" value="16" class="an_poi-<?php echo $current; ?>">
                        Bank DKI
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="27" class="an_poi-<?php echo $current; ?>">
                        Bank Mandiri
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="48" class="an_poi-<?php echo $current; ?>">
                        Bank Sumut
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="4" class="an_poi-<?php echo $current; ?>">
                        Apotek K24
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="5" class="an_poi-<?php echo $current; ?>">
                        Apotek Kimia Farma
                        </label>
                    </li>
                    <li>
                        <label>
                        <input type="checkbox" value="7" class="an_poi-<?php echo $current; ?>">
                        Apotek Watsons
                        </label>
                    </li>
                </ul>
            </form>
            </div>
		</div>
	</div>
</div>