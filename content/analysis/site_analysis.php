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
        $data = json_decode($_POST['data_analysis']);
        for ($i=0; $i < count($data); $i++) {
            $num = $i+1; 
        ?>        
        <tr>
            <td><?php echo $num; ?></td>
            <td><?php echo $data[$i]->name; ?></td>
            <td width="20px">
                <form method="POST" id="form-analysis-<?php echo $num; ?>">
                <input type="hidden" id="id-analysis-<?php echo $num; ?>" name="id_analysis" value="<?php echo $data[$i]->id; ?>">
                <input type="hidden" id="name-analysis-<?php echo $num; ?>" name="name_analysis" value="<?php echo $data[$i]->name; ?>">
                <button type="submit" class="link">view</button>
                <a>edit</a>
                </form>
            </td>
        </tr>
        <?php
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