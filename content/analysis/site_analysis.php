<table id="datatable-site" class="table display compact nowrap table-hover datatable-sorting">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody id="load-data-site-analysis">
        <?php
        $sql = "SELECT * FROM `analysis` ORDER BY created_at DESC";
        $query = mysqli_query($conn,$sql);
        $num = 1;
        while ($site_anly = mysqli_fetch_array($query)) {
        ?>
        <tr>
            <td><?php echo $num; ?></td>
            <td><?php echo $site_anly['name']; ?></td>
            <td width="20px">
                <button id="form-analysis-<?php echo $num; ?>" data-id="<?php echo $site_anly['id']; ?>" data-name="<?php echo $site_anly['name']; ?>" type="button" class="link">view</button>
                <a>edit</a>
            </td>
        </tr>
        <?php
        $num++;
        }
        ?>
    </tbody>
</table>
<script>
    $(document).ready(function() {
        $('#datatable-site').dataTable({
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": false,
            "pageLength": 5,
            "pagingType": "numbers"
        });
    });
</script>