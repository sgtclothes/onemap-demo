<div class="breadcrumb">
                <a href="admin.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <a href="admin.php" class="breadcrumb-item">Users</a>
                <span class="breadcrumb-item active">Add User</span>
            </div>
        </div>
    </div>
</div>

<!-- /content page header -->

<div class="content">
    <div class="mb-3">
        <h6 class="mb-0 font-weight-semibold">
            User
        </h6>
        <div class="add-element" style="margin-left: 59.1rem;">
            <a class="btn btn-outline btn btn-outline-danger btn-sm" href="admin.php" role="button"><i class="icon-cross2 mr-2"></i> Cancel</a>
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
                            <div class="col-md-6">
                                <label class="col-form-label">Email <span class="text-danger">*</span></label>
                                <input type="email" name="email" class="form-control" id="email" required>
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Name <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control" required>
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Role <span class="text-danger">*</span></label>
                                <select name="role" class="form-control" required>
                                    <option value="">Choose an option</option> 
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Password <span class="text-danger">*</span></label>
                                <input type="password" name="password" id="password" class="form-control" required placeholder="Minimum 5 characters allowed">
                            </div>
                            <div class="col-md-6">
                                <label class="col-form-label">Department <span class="text-danger">*</span></label>
                                <select data-placeholder="Choose options" multiple="multiple" class="form-control select" name="department[]" required data-fouc>
                                    <option></option>
                                    <?php
                                    $sql=mysqli_query($conn,"SELECT * FROM department");
                                    while($res=mysqli_fetch_array($sql)){
                                    echo "<option value='$res[id]'>$res[department]</option>";
                                    }
                                    ?>
                                </select>
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
    include 'config/auto_increment.php';
    if (isset($_POST['add'])) {
        $user_id = generateUserId();
        $name = mysqli_real_escape_string($conn,htmlentities($_POST['name']));
        $email = mysqli_real_escape_string($conn,htmlentities($_POST['email']));
        $role = mysqli_real_escape_string($conn,htmlentities($_POST['role']));
        $department = $_POST['department'];
        $passwordStr = md5($_POST['password']);
	    $password = mysqli_real_escape_string($conn,htmlentities($passwordStr));
        $add = mysqli_query($conn,"INSERT INTO users VALUES ('$user_id','$email','$name','$role', '$password', 1)");

        $count_of_department = count($department);
        for ($i=0; $i < $count_of_department ; $i++) {
            $users_department = mysqli_query($conn,"INSERT INTO users_department VALUES ('','$user_id','$department[$i]')");
        }
      
        if ($add && $users_department) {
            echo "<script>alert('Data succeed to save'); location.href='admin.php';</script>";
        }
        else {
            echo "<script>alert('Data failed to save'); location.href='admin.php';</script>";
        }
    }
?>