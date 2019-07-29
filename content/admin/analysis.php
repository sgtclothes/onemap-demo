<div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <span class="breadcrumb-item active">Analysis</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            Analysis List
        </h6>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">List of Analysis</h6>
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
                                <th>Name</th>
                                <th>Created by</th>
                                <th>Actions</th>
							</tr>
                        </thead>
						<tbody>
                            <?php
                            $sql = 'SELECT a.id AS id, a.name AS name, 
                            b.name AS user
                            FROM analysis a
                            INNER JOIN users b ON a.created_by=b.id';
                            $query = mysqli_query($conn,$sql);
                            $num=1;
                            while ($data = mysqli_fetch_array($query)) {
                            ?>
							<tr>
                                <form action="" method="post">
                                <td>
                                    <?php echo "$num"; ?>
                                    <input type=hidden name='id' value="<?php echo $data['id']; ?>">
                                </td>
                                <td><?php echo "$data[name]"; ?></td>
                                <td><?php echo "$data[user]"; ?></td>
                                <td><button type=submit name=del class='btn bg-teal-400 btn-icon rounded-round' onclick="return confirm('Are you sure to delete this data?');"><i class=icon-cancel-circle2></i></button></td>
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
if (isset($_POST['del'])) {
    $id = $_POST['id'];

    $hasil = mysqli_query($conn,"delete from analysis where id='$id'");
    if($hasil){
        echo "<script>alert('Data has been deleted successfully'); location.href='';</script>";
    }
}
?>