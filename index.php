<?php
session_start();
include 'config/conn.php';
if (isset($_COOKIE['cd_onmp']) && isset($_COOKIE['ml_onmp']) && isset($_COOKIE['psss_onmp'])) {
    $id = $_COOKIE['cd_onmp'];
    $email = $_COOKIE['ml_onmp'];
    $password = $_COOKIE['psss_onmp'];
    $check = mysqli_query(
        $conn,
        "SELECT * FROM users WHERE id = '$id'"
    );
    $row = mysqli_fetch_assoc($check);
    if ($email === hash('sha256', $row['email']) && $password === $row['password']) {
        $_SESSION['auth']['id'] = $id;
        $_SESSION['auth']['email'] = $email;
        $_SESSION['role'] = $row['role'];
        $_SESSION['name'] = $row['name'];
        $result_array = array();
        $resQuery = $conn->query(
            'SELECT department_id FROM users_department WHERE user_id = ' . $row['id']
        );
        if ($resQuery->num_rows > 0) {
            while ($row = $resQuery->fetch_assoc()) {
                array_push($result_array, $row['department_id']);
            }
        }
        $_SESSION['departments'] = $result_array;
    } else {
        header('Location: login.php');
        exit;
    }
}
if (!isset($_SESSION['auth'])) {
    header('Location: login.php');
    exit;
} else {
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
        <link rel="stylesheet" href="assets/css/icons/material/styles.css">
        <link rel="stylesheet" href="assets/css/icons/fontawesome/styles.min.css">
        <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
        <link href="assets/css/limitless.css" rel="stylesheet" type="text/css">
        <link href="assets/css/layout.css" rel="stylesheet" type="text/css">
        <link href="assets/css/components.css" rel="stylesheet" type="text/css">
        <link href="assets/css/colors.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="assets/css/style.css" type="text/css" />
        <!-- <link href="assets/colors/jsColor.css" rel="stylesheet" type="text/css" /> -->
        <link href="assets/js/plugins/tree/tree_analysis.css" rel="stylesheet" type="text/css" />
        <link href="assets/js/plugins/tree/checkboxes.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="assets/css/jquery/jquery-ui-1.12.1.css">
        <script src="assets/js/jquery-1.12.4.js"></script>
        <script src="assets/js/jquery-1.12.1.js"></script>
        <link href="assets/js/plugins/collapsible/style.css" rel="stylesheet" type="text/css" />
        <!-- /global stylesheets -->

        <!-- Adding other css -->
        <link rel="stylesheet" href="assets/css/section/popup-alert-require-text-input.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/section/awesome-bootstrap-checkbox.css" type="text/css" />
        <link href="assets/css/section/fontawesome-5.0.1-all.css" rel="stylesheet">

        <link rel="stylesheet" href="assets/js/plugins/my_profile/my_profile_form.css">

        <script src="assets/js/main/bootstrap.bundle.min.js"></script>
        <script src="assets/js/plugins/loaders/blockui.min.js"></script>
        <script src="assets/js/plugins/ui/perfect_scrollbar.min.js"></script>
        <!-- /core js files -->

        <!-- themes & template js files -->
        <script src="assets/js/plugins/tables/datatables/datatables.js"></script>
        <script src="assets/js/plugins/forms/checkboxes/form_checkboxes_radios.js"></script>
        <!-- <script type="text/javascript" src="http://www.dematte.at/cpn/colors.js"></script>
        <script type="text/javascript" src="http://www.dematte.at/cpn/colorPicker.data.js"></script>
        <script type="text/javascript" src="http://www.dematte.at/cpn/colorPicker.js"></script>
        <script type="text/javascript" src="assets/colors/jsColor.js"></script> -->
        <!-- <script type="text/javascript" src="assets/js/plugins/tree/tree.js"></script> -->
        <script src="assets/js/layout/default/app.js"></script>
        <script src="https://unpkg.com/imask"></script>
        <!-- /themes & template js files -->

        <style>
            #mapDiv {
                height: 100%;
                width: 100%;
                overflow: hidden;
            }

            #colors-div {
                background-color: white;
                border-radius: 8px;
                padding: 8px;
                opacity: 0.92;
            }

            .width-buff-dropdown {
                width: 50px;
            }
        </style>
        <link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/themes/light/main.css">
        <script src="https://js.arcgis.com/4.11/"></script>

        <script type="module" src="lib/lib.js"></script>
        <script type="text/javascript">
            let host = "<?= $dbhost ?>"
            let user = "<?= $dbuser ?>"
            let pass = "<?= $dbpass ?>"
            window.created_by = "<?= $_SESSION['auth']['id'] ?>"
            localStorage.setItem("created_by", created_by)
        </script>

        <script src="sample/boot.js"></script>
        <!-- <script src="content/analysis/dataAnalysis.js"></script> -->
        <script src="content/template/instant_analysis/buffers.js"></script>
        <script src="content/template/instant_analysis/drivetimeDistance.js"></script>
        <script src="content/template/instant_analysis/drivetime.js"></script>
    </head>

    <body id="main" class="navbar-top sidebar-main-hidden">

        <!-- main navbar -->
        <div class="navbar navbar-expand-md navbar-dark bg-indigo fixed-top">

            <!-- navbar for product-brand -->
            <div class="navbar-brand py-0">
                <a href="index.php" class="d-flex h-100">
                    <img class="img-fluid my-auto h-auto" style="width:145px; height:24px;" src="assets/images/icons/logo-fix.png" alt="">
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
                    <!-- Sidenav layers -->
                    <li class="nav-item">
                        <a id="viewer-nav" href="#" class="navbar-nav-link">
                            <i class="icon-list-unordered mr-2"></i>Layers
                        </a>
                    </li>
                    <!-- End of Sidenav layer -->
                    <!-- Sidenav analysis -->
                    <li class="nav-item dropdown">
                        <a href="#" class="navbar-nav-link dropdown-toggle legitRipple" data-toggle="dropdown">
                            <i class="icon-stats-bars2 mr-2"></i>Analysis
                        </a>

                        <div class="dropdown-menu dropdown-menu-left">
                            <a id="instant-analysis" href="#" class="dropdown-item">Select Sites</a>
                            <a style="display:none;" id="myModal" href="#" class="dropdown-item">Drag and Drop CSV</a>
                            <a id="site-analysis" href="#" class="dropdown-item">Sites List</a>
                        </div>
                    </li>
                    <!-- End of Sidenav analysis -->
                    <!-- Dashboard Menu -->
                    <li class="nav-item">
                        <a id="menu-dashboard" href="dashboard.php" class="navbar-nav-link">
                            <i class="mi-dashboard"></i> Dashboard
                        </a>
                    </li>
                    <!-- End of Dashboard Menu -->
                    <!-- /analysis menu item navbar -->
                </ul>

                <span class="ml-md-3 mr-md-auto"></span>

                <ul class="navbar-nav">
                    <!-- user menu item navbar -->
                    <li class="nav-item dropdown dropdown-user">
                        <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                            <?php
                                $sqlphoto = "SELECT photo FROM users WHERE id=" . $_SESSION['auth']['id'];
                                $queryphoto = mysqli_query($conn, $sqlphoto);
                                $photo = mysqli_fetch_array($queryphoto);
                                if ($photo['photo'] === '') {
                                    $name_user_photo = "icons-profile.png";
                                    $src = "assets/images/profile/$name_user_photo";
                                } else {
                                    $name_user_photo = $photo['photo'];
                                    $src = "assets/images/profile/$name_user_photo";
                                }
                                ?>
                            <img class="user_photo" src="<?php echo $src; ?>" alt="My Photo" width="25px" style="border-radius: 50%;">&nbsp;<span><?php echo "$_SESSION[name]"; ?></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item" data-toggle="modal" data-target="#modal_my_profile"><i class="icon-user-plus"></i> My profile</a>
                            <div class="dropdown-divider"></div>
                            <?php
                                if ($_SESSION['role'] == 'Admin' || $_SESSION['role'] == 'System Administrator') {
                                    // echo "<a href=\"admin.php\" class=\"dropdown-item\"><i class=\"icon-cog5\"></i> Admin</a>";
                                    echo "<a href='admin\index.html' class='dropdown-item'><i class='icon-cog5'></i> Admin</a>";
                                }
                                ?>
                            <a id="logout" href="logout.php" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
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
                <div id="mySidenavChild">
                    <p id="titleSidebarAnalysis" class="title" style="padding: 50px 8px 0px 88px;"></p>
                    <p id="newTitleSidebarAnalysis" class="title" style="display:none; padding: 60px 8px 0px 75px;">Form Update Analysis</p>
                    <div id="button-analysis" style="margin-left:38px; margin-bottom: 8px;">
                        <button type="button" id="adding-btn" title="Input Latitude & Longitude" data-toggle="modal" data-target="#modal_form_input_point" class="btn btn-sm alpha-teal border-teal text-teal-800 btn-icon rounded-round ml-2"><i class="icon-plus3"></i></button>
                        <button type="button" id="add-from-site" title="Add from Site" data-toggle="modal" data-target="#modal_form_vertical" class="btn btn-sm alpha-primary border-primary text-primary-800 btn-icon rounded-round ml-2"><i class="icon-office"></i></button>
                        <button type="button" id="add-from-csv" title="Add From CSV" class="btn btn-sm alpha-success border-success text-success-800 btn-icon rounded-round ml-2"><i class="icon-folder-open"></i></button>
                        <button type="button" title="Pointing on the Map" id="pointing-btn" class="btn btn-sm alpha-pink border-pink-400 text-pink-800 btn-icon rounded-round ml-2"><i class="icon-pin-alt"></i></button>
                        <button type="button" title="Create Polygon" id="create-polygon" class="btn border-purple-300 alpha-purple text-purple-800 btn-icon btn-sm rounded-round ml-2"><i class="esri-icon-polygon"></i></button>
                    </div>
                    <form action="" method="post" id="form-create-analysis">
                        <div class="bottom-input-name">
                            <input type="text" class="form-control" style="margin-left:16px; width:150px" id="name_analysis" name="name_analysis" required placeholder="Site's Name">
                            <input type="hidden" id="created_by" name="created_by" value="<?php echo $_SESSION['auth']['id'] ?>">
                            <button type="submit" name="add" class="btn btn-primary ml-3">Save Analysis</button>
                        </div>
                        <div id="error-input-points" class="alert alert-danger border-0 alert-dismissible" style="display: none; margin-top:5px; margin-left:5px; margin-right:5px;">
                            <span style="font-size: 11px;" class="font-weight-semibold">Oh snap!</span> Add a latitude and longitude and try submitting again.
                        </div>
                        <div id="error-input-buffer" class="alert alert-danger border-0 alert-dismissible" style="display: none; margin-top:5px; margin-left:5px; margin-right:5px; margin-bottom: -10px;">
                            <span style="font-size: 11px;" class="font-weight-semibold">Oh snap!</span> Add a buffer radius, driving time or driving distance and try submitting again.
                        </div>
                        <div id="error-down-service" class="alert alert-danger border-0 alert-dismissible" style="display: none; margin-top:5px; margin-left:5px; margin-right:5px; margin-bottom: -10px;">
                            <span style="font-size: 11px;" class="font-weight-semibold">Error!</span>Operation Failed. Please try again.
                        </div>
                        <div id="form-list"></div>
                    </form>
                </div>
            </div>
            <!-- End of the SideNav Analysis -->

            <!-- SideNav Viewer -->
            <div id="myViewer" class="sidenav panel-left">
                <div id="tree-viewer">
                    <table style="width:100%; margin-bottom:10px; margin-top:2px;">
                        <tr>
                            <td style="width:100%; height:38px;">
                                <div class="title-layers-property">
                                    <p><i class="mi-view-headline"></i><b>SEARCH PROPERTY</b></p>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <ul class="treeview">
                        <li>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div id="search-widget-property" style="width:100%; border:1.5px solid #6496e8; margin-bottom:10px;"></div>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        <li>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p style="cursor:pointer" name="select-all-property"><b>PROPERTY TYPE</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-office" value="office">
                                            <label for="property-office"><span></span>Office</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-ruko" value="ruko">
                                            <label for="property-ruko"><span></span>Ruko</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-apartment" value="apartment">
                                            <label for="property-apartment"><span></span>Apartment</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-industrial" value="industrial/logistic">
                                            <label for="property-industrial"><span></span>Industrial/Logistic</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-shopping-center" value="shopping center">
                                            <label for="property-shopping-center"><span></span>Shopping Center</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-house" value="house">
                                            <label for="property-house"><span></span>House</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-data-center" value="data center">
                                            <label for="property-data-center"><span></span>Data Center</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-others" value="others">
                                            <label for="property-others"><span></span>Others</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-property" id="property-hotel" value="hotel">
                                            <label for="property-hotel"><span></span>Hotel</label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p name="select-all-mkscheme"><b>MARKETING SCHEME</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div style="padding-top:5px; padding-left:5px; width: 100%; height: 100%; overflow:hidden;" id="strata-value" value="yes">
                                            <label class="radio-inline">
                                                <input type="radio" name="marketing-scheme-input" value="for-lease" /> For Lease
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="marketing-scheme-input" value="for-sale" /> For Sale
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="marketing-scheme-input" value="for-lease-and-for-sale" /> For Lease and For Sale
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="width:40px;">
                                        <div><b>Strata</b></div>
                                    </td>
                                    <td style="height:26px;">
                                        <div style="padding-top:5px; padding-left:5px; width: 100%; height: 100%; overflow:hidden;" id="strata-value" value="yes">
                                            <label class="radio-inline">
                                                <input type="radio" name="strata-input" value="yes" /> Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="strata-input" value="no" checked /> No
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property" style="background-color: #6496e8; color:white;">
                                <tr>
                                    <td style="width:90px;">
                                        <div><b>SIZE</b></div>
                                    </td>
                                    <td style="height:20px; width:114.5px; text-align:center;">
                                        <div><b>Min</b></div>
                                    </td>
                                    <td style="height:20px; text-align:center;">
                                        <div><b>Max</b></div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div style="width:100%">
                                            <p>Land Sqm</p>
                                        </div>
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <input class="floatTextBoxWithRange" style="width:67px; border-radius:10px; text-align:center;" name="popup-input-min" type="text" id="land-min-size-meter-value" />
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <input class="floatTextBoxWithRange" style="width:67px; border-radius:10px; text-align:center;" name="popup-input-max" type="text" id="land-max-size-meter-value" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:26px; width:90px;">
                                        <div style="width:100%">
                                            <p>Build Sqm</p>
                                        </div>
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <input class="floatTextBoxWithRange" style="width:67px; border-radius:10px; text-align:center;" name="popup-input-min" type="text" id="build-min-size-meter-value" />
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <input class="floatTextBoxWithRange" style="width:67px; border-radius:10px; text-align:center;" name="popup-input-max" type="text" id="build-max-size-meter-value" />
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>TIME PERIOD</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="width:38.45px;">From</td>
                                    <td style="width:70px;">
                                        <div class="popup-require">
                                            <input style="width:100%; border-radius:10px; text-align:center;" type="text" readonly="readonly" id="time-period-from-value" />
                                            <span class="popuptext" id="popup-alert-from-empty">Please input from value!</span>
                                            <span class="popuptext" id="popup-alert-from-valid">Please input valid from value!</span>
                                        </div>
                                    </td>
                                    <td style="text-align: center; width:38.45px;">To</td>
                                    <td style="width:70px;">
                                        <div class="popup-require">
                                            <input style="width:100%; border-radius:10px; text-align:center;" type="text" readonly="readonly" id="time-period-to-value" />
                                            <span class="popuptext" id="popup-alert-to-empty">Please input to value!</span>
                                            <span class="popuptext" id="popup-alert-to-valid">Please input valid to value!</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table style="text-align:center; margin-top:10px;" class="table-property">
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department-clients" id="department-current-clients" value="Current Clients">
                                            <label for="department-current-clients"><span></span>Current Clients</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department-clients" id="department-previous-clients" value="Previous Clients">
                                            <label for="department-previous-clients"><span></span>Previous Clients</label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>PROPERTY STATUS/SERVICE</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items">
                                            <input id="checkbox-property-for-sale" class="property-for-sale styled" type="checkbox" name="property-for-sale">
                                            <label for="checkbox-property-for-sale"><span></span>
                                                <b>Property For Sale</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox-circle">
                                            <input id="checkbox-property-for-sale-available" class="property-for-sale-available styled" type="checkbox" name="sub-property-for-sale" value="available">
                                            <label for="checkbox-property-for-sale-available"><span></span>
                                                By Colliers - Available
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox-circle">
                                            <input id="checkbox-property-for-sale-listing" class="property-for-sale-listing styled" type="checkbox" name="sub-property-for-sale" value="listing">
                                            <label for="checkbox-property-for-sale-listing"><span></span>
                                                By Colliers - Listing
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox-circle">
                                            <input id="checkbox-property-for-sale-others" class="property-for-sale-others styled" type="checkbox" name="sub-property-for-sale" value="others">
                                            <label for="checkbox-property-for-sale-others"><span></span>
                                                By Others
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox-circle">
                                            <input id="checkbox-property-sold" class="property-sold styled" type="checkbox" name="property-sold">
                                            <label for="checkbox-property-sold"><span></span>
                                                <b>Property Sold</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox-circle">
                                            <input id="checkbox-property-sold-by-colliers" class="property-sold-by-colliers styled" type="checkbox" name="sub-property-sold" value="colliers">
                                            <label for="checkbox-property-sold-by-colliers"><span></span>
                                                By Colliers
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox-circle">
                                            <input id="checkbox-property-sold-by-others" class="property-sold-by-others styled" type="checkbox" name="sub-property-sold" value="others">
                                            <label for="checkbox-property-sold-by-others"><span></span>
                                                By Others
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox-circle">
                                            <input id="checkbox-property-valuation" class="property-valuation styled" type="checkbox" name="property-valuation">
                                            <label for="checkbox-property-valuation"><span></span>
                                                <b>Property Valuation</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-property-valuation-by-kjpprhr" class="property-valuation-by-kjpprhr styled" type="checkbox" name="sub-property-valuation" value="kjpprhr">
                                            <label for="checkbox-property-valuation-by-kjpprhr"><span></span>
                                                By KJPP RHR
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-property-valuation-by-others" class="property-valuation-by-others styled" type="checkbox" name="sub-property-valuation" value="others">
                                            <label for="checkbox-property-valuation-by-others"><span></span>
                                                By Others
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-property-advisory-work" class="property-advisory-work styled" type="checkbox" name="property-advisory-work">
                                            <label for="checkbox-property-advisory-work"><span></span>
                                                <b>Property Advisory Work</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-project" class="property-project styled" type="checkbox" name="property-project">
                                            <label for="checkbox-project"><span></span>
                                                <b>Project/Facilities/Property Management</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-property-npl-ayda" class="property-npl-ayda styled" type="checkbox" name="property-npl-ayda">
                                            <label for="checkbox-property-npl-ayda"><span></span>
                                                <b>Property NPL/AYDA</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>CLIENT/GROUP</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <select style="height:26px; font-size:11px; padding: 0px; margin:0px;" name="client-group" id="dropdown-client-group">
                                    <option value="HSBC">HSBC</option>
                                    <option value="Bank Permata">Bank Permata</option>
                                </select>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p style="cursor:pointer;" name="select-all-department"><b>DEPARTMENT</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-advisory" value="Advisory">
                                            <label for="department-advisory"><span></span>Advisory</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-industrial" value="Industrial">
                                            <label for="department-industrial"><span></span>Industrial</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-PM" value="PM">
                                            <label for="department-PM"><span></span>PM</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-office" value="Office">
                                            <label for="department-office"><span></span>Office</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-RE" value="RE">
                                            <label for="department-industrial"><span></span>Retail</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-FM" value="FM">
                                            <label for="department-PM"><span></span>FM</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-residential" value="Residential">
                                            <label for="department-residential"><span></span>Residential</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-CMIS" value="CMIS">
                                            <label for="department-CMIS"><span></span>CMIS</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input class="styled" type="checkbox" name="select-department" id="department-REMS" value="REMS">
                                            <label for="department-REMS"><span></span>REMS</label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <!-- <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>BUFFER</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>Set Radius</td>
                                    <td>
                                        <input id="buffer-radius" type="range" min="1" max="100" value="0">
                                    </td>
                                    <td id="buffer-radius-value"></td>
                                </tr>
                            </table> -->
                            <table class="table-property button-filter-table">
                                <tr>
                                    <td>
                                        <div class="button-filter-property" id="button-filter-property">
                                            <button style="width:80px; height:30px; float:right; background-color: #7a7c80; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary">
                                                <i class="mi-search"></i> Find</button>
                                        </div>
                                        <div class="button-filter-property button-remove-filter" id="button-filter-remove-property">
                                            <button style="width:80px; height:30px; margin-right:10px; float:right; background-color: #d9493f; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary">
                                                <i class="esri-icon-trash "></i> Clear</button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property master-expand-external-data">
                                <tr>
                                    <td style="height:26px;">
                                        <div style="margin-bottom:20px;" class="title-property expand-layer">
                                            <p><b>EXTERNAL DATA ▼</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        <!-- <li style="display:none">
                            <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                <input id="checkbox-colliers-property" class="styled" type="checkbox" value="colliers-property">
                                <label for="checkbox-colliers-property"><span></span>
                                    Colliers Property
                                </label>
                            </div>
                            <ul id="colliers-custom-data-user">
                                <li style="margin-left:20px; display:none" class="tree-custom-data-locatorlogic" value="Locator Logic">
                                    <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                    <input type="checkbox" name="custom-data-master-select-all-poi" class="custom-data-master-select-all-poi">
                                    <label for="custom-data-master-select-all-poi" class="label-custom-data">Locator Logic</label>
                                    <ul id="custom-data-user">
                                        <li class="tree-database" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="database-master-select-all-poi" class="database-master-select-all-poi">
                                            <label for="database-master-select-all-poi" class="label-database">Database</label>
                                            <div id="locatorlogic-user-database"></div>
                                        </li>
                                        <li class="tree-localstorage" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="localstorage-master-select-all-poi" class="localstorage-master-select-all-poi">
                                            <label for="localstorage-master-select-all-poi" class="label-localstorage">Web Storage</label>
                                            <div id="locatorlogic-user-localstorage"></div>
                                        </li>
                                    </ul>
                                </li>
                                <li style="margin-left:20px; display:none" class="tree-custom-data-residential" value="Residential">
                                    <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                    <input type="checkbox" name="custom-data-master-select-all-poi" class="custom-data-master-select-all-poi">
                                    <label for="custom-data-master-select-all-poi" class="label-custom-data">Residential</label>
                                    <ul id="custom-data-user">
                                        <li class="tree-database" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="database-master-select-all-poi" class="database-master-select-all-poi">
                                            <label for="database-master-select-all-poi" class="label-database">Database</label>
                                            <div id="residential-user-database"></div>
                                        </li>
                                        <li class="tree-localstorage" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="localstorage-master-select-all-poi" class="localstorage-master-select-all-poi">
                                            <label for="localstorage-master-select-all-poi" class="label-localstorage">Web Storage</label>
                                            <div id="residential-user-localstorage"></div>
                                        </li>
                                    </ul>
                                </li>
                                <li style="margin-left:20px; display:none" class="tree-custom-data-office" value="Office">
                                    <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                    <input type="checkbox" name="custom-data-master-select-all-poi" class="custom-data-master-select-all-poi">
                                    <label for="custom-data-master-select-all-poi" class="label-custom-data">Office</label>
                                    <ul id="custom-data-user">
                                        <li class="tree-database" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="database-master-select-all-poi" class="database-master-select-all-poi">
                                            <label for="database-master-select-all-poi" class="label-database">Database</label>
                                            <div id="office-user-database"></div>
                                        </li>
                                        <li class="tree-localstorage" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="localstorage-master-select-all-poi" class="localstorage-master-select-all-poi">
                                            <label for="localstorage-master-select-all-poi" class="label-localstorage">Web Storage</label>
                                            <div id="office-user-localstorage"></div>
                                        </li>
                                    </ul>
                                </li>
                                <li style="margin-left:20px; display:none" class="tree-custom-data-industrial" value="Industrial">
                                    <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                    <input type="checkbox" name="custom-data-master-select-all-poi" class="custom-data-master-select-all-poi">
                                    <label for="custom-data-master-select-all-poi" class="label-custom-data">Industrial</label>
                                    <ul id="custom-data-user">
                                        <li class="tree-database" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="database-master-select-all-poi" class="database-master-select-all-poi">
                                            <label for="database-master-select-all-poi" class="label-database">Database</label>
                                            <div id="industrial-user-database"></div>
                                        </li>
                                        <li class="tree-localstorage" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="localstorage-master-select-all-poi" class="localstorage-master-select-all-poi">
                                            <label for="localstorage-master-select-all-poi" class="label-localstorage">Web Storage</label>
                                            <div id="industrial-user-localstorage"></div>
                                        </li>
                                    </ul>
                                </li>
                                <li style="margin-left:20px; display:none" class="tree-custom-data-investment" value="Investment">
                                    <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                    <input type="checkbox" name="custom-data-master-select-all-poi" class="custom-data-master-select-all-poi">
                                    <label for="custom-data-master-select-all-poi" class="label-custom-data">Investment & Advisory</label>
                                    <ul id="custom-data-user">
                                        <li class="tree-database" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="database-master-select-all-poi" class="database-master-select-all-poi">
                                            <label for="database-master-select-all-poi" class="label-database">Database</label>
                                            <div id="investment-user-database"></div>
                                        </li>
                                        <li class="tree-localstorage" style="display:none">
                                            <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                            <input type="checkbox" name="localstorage-master-select-all-poi" class="localstorage-master-select-all-poi">
                                            <label for="localstorage-master-select-all-poi" class="label-localstorage">Web Storage</label>
                                            <div id="investment-user-localstorage"></div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li> -->
                        <li>
                            <table style="display:none;" class="table-property" id="table-external-data"></table>
                            <!-- <table class="table-property expand-master-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer">
                                            <i style="margin-top:-5px;" class="mi-add expand-master-layer"></i>
                                            <input id="tall-1" class="checkbox-poi styled" type="checkbox" name="POI" value="POI">
                                            <label for="tall-1"><span></span>
                                                POI
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property expand-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer">
                                            <i style="margin-top:-5px;" class="mi-add expand-layer"></i>
                                            <input id="checkbox-sub-poi-bank" class="checkbox-master-sub-poi styled" type="checkbox">
                                            <label for="checkbox-sub-poi-bank"><span></span>
                                                Bank
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property expand-sub-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer-2">
                                            <input class="checkbox-sub-poi styled" type="checkbox" secondValue="043efa83c740ada85088797610dcff20" value="16" id="tall-1-1">
                                            <label for="tall-1-1"><span></span>
                                                Bank DKI
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-poi" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer-2">
                                            <input class="checkbox-sub-poi styled" type="checkbox" secondValue="6d360f3944aedea7a11c30a65e2b9f81" value="27" id="tall-1-2">
                                            <label for="tall-1-2"><span></span>
                                                Bank Mandiri
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-poi" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer-2">
                                            <input class="checkbox-sub-poi styled" type="checkbox" secondValue="043efa83c740ada85088797610dcff20" value="48" id="tall-1-3">
                                            <label for="tall-1-3"><span></span>
                                                Bank Sumut
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-poi" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property expand-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer">
                                            <i style="margin-top:-5px;" class="mi-add expand-layer"></i>
                                            <input id="checkbox-sub-poi-apotek" class="checkbox-master-sub-poi styled" type="checkbox">
                                            <label for="checkbox-sub-poi-apotek"><span></span>
                                                Apotek
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property expand-sub-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer-2">
                                            <input class="checkbox-sub-poi styled" type="checkbox" secondValue="5997da4fa19d09c66b078ecb7df5a043" value="4" id="tall-1-4">
                                            <label for="tall-1-4"><span></span>
                                                Apotek K24
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-poi" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer-2">
                                            <input class="checkbox-sub-poi styled" type="checkbox" secondValue="ff5f425350108fbe0df7d0cac1764626" value="5" id="tall-1-5">
                                            <label for="tall-1-5"><span></span>
                                                Apotek Kimia Farma
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-poi" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer-2">
                                            <input class="checkbox-sub-poi styled" type="checkbox" secondValue="a5b865a0a219dda0d5434ebdee20c4e7" value="7" id="tall-1-6">
                                            <label for="tall-1-6"><span></span>
                                                Apotek Watsons
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-poi" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        <li>
                            <table class="table-property expand-master-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer">
                                            <i style="margin-top:-5px;" class="mi-add expand-layer"></i>
                                            <input id="checkbox-infrastructure" class="checkbox-infrastructure styled" type="checkbox" name="infrastructure">
                                            <label for="checkbox-infrastructure"><span></span>
                                                Infrastructure
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property expand-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer">
                                            <input class="checkbox-sub-infrastructure styled" type="checkbox" value="14" secondValue="3cd464faf714f7bd5ac83794a7a4a05d" id="tall-2-1">
                                            <label for="tall-2-1"><span></span>
                                                Bus Station
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-infrastructure" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer">
                                            <input class="checkbox-sub-infrastructure styled" type="checkbox" value="15" secondValue="2cd615ee33f699f12f5b370f42b35338" id="tall-2-2">
                                            <label for="tall-2-2"><span></span>
                                                MRT Station
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-infrastructure" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer">
                                            <input class="checkbox-sub-infrastructure styled" type="checkbox" value="16" secondValue="3cb6ca1379241d21cf375b3a3c9f1b70" id="tall-2-3">
                                            <label for="tall-2-3"><span></span>
                                                Commuter Line Station
                                            </label>
                                        </div>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <select class="select-buffer-layer" name="buffer-layer">
                                            <option value="buffer">Buffer</option>
                                            <option value="1">1 KM</option>
                                            <option value="2">2 KM</option>
                                            <option value="3">3 KM</option>
                                            <option value="4">4 KM</option>
                                            <option value="5">5 KM</option>
                                            <option value="6">6 KM</option>
                                            <option value="7">7 KM</option>
                                            <option value="8">8 KM</option>
                                            <option value="9">9 KM</option>
                                            <option value="10">10 KM</option>
                                        </select>
                                    </td>
                                    <td class="item-buffer-layer">
                                        <i style="background-color: #f0f0f0; border-radius: 5px;" value="list-infrastructure" name="list-table" class="mi-list"></i>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        <li style="margin-bottom:50px;">
                            <table class="table-property expand-master-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer">
                                            <i style="margin-top:-5px;" class="mi-add expand-layer"></i>
                                            <input id="checkbox-demographic" class="checkbox-demographic styled" type="checkbox" name="demographic">
                                            <label for="checkbox-demographic"><span></span>
                                                Demographic
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property expand-element">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info table-layer sub-table-layer">
                                            <input class="checkbox-sub-demographic styled" type="checkbox" value="4" id="tall-3-1">
                                            <label for="tall-3-1"><span></span>
                                                Populasi
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table> -->
                        </li>
                    </ul>
                </div>
            </div>
            <!-- End of the SideNav Viewer -->

            <!-- SideNav Analysis -->
            <div id="mySiteAnalysis" class="sidenav panel-left">
                <div class="inline">
                    <a href="javascript:void(0)" id="closeSiteAnalysis">&times;</a>
                </div>
                <div id="tbl-analysis-div-parent">
                    <p style="padding: 20px 8px 0px 90px;" class="title">
                    </p>
                    <div id="tbl-analysis-div" class="table-responsive tbl">
                        <?php include "content/analysis/site_analysis.php"; ?>
                    </div>
                </div>
            </div>
            <div id="myAnalysisPOI" class="sidenav panel-left">
                <div class="inline">
                    <a href="javascript:void(0)" id="closeAnalysisPOI">&times;</a>
                </div>
                <div>
                    <p style="padding: 20px 8px 0px 90px;" class="title"></p>
                    <div id="myAnaysisPOIList" class="table-responsive tbl"></div>
                </div>
            </div>
            <!-- End of the SideNav Analysis -->

            <!-- Create Buffer Info -->
            <div id="info">
                <label class="chkLabel">Click on map to buffer</label>
                <br />
            </div>
            <!-- End of Create Buffer Info -->

            <!-- Setting Colors of POI -->
            <div id="colors-div" style="display:none;">
                <p>
                    <input type="text" id="colors" class="input color" value="#B6BD79" />
                </p>
            </div>
            <!-- End of Setting Colors of POI -->

            <!-- Form Create Site -->
            <div id="create-site-div" class="card" style="background: rgba(255,255,255,0.8); display:none; width:500px;">
                <div class="card-header header-elements-inline">
                    <h6 class="card-title">Create a Site</h6>
                    <label style="align:right; margin:-5px;" class="message"></label>
                </div>
                <div class="card-body">
                    <?php include 'content/create_site.php' ?>
                </div>
            </div>
            <!-- End of Form Create Site -->

            <div class="content-wrapper" id="contentAnalysisDiv">
                <div id="mapDiv" class="mapDiv"></div>
                <div class="table_list_services"><?php include "content/table_list_services.html"; ?></div>
                <div id="analysisDiv" style="display:none;"><?php include "content/analysis/results_table.html"; ?></div>
                <div id="instantAnalysisDiv" style="display:none;"><?php include "content/analysis/results_table_instant.html"; ?></div>
            </div>
        </div>
        <!-- /page-content-->
        <!-- Modal drag and drop csv -->
        <div style="display: none; position: fixed; z-index: 10; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4); align-self: center; justify-content: center;" id="dragdrop-modal">
            <div id="info-csv" style="z-index: 2; margin-top: 25%; margin-left:30%; vertical-align: middle; line-height: 100%; font-size: 40; color: white;">
                <p id="closeMyModal" align='right' style="margin-right:50%; cursor: default;">Close[X]</p>
                <p>Drag your CSV File here</p>
                <p>File must be a csv format with requirements :</p>
                <p>1. Using separators like ","(commas), ";"(semicolons), "|"(pipes)</p>
                <p>2. Should contains string value</p>
                <p>3. Both header columns and value must have a same length</p>
                <p>4. Format file name must not contain a space or it will be automatically replaced by underline</p>
            </div>
        </div>
        <!-- End of Modal drag and drop csv -->

        <!-- Loading bar -->
        <div style="display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4);" id="loading-bar">
            <img class="image-loading" draggable="false" style="margin-left:30%; margin-top:15%;" src="assets/images/oneMap-loading-2-hole.gif" width="500" height="300" loop>
        </div>
        <!-- End of loading bar -->

        <!-- Form Edit POI -->
        <div id="poi">
            <form id="form-poi" action="">
                <label for="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name..">

                <label for="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name..">

                <label for="country">Country</label>
                <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                </select>

                <input type="submit" value="Submit">
            </form>
        </div>
        <!-- End of Form Edit POI -->
        <?php
            include 'content/edit_poi.php';
            include 'content/data_site.php';
            include 'content/input_point.php';
            include 'content/analysis/form_poi.php';
            include 'content/template/my_profile.php';
            ?>
        <!-- <script src="assets/colors/app.js"></script> -->
        <script type="text/javascript" src="assets/js/plugins/collapsible/collapsible.js"></script>
        <script type="text/javascript" src="content/template/instant_analysis/formInstantAnalysis.js"></script>
        <script>
            var toggler = document.getElementsByClassName("caret");
            var i;

            for (i = 0; i < toggler.length; i++) {
                toggler[i].addEventListener("click", function(click) {
                    this.parentElement.querySelector(".nested").classList.toggle("active");
                    this.classList.toggle("icon-rotate-90");
                });
            }
        </script>
    </body>

    <!-- Window -->
    <script src="assets/js/window/window.js"></script>
    <!-- End of Window -->

    <script src="assets/js/addPointsFromSite.js"></script>
    <script src="assets/js/addPointsManual.js"></script>
    <script src="assets/js/createAnalysis.js"></script>
    <script src="assets/js/formListCSV.js"></script>
    <script src="assets/js/showCurrentDepartment.js"></script>
    <script src="assets/js/selectUnitSize.js"></script>
    <script src="assets/js/multiSelect.js"></script>
    <script src="assets/js/inputCheckboxPropertyStatus.js"></script>
    <script src="assets/js/inputCheckboxServices.js"></script>
    <script src="assets/js/inputCheckboxQUeryShape.js"></script>
    <script src="assets/js/saveDataServiceToLocalStorage.js"></script>
    <script src="assets/js/createOverlap.js"></script>
    <script src="assets/js/viewTableServices.js"></script>
    <script src="assets/js/zoomToLayer.js"></script>
    <script src="assets/js/expandCheckboxServices.js"></script>
    <script src="assets/js/createQueryShape.js"></script>
    <script src="assets/js/livePointing.js"></script>

    <!-- Loading -->
    <script src="assets/js/loading/loading.js"></script>
    <!--End of loading -->

    <!-- Widget -->
    <script src="assets/js/widget/widget.js"></script>
    <!-- End of widget -->

    <!-- Legend -->
    <script src="assets/js/legend/legend.js"></script>
    <!--End of legend -->

    <!-- Layer -->
    <script src="assets/js/layer/layer.js"></script>
    <!-- End of Layer -->

    <!-- Style -->
    <script src="assets/js/style/style.js"></script>
    <!-- End of style -->


    <!-- Crypto -->
    <script src="assets/js/crypt/Barret.js"></script>
    <script src="assets/js/crypt/BigInt.js"></script>
    <script src="assets/js/crypt/RSA.js"></script>
    <script src="assets/js/crypt/token.js"></script>
    <!-- End of Crypto -->

    <!-- Jquery own function -->
    <script src="assets/js/jqueryOwnFunction/jqueryOwnFunction.js"></script>
    <!-- End of Jquery own function -->

    <!-- Site -->
    <script src="assets/js/site/createSite.js"></script>
    <!-- End of Site -->

    <!-- Filter -->
    <script src="assets/js/filter/filter.js"></script>
    <link rel="stylesheet" href="assets/js/filter/legend/resultsLegend.css">
    <!-- End of Filter -->

    <!-- Data -->
    <script src="assets/js/data/colliersData.js"></script>
    <script src="assets/js/data/externalData.js"></script>
    <script src="assets/js/data/pagination.js"></script>
    <script src="assets/js/data/popup/popupFilter.js"></script>
    <link rel="stylesheet" href="assets/js/data/popup/popupFilter.css">
    <!-- End of Data -->

    <!-- Input -->
    <script src="assets/js/input/input.js"></script>
    <!-- End of Input -->

    <!-- Images -->
    <script src="assets/js/images/image.js"></script>
    <!-- End of Images -->

    <!-- Request -->
    <script src="assets/js/request/request.js"></script>
    <!-- End of Request -->

    <!-- LocalStorage -->
    <script src="assets/js/localStorage/localStorage.js"></script>
    <!-- End of LocalStorage -->

    <!-- Graphics -->
    <script src="assets/js/graphics/selectGraphics.js"></script>
    <script src="assets/js/graphics/displayResultsGraphics.js"></script>
    <script src="assets/js/graphics/removeGraphics.js"></script>
    <script src="assets/js/graphics/createDynamicCircle.js"></script>
    <script src="assets/js/graphics/createCircle.js"></script>
    <script src="assets/js/graphics/createDrivingTime.js"></script>
    <script src="assets/js/graphics/createDrivingDistance.js"></script>
    <script src="assets/js/graphics/createPoint.js"></script>
    <script src="assets/js/graphics/createPolygon.js"></script>
    <script src="assets/js/graphics/createRectangle.js"></script>
    <script src="assets/js/graphics/createSketch.js"></script>
    <script src="assets/js/graphics/createLabel.js"></script>
    <script src="assets/js/graphics/getGraphicsInfo.js"></script>
    <!-- End of Graphics -->

    <!-- Roles -->
    <script src="assets/js/roles/roles.js"></script>
    <!-- End of Roles -->

    <!-- Registers for layer -->
    <script src="assets/js/registers/register.js"></script>
    <!-- End of Registers for layer -->

    <!-- Map Action -->
    <script src="assets/js/mapView/mapView.js"></script>
    <!-- End of Map Action -->

    <!-- Context Menu Action -->
    <script src="assets/js/contextMenu/contextMenu.js"></script>
    <script src="assets/js/contextMenu/action/action.js"></script>
    <script src="assets/js/contextMenu/analyze/analyze.js"></script>
    <link rel="stylesheet" href="assets/js/contextMenu/action/popup/result/viewPopupAnalyzed.css">
    <link rel="stylesheet" href="assets/js/contextMenu/action/popup/result/subViewPopupAnalyzed.css">
    <link rel="stylesheet" href="assets/js/contextMenu/action/popup/config/configPopup.css">
    <script src="assets/js/contextMenu/measurement/measurement.js"></script>
    <script src="assets/js/contextMenu/hover/hover.js"></script>
    <!-- End of Context Menu Action -->

    <!-- Geometry Services -->
    <script src="assets/js/geometryServiceAPI/geometryServiceAPI.js"></script>
    <!-- End of Geometry Services -->

    <!-- Query -->
    <script src="assets/js/query/query.js"></script>
    <!-- End of Query -->

    <!-- Viewer -->
    <script src="assets/js/viewer/viewer.js"></script>
    <!-- End of Viewer -->

    <script src="content/analysis/analysisPoi.js"></script>
    <script src="content/analysis/editAnalysis.js"></script>
    <script src="assets/js/plugins/tables/paginationLib.js"></script>
    <script src="assets/js/plugins/my_profile/myProfileLib.js"></script>
    <script src="content/template/changePassword.js"></script>
    <script src="assets/js/plugins/md5.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#datatable-sorting').dataTable({
                "bLengthChange": false,
                "bFilter": true,
                "pageLength": 5
            });
        });
    </script>

    </html>
<?php
}
?>