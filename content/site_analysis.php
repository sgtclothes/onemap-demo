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
        $num = 1;
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
        ?>
        <tr>
            <td>
                <input type='radio' name='get-point-for-analysis' data-latitude='<?php echo $latitude; ?>' data-longitude='<?php echo $longitude; ?>'>
            </td>
            <td><?php echo "$site_anly[name]"; ?></td>
            <td width="20px">
                <button id="btn_poi_<?php echo $site_anly['id']; ?>" class="btn btn-xs" type="button" data-toggle="modal" data-target="#modal_form_poi_<?php echo $site_anly['id']; ?>">
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