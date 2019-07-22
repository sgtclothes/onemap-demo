<table id="datatable-site" class="table display compact nowrap table-hover datatable-sorting">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
        </tr>
    </thead>
    <tbody id="load-data-site-analysis">
        <?php
        $sql = "SELECT * FROM `analysis` ORDER BY created_at DESC";
        $query = mysqli_query($conn,$sql);
        $num = 0;
        while ($site_anly = mysqli_fetch_array($query)) {
            $lat_array = array();
            $lon_array = array();
            $latsql = 'SELECT * FROM analysis_points WHERE analysis_id='.$site_anly['id'];
            $result = $conn->query($latsql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($lat_array, $row['lat']);
                    array_push($lon_array, $row['lon']);
                }
            }
            $latitude = json_encode($lat_array);
            $longitude = json_encode($lon_array);

            $buffer_group_array = array();
            $buffer_group = 'SELECT a.id FROM analysis_points a INNER JOIN analysis b ON a.analysis_id=b.id WHERE b.id='.$site_anly['id'];
            $result_buffer_group = $conn->query($buffer_group);
            if ($result_buffer_group->num_rows > 0) {
                while($row_buffer_group = $result_buffer_group->fetch_assoc()) {
                    array_push($buffer_group_array, $row_buffer_group['id']);
                }
            }

            $buffersql = 'SELECT analysis_points_id, distance,unit,options
            FROM spec_buffer_analysis a INNER JOIN analysis_points b ON a.analysis_points_id=b.id WHERE analysis_points_id IN (
                SELECT id FROM analysis_points WHERE analysis_id IN (
                    SELECT id FROM analysis WHERE id='.$site_anly['id'].'
                )
            )';

            $distance_array = array();
            $unit_array = array();
            $options_array = array();            
            foreach($buffer_group_array as $key=>$value) {
                $result_buffer = $conn->query($buffersql);
                if ($result_buffer->num_rows > 0) {
                    $distance_array_i = array();
                    $unit_array_i = array();
                    $options_array_i = array();
                    while($row_buffer = $result_buffer->fetch_assoc()) {
                        if ($row_buffer['analysis_points_id']===$value) {
                            array_push($distance_array_i, $row_buffer['distance']);
                            array_push($unit_array_i, $row_buffer['unit']);
                            array_push($options_array_i, $row_buffer['options']);
                        }
                    }
                    array_push($distance_array, $distance_array_i);
                    array_push($unit_array, $unit_array_i);
                    array_push($options_array, $options_array_i);
                }
            }
            
            $distance = json_encode($distance_array);
            $unit = json_encode($unit_array);
            $options = json_encode($options_array);
            $buffer_group = json_encode($buffer_group_array);
        ?>
        <tr>
            <td>
                <input type='radio' name='get-point-for-analysis' data-latitude='<?php echo $latitude; ?>' data-longitude='<?php echo $longitude; ?>' data-options='<?php echo $options; ?>' data-unit='<?php echo $unit; ?>' data-distance='<?php echo $distance; ?>' data-values='<?php echo $buffer_group; ?>' data-source='db'>
            </td>
            <td><?php echo "$site_anly[name]"; ?></td>
            <td width="20px">
                <button class="btn-modal-form-poi" type="button" data-toggle="modal" data-target="#modal_form_poi" disabled>
                    <i class="icon-pin-alt"></i>
                </button>
            </td>
        </tr>
        <?php
        $num++;
        }
        ?>
    </tbody>
</table>