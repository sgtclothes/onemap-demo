            <div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <span class="breadcrumb-item active">Users</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->
<?php
if (isset($_POST['edit'])) {
    include "update_user.php";
}
else {
?>
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
                    <div class="table-responsive">
                    <table class="table datatable-sorting">
						<thead>
							<tr>
								<th>#</th>
								<th>Email</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>Active</th>
                                <?php 
                                if ($_SESSION['role']=='System Administrator') {
                                    echo '<th>Action</th>';
                                }
                                ?>
							</tr>
                        </thead>
						<tbody>
                            <?php 
                            $sql = "SELECT a.id AS id,
                            a.email AS email, 
                            a.name AS name,
                            GROUP_CONCAT(c.department) AS department, 
                            a.role AS role,
                            a.active AS active
                            FROM users a
                            INNER JOIN users_department b ON a.id=b.user_id
                            INNER JOIN department c ON b.department_id=c.id
                            GROUP BY b.user_id
                            ORDER BY a.id ASC";
                            $query = mysqli_query($conn,$sql);
                            $num=1;
                            while ($user = mysqli_fetch_array($query)) {
                            ?>
							<tr>
                                <form action="" method="post">
								<td>
                                    <?php echo "$num"; ?>
                                    <input type=hidden name='id' value="<?php echo $user['id']; ?>">
                                </td>
                                <td><?php echo "$user[email]"; ?></td>
                                <td><?php echo "$user[name]"; ?></td>
								<td><?php echo "$user[department]"; ?></td>
								<td><?php echo "$user[role]"; ?></td>
								<td>
                                    <?php 
                                    if ($user['active']==1) {
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
                                <?php 
                                if ($_SESSION['role']=='System Administrator') {
                                    if($user['role']!='System Administrator') {
                                        echo '<td><button type=submit name=edit class=btn bg-teal-400 btn-icon rounded-round><i class=icon-pen2></i></button></td>';
                                    }
                                    else {
                                        echo '<td></td>';
                                        
                                    }
                                }
                                ?>
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
</div>
<?php

if (isset($_POST['update'])) {
    $id = $_POST ['id'];
    $active = $_POST['active'];
    $update = mysqli_query($conn,"UPDATE users SET active='$active', updated_at = NOW() WHERE id = '$id'");
    if ($update) {
        echo "<script>alert('Data succeed to save'); location.href='admin.php';</script>";
    }
    else {
        echo "<script>alert('Data failed to save'); location.href='admin.php';</script>";
    }
  }
}
?>