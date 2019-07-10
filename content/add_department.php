<div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <a href="admin.php" class="breadcrumb-item">Department</a>
                <span class="breadcrumb-item active">Add Department</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            Department
        </h6>
        <div class="add-element" style="margin-left: 59.1rem;">
            <a class="btn btn-outline btn btn-outline-danger btn-sm" href="admin.php?=page=department" role="button"><i class="icon-cross2 mr-2"></i> Cancel</a>
        </div>
	</div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-light header-elements-inline">
                    <h6 class="card-title">Form Insert</h6>
                    <div class="header-elements">
                        <div class="list-icons">
                            <a class="list-icons-item" data-action="collapse"></a>
                            <a class="list-icons-item" data-action="reload"></a>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <form class="form-validate-jquery" action="" method="POST">
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label class="col-form-label">Department <span class="text-danger">*</span></label>
                                <input type="text" name="department" class="form-control" required>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center">
                            <button type="reset" class="btn btn-light" id="reset">Reset <i class="icon-reload-alt ml-2"></i></button>
                            <button type="submit" name="add" class="btn btn-primary ml-3">Submit <i class="icon-paperplane ml-2"></i></button>
                        </div>
                    </form>			
                </div>
            </div>
        </div>
    </div>
</div>

<?php 
    if (isset($_POST['add'])) {
        $department = mysqli_real_escape_string($conn,htmlentities($_POST['department']));
        $add = mysqli_query($conn,"INSERT INTO department VALUES ('','$department', NOW(), NULL)");
      
        if ($add) {
            echo "<script>alert('Data succeed to save'); location.href='admin.php?page=department';</script>";
        }
        else {
            echo "<script>alert('Data failed to save'); location.href='admin.php?page=department';</script>";
        }
    }
?>