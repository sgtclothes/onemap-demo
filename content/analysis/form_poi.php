<?php
for ($i=0; $i <count($an_id_array) ; $i++) { 
?>
<div id="modal_form_poi_<?php echo $an_id_array[$i]; ?>" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Select  POI</h5>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
            <form id="all-poi-analysis-<?php echo $an_id_array[$i]; ?>">
                <ul>
                    <li>
                        <input type="checkbox" value="16" name="an_poi" id="">
                        <label>Bank DKI</label>
                    </li>
                    <li>
                        <input type="checkbox" value="27" name="an_poi" id="">
                        <label>Bank Mandiri</label>
                    </li>
                    <li>
                        <input type="checkbox" value="48" name="an_poi" id="">
                        <label>Bank Sumut</label>
                    </li>
                    <li>
                        <input type="checkbox" value="4" name="an_poi" id="">
                        <label>Apotek K24</label>
                    </li>
                    <li>
                        <input type="checkbox" value="5" name="an_poi" id="">
                        <label>Apotek Kimia Farma</label>
                    </li>
                    <li>
                        <input type="checkbox" value="7" name="an_poi" id="">
                        <label>Apotek Watsons</label>
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
				<h5 class="modal-title">Select  POI</h5>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
            <form id="all-poi-analysis-<?php echo $current; ?>">
                <ul class="treeview">
                    <li>
                        <input type="checkbox" value="16" name="" id="">
                        <label for="tall-1-1" class="custom-unchecked">Bank DKI</label>
                    </li>
                    <li>
                        <input type="checkbox" value="27" name="" id="">
                        <label for="tall-1-2" class="custom-unchecked">Bank Mandiri</label>
                    </li>
                    <li>
                        <input type="checkbox" value="48" name="" id="">
                        <label for="tall-1-3" class="custom-unchecked">Bank Sumut</label>
                    </li>
                    <li>
                        <input type="checkbox" value="4" name="" id="">
                        <label for="tall-1-4" class="custom-unchecked">Apotek K24</label>
                    </li>
                    <li>
                        <input type="checkbox" value="5" name="" id="">
                        <label for="tall-1-5" class="custom-unchecked">Apotek Kimia Farma</label>
                    </li>
                    <li>
                        <input type="checkbox" value="7" name="" id="">
                        <label for="tall-1-6" class="custom-unchecked">Apotek Watsons</label>
                    </li>
                </ul>
            </form>
            </div>
		</div>
	</div>
</div>