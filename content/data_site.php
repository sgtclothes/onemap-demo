<!-- Vertical form modal -->
<div id="modal_form_vertical" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">List of Site</h5>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

            <div class="card-body">
                <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                        $sql = "SELECT a.lat AS lat,
                        a.lon AS lon, 
                        a.name AS `name`,
                        a.address AS `address`,
                        b.name AS created_by
                        FROM `site` a
                        INNER JOIN users b
                        ON a.created_by=b.id
                        ORDER BY a.id ASC";
                        $query = mysqli_query($conn,$sql);
                        $num=1;
                        if (!$query) {
                            printf("Error: %s\n", mysqli_error($conn));
                            exit();
                        }
                        while ($site = mysqli_fetch_array($query)) {
                        ?>
                        <tr id="get-site" data-latitude=<?php echo $site['lat']; ?> data-longitude="<?php echo $site['lon']; ?>">
                            <form action="" method="post">
                            <td>
                                <?php echo "$num"; ?>
                                <input type=hidden name='id' value="<?php echo $site['id']; ?>">
                            </td>
                            <td><?php echo "$site[lat]"; ?></td>
                            <td><?php echo "$site[lon]"; ?></td>
                            <td><?php echo "$site[name]"; ?></td>
                            <td><?php echo "$site[address]"; ?></td>
                            <td><?php echo "$site[created_by]"; ?></td>
                            </form>
                        </tr>
                        <?php
                            $num +=1;
                        }
                        ?>
                    </tbody>
                </table>
                </div>
            </div>
		</div>
	</div>
</div>
<!-- /vertical form modal -->
<script type="text/javascript">
$(document).ready(function(){
	$(document).on('click', '#get-site', function (e) {
        let latForm = document.getElementsByClassName('latitude-form')
        let lonForm = document.getElementsByClassName('longitude-form')
        let current = parseInt(latForm.length - 1)
        latForm[current].value = $(this).attr('data-latitude');
        let currentt = parseInt(lonForm.length - 1)
        lonForm[currentt].value = $(this).attr('data-longitude')
	});	
});
</script>