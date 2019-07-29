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
            <form method="POST" id="form-analysis-<?php echo $num; ?>">
            <td><?php echo $num; ?></td>
            <td><?php echo "$site_anly[name]"; ?></td>
            <td width="20px">
                <input type="hidden" id="id-analysis-<?php echo $num; ?>" name="id_analysis" value="<?php echo "$site_anly[id]"; ?>">
                <input type="hidden" id="name-analysis-<?php echo $num; ?>" name="name_analysis" value="<?php echo "$site_anly[name]"; ?>">
                <button type="submit" class="link">view</button>
                <a>edit</a>
            </td>
            </form>
        </tr>
        <?php
        $num++;
        }
        ?>
    </tbody>
</table>