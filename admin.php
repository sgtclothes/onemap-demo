<?php
session_start();
if (!isset($_SESSION['auth'])) {
    echo "<script>alert('Login Required.'); location.href='login.php';</script>";
}
else {
    include 'config/conn.php';
    $result_array = array();
    $resQuery = $conn->query(
        'SELECT department FROM department where id in ('. implode(',',$_SESSION['departments']).')'
    );
    if ($resQuery->num_rows > 0) {
        while($row = $resQuery->fetch_assoc()) {
            array_push($result_array, $row['department']);
        }
    }
    $data = implode(',',$result_array);
    if ($_SESSION['role']=='Admin' || $_SESSION['role']== 'System Administrator') {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Locator Logic</title>
    <link rel="icon" href="assets/images/icons/favicon.ico">

    <!-- global stylesheets -->
    <!-- @fetch google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900"
          rel="stylesheet"
          type="text/css">
    <link href="assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="assets/css/limitless.css" rel="stylesheet" type="text/css">
    <link href="assets/css/layout.css" rel="stylesheet" type="text/css">
    <link href="assets/css/components.css" rel="stylesheet" type="text/css">
    <link href="assets/css/colors.css" rel="stylesheet" type="text/css">
    <!-- /global stylesheets -->

    <!-- core js files -->
    <script src="assets/js/main/jquery.min.js"></script>
    <script src="assets/js/main/bootstrap.bundle.min.js"></script>
    <script src="assets/js/plugins/loaders/blockui.min.js"></script>
    <script src="assets/js/plugins/ui/perfect_scrollbar.min.js"></script>
    <!-- /core js files -->

    <!-- themes & template js files -->
    <script src="assets/js/layout/default/app.js"></script>
    <script src="assets/js/layout/default/fixed_sidebar_custom_scroll.js"></script>
    <script src="assets/js/plugins/tables/datatables/datatables.js"></script>
    <script src="assets/js/plugins/tables/sorting.js"></script>
    <script src="assets/js/plugins/forms/validation/validate.js"></script>
    <script src="assets/js/plugins/forms/form_validation.js"></script>
	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="assets/js/plugins/forms/form_select2.js"></script>
    <!-- /themes & template js files -->

    <style>
        .add-element{
            margin-left: 59rem;
            margin-top: -1.7rem;
        }
    </style>
</head>
<body class="navbar-top">
<!-- main navbar -->
<div class="navbar navbar-expand-md navbar-dark fixed-top">

    <!-- navbar for product-brand -->
    <div class="navbar-brand py-0">
        <a href="admin.php" class="d-flex h-100">
            <img class="img-fluid my-auto h-auto" src="assets/images/icons/lls-brand.png" alt="">
        </a>
    </div>
    <!-- /navbar for product brand -->

    <!-- navbar for mobile media -->
    <div class="d-md-none">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
            <i class="icon-tree5"></i>
        </button>
        <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
            <i class="icon-paragraph-justify3"></i>
        </button>
        <!-- unfold content action button
        <button class="navbar-toggler sidebar-mobile-component-toggle" type="button">
            <i class="icon-unfold"></i>
        </button>
        -->
    </div>
    <!-- /navbar for mobile media -->

    <div class="collapse navbar-collapse" id="navbar-mobile">
        <ul class="navbar-nav">
            <!-- menu item to control main sidebar toggle -->
            <li class="nav-item">
                <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                    <i class="icon-paragraph-justify3"></i>
                </a>
            </li>
            <!-- /menu item to control main sidebar toggle -->

            <!-- unfold content action button
            <li class="nav-item">
                <a href="#" class="navbar-nav-link sidebar-control sidebar-component-toggle d-none d-md-block">
                    <i class="icon-transmission"></i>
                </a>
            </li>
        --> 
        </ul>

        <span class="ml-md-3 mr-md-auto"></span>

        <ul class="navbar-nav">
            <!-- user menu item navbar -->
            <li class="nav-item dropdown dropdown-user">
                <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                    <span><?php echo "$_SESSION[name]" ?></span>
                </a>

                <div class="dropdown-menu dropdown-menu-right">
                    <a href="#" class="dropdown-item"><i class="icon-user-plus"></i> My profile</a>
                    <div class="dropdown-divider"></div>
                    <a href="index.php" class="dropdown-item"><i class="icon-cog5"></i> Dashboard</a>
                    <a href="logout.php" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
                </div>
            </li>
            <!-- /user menu item navbar -->
        </ul>
    </div>
</div>
<!-- /main-navbar -->

<!-- page content -->
<div class="page-content">
    <!-- main sidebar -->
    <div class="sidebar sidebar-light sidebar-main sidebar-fixed sidebar-expand-md">

        <!-- sidebar mobile toggler -->
        <div class="sidebar-mobile-toggler text-center">
            <a href="#" class="sidebar-mobile-main-toggle">
                <i class="icon-arrow-left8"></i>
            </a>
            Navigation
            <a href="#" class="sidebar-mobile-expand">
                <i class="icon-screen-full"></i>
                <i class="icon-screen-normal"></i>
            </a>
        </div>
        <!-- /sidebar mobile toggler -->


        <!-- sidebar content -->
        <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
                <div class="card-body">
                    <div class="media">
                        <div class="mr-3">
                            <a href="#">
                                <img src="assets/images/icons/logo-user.jpg"
                                     width="38"
                                     height="38"
                                     class="rounded-circle"
                                     alt="">
                            </a>
                        </div>

                        <div class="media-body">
                            <div class="media-title font-weight-semibold"><?php echo "$_SESSION[name]" ?></div>
                            <div class="font-size-xs opacity-50">
                                <i class="icon-office font-size-sm"></i> &nbsp;<?php echo "$data" ?>
                            </div>
                        </div>

                        <div class="ml-3 align-self-center">
                            <a href="#" class="text-white"><i class="icon-cog3"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /user menu -->


            <!-- main navigation -->
            <div class="card card-sidebar-mobile">
                <ul class="nav nav-sidebar" data-nav-type="accordion">
                    <!-- Main -->
                    <li class="nav-item-header">
                        <div class="text-uppercase font-size-xs line-height-xs">Main</div>
                        <i class="icon-menu" title="Main"></i>
                    </li>
                    <li class="nav-item">
                        <a href="admin.php" class="nav-link">
                            <i class="icon-users"></i>
                            <span>Users</span>
                        </a>
                    </li>
                    <!-- <li class="nav-item">
                        <a href="admin.php?page=poi" class="nav-link">
                            <i class="icon-location4"></i>
                            <span>POI</span>
                        </a>
                    </li> -->
                    <li class="nav-item">
                        <a href="admin.php?page=department" class="nav-link">
                            <i class="icon-office"></i>
                            <span>Department</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- /main navigation -->

        </div>
        <!-- /sidebar content -->

    </div>
    <!-- /main sidebar -->

    <!-- main content -->
    <div class="content-wrapper">

        <!-- content page header -->
        <div class="page-header page-header-light">

            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
        
        <?php
            switch ((isset($_GET['page']) ? $_GET['page'] : '')) {
                case 'department':
                    include "content/department.php";
                    break;

                case 'add_department':
                    include "content/add_department.php";
                    break;

                // case 'poi':
                //     include "content/poi.php";
                //     break;
                
                case 'add_user':
                    include "content/add_user.php";
                    break;
                
                default:
                    include "content/users.php";
                    break;
            }
        ?>
    </div>
    <!-- /main content -->
</div>
</div>
<!-- /page-content-->
</body>
</html>
<?php
    }
    else {
        header('location:index.php');
    }
}
?>