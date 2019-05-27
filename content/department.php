<div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <span class="breadcrumb-item active">Department</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->
<?php
if (isset($_POST['edit'])) {
    include "update_department.php";
}
else {
?>
<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            Department List
        </h6>
        <div class="add-element">
            <a class="btn btn-outline bg-indigo-400 text-indigo-400 border-indigo-400 btn-sm" href="admin.php?page=add_department" role="button"><i class="icon-plus3 mr-2"></i> New</a>
        </div>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">List of Department</h6>
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
                                <th>Department</th>
                                <th>Action</th>
							</tr>
                        </thead>
						<tbody>
                            <?php 
                            $sql = "SELECT * FROM department";
                            $query = mysqli_query($conn,$sql);
                            $num=1;
                            while ($depart = mysqli_fetch_array($query)) {
                            ?>
							<tr>
                                <form action="" method="post">
								<td>
                                    <?php echo "$num"; ?>
                                    <input type=hidden name='id' value="<?php echo $depart['id']; ?>">
                                </td>
								<td><?php echo "$depart[department]"; ?></td>
                                <td><button type=submit name=edit class=btn bg-teal-400 btn-icon rounded-round><i class=icon-pen2></i></button></td>
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
    $department = $_POST['department'];
    $update = mysqli_query($conn,"UPDATE department SET department='$department' WHERE id = '$id'");
    if ($update) {
        echo "<script>alert('Data succeed to save'); location.href='admin.php?page=department';</script>";
    }
    else {
        echo "<script>alert('Data failed to save'); location.href='admin.php?page=department';</script>";
    }
  }
}
?>