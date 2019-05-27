<?php
session_start();
if (!isset($_SESSION['email']) || !isset($_SESSION['password'])) {
    echo "<script>alert('Login Required.'); location.href='login.php';</script>";
} else {
    include 'config/conn.php';
    $query = mysqli_query($conn, "SELECT * FROM users WHERE email = '$_SESSION[email]'");
    $data = mysqli_fetch_array($query);
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
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="assets/css/limitless.css" rel="stylesheet" type="text/css">
    <link href="assets/css/layout.css" rel="stylesheet" type="text/css">
    <link href="assets/css/components.css" rel="stylesheet" type="text/css">
    <link href="assets/css/colors.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="assets/css/style.css" />
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

    <!-- /themes & template js files -->

    <style>
        #mapDiv {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/themes/light/main.css">
    <script src="https://js.arcgis.com/4.11/"></script>

    <script type="module" src="lib/lib.js"></script>
    <script src="sample/boottwo.js"></script>
</head>

<body id="main" class="navbar-top sidebar-main-hidden">
    <!-- main navbar -->
    <div class="navbar navbar-expand-md navbar-dark bg-indigo fixed-top">

        <!-- navbar for product-brand -->
        <div class="navbar-brand py-0">
            <a href="index.php" class="d-flex h-100">
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
        </div>
        <!-- /navbar for mobile media -->

        <div class="collapse navbar-collapse" id="navbar-mobile">
            <ul class="navbar-nav">
                <!-- analysis menu item navbar -->
                <li class="nav-item dropdown">
                    <a href="#" class="navbar-nav-link dropdown-toggle legitRipple" data-toggle="dropdown">
                        <i class="icon-stats-bars2 mr-2"></i>Analysis
                    </a>

                    <div class="dropdown-menu dropdown-menu-left">
                        <a id="instant-analysis" href="#" class="sidebar-control sidebar-main-hide d-none d-md-block dropdown-item" data-popup="tooltip-demo" title="Show main" data-placement="bottom" data-container="body" data-trigger="hover">Instant Analysis</a>
                        <a href="#" class="dropdown-item">Site Analysis</a>
                    </div>
                </li>
                <!-- /analysis menu item navbar -->
            </ul>

            <span class="ml-md-3 mr-md-auto"></span>

            <ul class="navbar-nav">
                <!-- user menu item navbar -->
                <li class="nav-item dropdown dropdown-user">
                    <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                        <span><?php echo "$data[name]"; ?></span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a href="#" class="dropdown-item"><i class="icon-user-plus"></i> My profile</a>
                        <div class="dropdown-divider"></div>
                        <?php
                        if ($data['role'] == 'Admin' || $data['role'] == 'System Administrator') {
                            echo "<a href=\"admin.php\" class=\"dropdown-item\"><i class=\"icon-cog5\"></i> Admin</a>";
                        }
                        ?>
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
        <!-- The SideNav Analysis -->
        <div id="mySidenav" class="sidenav">
            <div class="inline">
                <a href="javascript:void(0)" id="closebtn">&times;</a>
            </div>  
            <div id="sidenav-instant">
                <a href="#">Instant Analysis</a>
                <div class="mySelect">
                    <p style="margin-left:10px; margin-top:10px;">Select Analysis</p>
                    <select id="select-analysis">
                        <option value="none">Please Select</option>
                        <option value="buffer">Buffer</option>
                        <option value="driving">Driving</option>
                    </select>
                </div>
                <!-- Buffer Navigator -->
                <div id="resultBuffer">
                    <p style="margin-left:10px; margin-top:10px;">Result Type</p>
                    <select class="select-buffer">
                        <option value="aggregation">Aggregation</option>
                        <option value="segmentation">Segmentation</option>
                    </select>
                    <p style="margin-left:10px; margin-top:10px;">Distance</p>
                    <div id="input-distance-div">
                        <input class="input-distance" type="number" value="1" />
                    </div>
                    <div id="input-distance-div">
                        <input class="input-distance" type="number" value="1" />
                    </div>
                    <p style="margin-left:10px; margin-top:10px;">Unit</p>
                    <select class="select-unit">
                        <option value="meters">Meters</option>
                        <option value="kilometers">Kilometers</option>
                    </select>
                    <div class="button-buffer">
                        <button class="pointingBuffer" style="margin-right: 10px;">
                            Pointing
                        </button>
                        <button style="margin-right: 10px;">Save</button>
                        <button id="remove" style="margin-right: 10px;">Clear</button>
                    </div>
                </div>
                <!-- End of Buffer Navigator -->
                <!-- Driving Navigator -->
                <div id="resultDriving">
                    <p style="margin-left:10px; margin-top:10px;">Driving Data</p>
                    <select class="select-driving">
                        <option>Please Select</option>
                        <option value="live">Live</option>
                        <option value="typical">Typical</option>
                        <option value="historical">Historical</option>
                    </select>
                    <p style="margin-left:10px; margin-top:10px;">Result Type</p>
                    <select class="select-buffer">
                        <option value="aggregation">Aggregation</option>
                        <option value="segmentation">Segmentation</option>
                    </select>
                    <div id="driving-live">
                        <p style="margin-left:10px; margin-top:10px;">Distance</p>
                        <div id="input-distance-div">
                            <input class="input-distance" type="number" />
                        </div>
                        <p style="margin-left:10px; margin-top:10px;">Unit</p>
                        <select class="select-unit">
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                        </select>
                        <p style="margin-left:10px; margin-top:10px;">Driving Direction</p>
                        <select class="select-driving-direction">
                            <option value="toward">Towards Site</option>
                            <option value="away">Away from Site</option>
                        </select>
                    </div>
                    <div class="button-driving">
                        <button class="pointingDrive" style="margin-right: 10px;">
                            Pointing
                        </button>
                        <button style="margin-right: 10px;">Save</button>
                        <button id="remove" style="margin-right: 10px;">Clear</button>
                    </div>
                </div>
            </div>
            <!-- End of Driving Navigator -->
        </div>
        <!-- End of the SideNav Analysis -->
        <!-- Create Buffer Info -->
        <div id="info">
            <label class="chkLabel">Click on map to buffer</label>
            <br />
        </div>
        <!-- End of Create Buffer Info -->

        <div class="content-wrapper">
            <div id="mapDiv"></div>
        </div>
    </div>
    <!-- /page-content-->
</body>
</html>
<?php
}
?>