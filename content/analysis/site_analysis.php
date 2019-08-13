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
                <button data-id="<?php echo $site_anly['id']; ?>" data-name="<?php echo $site_anly['name']; ?>" type="button" class="form-analysis link">view</button>
                <button edit-id="<?php echo $site_anly['id']; ?>" edit-name="<?php echo $site_anly['name']; ?>" type="button" class="edit-analysis link">edit</button>
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
            "pageLength": 10,
            "pagingType": "numbers"
        });
    });
</script>