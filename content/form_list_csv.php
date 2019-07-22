<?php
$fields = $_POST['fields'];
$values = $_POST['values'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
?>
<div id="modal_form_csv" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">List of CSV</h5>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>
        
            <div class="card-body">
                <ul class="nav nav-tabs">
                <?php
                    for($i = 0; $i<count($fields); $i++){
                        $tab = $i+1;
                        if ($tab === 1) {
                            $active = 'active';
                        }
                        else {
                            $active = '';
                        }
                        echo "<li class='nav-item'><a href='#basic-tab$tab' class='nav-link $active' data-toggle='tab'>$tab</a></li>";
                    }
                ?>
                </ul>

                <div class="tab-content">
                <?php
                    for($j = 0; $j<count($fields); $j++){
                        $tab = $j+1;
                        if ($tab === 1) {
                            $active = 'show active';
                        }
                        else {
                            $active = '';
                        }
                        $columns = "<th>#</th>";
                        foreach ($fields[$j] as $field){
                            $columns .= "<th>$field</th>";
                        }

                        $rows = "";
                        $latpoint = $latitude[$j];
                        $lonpoint = $longitude[$j];

                        $x=0;
                        $point_array = array();
                        while($x < count($latpoint)){
                            $point = "<input type='checkbox' name='get-csv$j' data-latitude$j='$latpoint[$x]' data-longitude$j='$lonpoint[$x]'>";
                            array_push($point_array,$point);
                            $x++;
                        }
                        for ($y=0; $y <count($values[$j]) ; $y++) { 
                            $rows .= "<tr>";
                            $rows .= "<td>$point_array[$y]</td>";
                            foreach ($values[$j][$y] as $value){
                                $rows .= "<td>$value</td>";
                            }
                            $rows .= "</tr>";
                        }
                        $table = "<div class='table-responsive'><table id='datatable-csv$tab' class='table table-striped table-hover datatable-sorting '><thead><tr>$columns</tr></thead><tbody>$rows</tbody></table><button type='button' id='select-row-csv$j' class='btn bg-teal-400'>Select</button></div>";

                        echo "<div class='tab-pane fade $active' id='basic-tab$tab'>$table</div>";
                    }
                ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
    for($z = 0; $z<count($fields); $z++){
        $tab = $z+1;
        echo "<script>$.fn.dataTable.ext.errMode = 'none'; $(document).ready(function() {
        $('#datatable-csv$tab').dataTable({'bLengthChange': false,'bFilter': true,'pageLength': 4});});</script>";
    }
?>