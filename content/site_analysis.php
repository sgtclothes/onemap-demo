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
        $num=1;
        if (!$query) {
            printf("Error: %s\n", mysqli_error($conn));
            exit();
        }
        while ($site_anly = mysqli_fetch_array($query)) {
        ?>
        <tr>
            <td>
                <input type='checkbox' name='get-site' data-latitude='' data-longitude=''>
            </td>
            <td><?php echo "$site_anly[name]"; ?></td>
        </tr>
        <?php
        }
        ?>
    </tbody>
</table>