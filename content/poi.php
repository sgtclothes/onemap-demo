            <div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <span class="breadcrumb-item active">POI</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            POI List
        </h6>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">List of POI</h6>
                    <div class="header-elements">
                        <div class="list-icons">
                            <a class="list-icons-item" data-action="collapse"></a>
                            <a class="list-icons-item" data-action="reload"></a>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <table class="table datatable-sorting">
						<thead>
							<tr>
								<th>#</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Region</th>
                                <th>Shape</th>
                                <th>Created by</th>
                                <th>Active</th>
							</tr>
                        </thead>
						<tbody>
                            <?php 
                            $sql = "SELECT a.type AS type, 
                            a.name AS name, 
                            a.lat AS lat, 
                            a.lon AS lon, 
                            a.region AS region, 
                            a.shape AS shape, 
                            a.active AS active, 
                            b.name AS name_of_user
                            FROM poi a
                            JOIN users b ON a.created_by=b.id
                            ORDER BY a.id DESC";
                            $query = mysqli_query($conn,$sql);
                            $num=1;
                            while ($data = mysqli_fetch_array($query)) {
                            ?>
							<tr>
								<td><?php echo "$num"; ?></td>
                                <td><?php echo "$data[type]"; ?></td>
                                <td><?php echo "$data[name]"; ?></td>
								<td><?php echo "$data[lat]"; ?></td>
                                <td><?php echo "$data[lon]"; ?></td>
                                <td><?php echo "$data[region]"; ?></td>
                                <td><?php echo "$data[shape]"; ?></td>
                                <td><?php echo "$data[name_of_user]"; ?></td>
								<td>
                                    <?php 
                                    if ($data['active']==1) {
                                    ?>
                                    <span class="badge badge-success">Active</span>
                                    <?php
                                    } 
                                    else {
                                    ?>
                                    <span class="badge badge-secondary">Inactive</span>
                                    <?php
                                    }
                                    ?>
                                </td>
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
