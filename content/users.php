            <div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <span class="breadcrumb-item active">Users</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            User List
        </h6>
        <div class="add-element">
            <a class="btn btn-outline bg-indigo-400 text-indigo-400 border-indigo-400 btn-sm" href="admin.php?page=add_user" role="button"><i class="icon-plus3 mr-2"></i> New</a>
        </div>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">List of User</h6>
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
								<th>Email</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Role</th>
								<th>Active</th>
							</tr>
                        </thead>
						<tbody>
                            <?php 
                            $query = mysqli_query($conn,"SELECT * FROM users ORDER BY id ASC");
                            $num=1;
                            while ($data = mysqli_fetch_array($query)) {
                            ?>
							<tr>
								<td><?php echo "$num"; ?></td>
                                <td><?php echo "$data[email]"; ?></td>
                                <td><?php echo "$data[name]"; ?></td>
								<td><?php echo "$data[department]"; ?></td>
								<td><?php echo "$data[role]"; ?></td>
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
