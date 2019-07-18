<table id="datatable-site" class="table display compact nowrap datatable-sorting">
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

            $distance_array = array();
            $unit_array = array();
            $options_array = array();
            $buffersql = 'SELECT distance,unit,options,created_at FROM spec_buffer_analysis WHERE analysis_points_id IN (SELECT id FROM analysis_points WHERE analysis_id IN (SELECT id FROM analysis WHERE id='.$site_anly['id'].'))';
            $result_buffer = $conn->query($buffersql);
            if ($result_buffer->num_rows > 0) {
                while($row_buffer = $result_buffer->fetch_assoc()) {
                    array_push($distance_array, $row_buffer['distance']);
                    array_push($unit_array, $row_buffer['unit']);
                    array_push($options_array, $row_buffer['options']);
                }
            }
            $distance = json_encode($distance_array);
            $unit = json_encode($unit_array);
            $options = json_encode($options_array);
        ?>
        <tr>
            <td>
                <input type='radio' name='get-point-for-analysis' data-latitude='<?php echo $latitude; ?>' data-longitude='<?php echo $longitude; ?>' data-options='<?php echo $options; ?>' data-unit='<?php echo $unit; ?>' data-distance='<?php echo $distance; ?>' data-values='<?php echo $num; ?>'>
            </td>
            <td><?php echo "$site_anly[name]"; ?></td>
            <td width="20px">
                <button class="btn btn-xs" type="button" data-toggle="modal" data-target="#modal_form_poi" disabled>
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