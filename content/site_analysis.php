<table id="datatable-site" class="table display compact nowrap datatable-sorting">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody id="load-data-site-analysis">
        <?php 
        $sql = "SELECT * FROM `analysis` ORDER BY created_at DESC";
        $query = mysqli_query($conn,$sql);
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
                <input type='checkbox' name='get-site' data-latitude='<?php echo $latitude; ?>' data-longitude='<?php echo $longitude; ?>'>
            </td>
            <td><?php echo "$site_anly[name]"; ?></td>
        </tr>
        <?php
        }
        ?>
    </tbody>
</table>