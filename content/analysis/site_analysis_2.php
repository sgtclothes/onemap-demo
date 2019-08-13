<div id="tbl-analysis-div" class="table-responsive tbl">
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
                    <button data-id="<?php echo $data[$i]->id; ?>" data-name="<?php echo $data[$i]->name; ?>" type="button" class="form-analysis link">view</button>
                    <button edit-id="<?php echo $data[$i]->id; ?>" edit-name="<?php echo $data[$i]->name; ?>" type="button" class="edit-analysis link">edit</button>
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
</div>