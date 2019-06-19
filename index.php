<?php
session_start();
if (!isset($_SESSION['email']) || !isset($_SESSION['password'])) {
    echo "<script>alert('Login Required.'); location.href='login.php';</script>";
} else {
    include 'config/conn.php';
    include 'config/data_login.php';
    include 'content/layer.php';
    $data= data_login($conn,$_SESSION['email']);
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
    <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="assets/css/limitless.css" rel="stylesheet" type="text/css">
    <link href="assets/css/layout.css" rel="stylesheet" type="text/css">
    <link href="assets/css/components.css" rel="stylesheet" type="text/css">
    <link href="assets/css/colors.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="assets/css/style.css" type="text/css" />
    <link href="assets/colors/jsColor.css" rel="stylesheet" type="text/css" />
    <link href="assets/js/plugins/tree/tree.css" rel="stylesheet" type="text/css" />
    <link href="assets/js/plugins/collapsible/demo.css" rel="stylesheet" type="text/css" />
    <script src="assets/js/plugins/tables/datatables/datatables.js"></script>
    <script src="assets/js/plugins/tables/sorting.js"></script>
    <!-- /global stylesheets -->

    <!-- core js files -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="assets/js/main/jquery.min.js"></script>
    <script src="assets/js/main/bootstrap.bundle.min.js"></script>
    <script src="assets/js/plugins/loaders/blockui.min.js"></script>
    <script src="assets/js/plugins/ui/perfect_scrollbar.min.js"></script>

    <script type="text/javascript" src="http://www.dematte.at/cpn/colors.js"></script>
    <script type="text/javascript" src="http://www.dematte.at/cpn/colorPicker.data.js"></script>
    <script type="text/javascript" src="http://www.dematte.at/cpn/colorPicker.js"></script>
    <script type="text/javascript" src="assets/colors/jsColor.js"></script>
    <script type="text/javascript" src="assets/js/plugins/tree/tree.js"></script>
    <!-- /core js files -->

    <!-- themes & template js files -->
    <script src="assets/js/layout/default/app.js"></script>
    <script src="assets/js/layout/default/fixed_sidebar_custom_scroll.js"></script>
    <script src="assets/js/plugins/forms/validation/validate.js"></script>
    <script src="assets/js/plugins/forms/form_validation.js"></script>
	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="assets/js/plugins/forms/form_select2.js"></script>
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
        .form-list {
            margin-left:5px;
            margin-top:5px;
        }
    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/themes/light/main.css">
    <script src="https://js.arcgis.com/4.11/"></script>

    <script type="module" src="lib/lib.js"></script>
    <script type="text/javascript">
        let host = "<?= $dbhost ?>"
        let user = "<?= $dbuser ?>"
        let pass = "<?= $dbpass ?>"
        window.created_by = "<?= $data['id'] ?>"
        window.layerDataArr = '<?php print json_encode($layer_array) ?>'
    </script>

    <script src="sample/boot.js"></script>
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
                <li class="nav-item">
                    <a id="viewer-nav" href="#" class="navbar-nav-link">
                        <i class="icon-list-unordered mr-2"></i>Viewer
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a href="#" class="navbar-nav-link dropdown-toggle legitRipple" data-toggle="dropdown">
                        <i class="icon-stats-bars2 mr-2"></i>Analysis
                    </a>

                    <div class="dropdown-menu dropdown-menu-left">
                        <a id="instant-analysis" href="#" class="sidebar-control sidebar-main-hide d-none d-md-block dropdown-item" data-popup="tooltip-demo" title="Show main" data-placement="bottom" data-container="body" data-trigger="hover">Instant Analysis</a>
                        <a id="myModal" href="#" class="dropdown-item">Drag and Drop CSV</a>
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
            <div>
                <a id="title" href="#" style="padding: 70px 8px 8px 55px;">Instant Analysis</a>
                <div style="margin-left:52px; margin-bottom: 8px;">
                    <button type="button" id="adding-btn" class="btn btn-sm alpha-teal border-teal text-teal-800 btn-icon rounded-round ml-2"><i class="icon-plus3"></i></button>
                    <button type="button" data-toggle="modal" data-target="#modal_form_vertical" class="btn btn-sm alpha-primary border-primary text-primary-800 btn-icon rounded-round ml-2"><i class="icon-office"></i></button>
                    <button type="button" class="btn btn-sm alpha-success border-success text-success-800 btn-icon rounded-round ml-2"><i class="icon-folder-open"></i></button>
                    <button type="button" id="pointing-btn" class="btn btn-sm alpha-pink border-pink-400 text-pink-800 btn-icon rounded-round ml-2"><i class="icon-pin-alt"></i></button>
                </div>
                
                <div class="form-list" style="overflow-y: auto; overflow-x:hidden;">
                    <div class="cols">
                    <div class="form-group row" style="margin-left:10px; margin-top:15px;">
                        <label class="col-form-label" style="margin-right:5px;">Latitude</label>
                        <input name="latitude" type="text" value="0" class="form-control latitude-form" required readonly style="width:60px; margin-right:5px;">
                        <label class="col-form-label" style="margin-right:5px;">Longitude</label>
                        <input name="longitude" type="text" value="0" class="form-control longitude-form" required readonly style="width:60px;">
                    </div>
                    <div style="padding-left: 90px; padding-bottom: 10px;">
                        <div class="btn-group ml-1">
                            <button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon dropdown-toggle" data-toggle="dropdown">
                                <i class="icon-stack3"></i>
                            </button>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="#" class="dropdown-item selectbuffer">Buffer</a>
                                <a href="#" class="dropdown-item selectdrive">Driving Time</a>
                            </div>
                        </div>
                    <button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon ml-2"><i class="icon-info3"></i></button>
                    </div>
                    <div class="collapsible">
                    <div class="resultBuffer">
                        <div class="collapse-container">
                        <div class="collapse-head">
                            <h2>Buffer</h2>
                        </div>
                        <div class="collapse-content">
                        <!-- Buffer Navigator -->
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
                        <!-- End of Buffer Navigator -->
                        </div>
                        </div>
                    </div>
                    <div class="resultDriving">
                        <div class="collapse-container">
                        <div class="collapse-head">
                            <h2>Driving Time</h2>
                        </div>
                        <div class="collapse-content">
                        <!-- Driving Navigator -->
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
                        <!-- End of Driving Navigator -->
                        </div>
                        </div>
                    </div>
                    </div><!-- batas collapsible head-->
                    </div><!-- batas cols list-->
                </div>
                <div style="bottom: 0px; margin-left:10px; margin-top:15px;">
                <input type="text" style="width:60px;" class="form-control"  placeholder="name">
                <button type="submit" name="add" class="btn btn-primary ml-3">Submit <i class="icon-paperplane ml-2"></i></button>
                </div>
            </div>
        </div>
        <!-- End of the SideNav Analysis -->

        <!-- SideNav Viewer -->
        <div id="myViewer" class="sidenav panel-left">
            <div class="inline">
                <a href="javascript:void(0)" id="closeviewer">&times;</a>
            </div>  
            <div>
                <a style="margin-top: 28px; padding: 18px 8px 8px 80px;" id="title" href="#">Viewer</a>
                <ul class="treeview">
                    <li>
                        <i class="icon-arrow-right32 caret"></i>
                        <input type="checkbox" name="tall" id="tall">
                        <label for="tall" class="custom-unchecked">POI</label>
                        
                        <ul class="nested">
                            
                            <li class="last" style="margin-left: -19px;">
                                <i class="icon-arrow-right32 caret"></i>
                                <input type="checkbox" name="tall-1" id="tall-1">
                                <label for="tall-1" class="custom-unchecked">ATM</label>
                                <ul class="nested">
                                    <form id="atm">
                                    <li>
                                        <input type="checkbox" value="16" name="tall-1-1" id="tall-1-1">
                                        <label for="tall-1-1" class="custom-unchecked">Bank DKI</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" value="27" name="tall-1-2" id="tall-1-2">
                                        <label for="tall-1-2" class="custom-unchecked">Bank Mandiri</label>
                                    </li>
                                    <li class="last">
                                        <input type="checkbox" value="48" name="tall-1-3" id="tall-1-3">
                                        <label for="tall-1-3" class="custom-unchecked">Bank Sumut</label>
                                    </li>
                                    </form>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="button-buffer">
                <button type="button" id="color-picker" class="btn btn-primary"><i class="mi-format-color-fill mr-2"></i>Color Picker</button>
            </div>
        </div>
        <!-- End of the SideNav Viewer -->

        <!-- Create Buffer Info -->
        <div id="info">
            <label class="chkLabel">Click on map to buffer</label>
            <br />
        </div>
        <!-- End of Create Buffer Info -->

        <!-- Setting Colors of POI -->
        <div id="colors-div" style="display:none;">
            <p>
                <input type="text" id="colors" class="input color" value="#B6BD79"/>
            </p>
        </div>
        <!-- End of Setting Colors of POI -->

        <!-- Form Create Site --> 
        <div id="create-site-div" class="card" style="background: rgba(255,255,255,0.5); display:none; width:500px;">
            <div class="card-header header-elements-inline">
                <h6 class="card-title">Create a Site</h6>
            </div>
            <div class="card-body">
                <?php include 'content/create_site.php' ?>
            </div>
		</div>
        <!-- End of Form Create Site -->

        <div class="content-wrapper">
            <div id="mapDiv"></div>
        </div>
    </div>
    <!-- /page-content-->
    <!-- Modal drag and drop csv -->
    <div style="display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4); align-self: center; justify-content: center;" id="dragdrop-modal">
        <div id="info-csv" style="z-index: 2; margin-top: 25%; margin-left:30%; vertical-align: middle; line-height: 100%; font-size: 40; color: white;">
            <p id="closeMyModal" align='right' style="margin-right:50%; cursor: default;">Close[X]</p>
            <p>Drag your CSV File here</p>
            <p>File must be a csv format with requirements :</p>
            <p>1. Using separators like ","(commas), ";"(semicolons), "|"(pipes)</p>
            <p>2. Should contains string value</p>
            <p>3. Both header columns and value must have a same length</p>
        </div>
    </div>
    <!-- End of Modal drag and drop csv -->

    <!-- Confirm Box -->
    <div id="confirmBox">
        <div class="message"></div>
        <button class="yes">Yes</button>
        <button class="no">No</button>
    </div>
    <!-- End of Confirm Box -->
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
<?php include 'content/data_site.php'; ?>
<script type="text/javascript" src="assets/colors/app.js"></script>
<script type="text/javascript" src="assets/js/plugins/collapsible/demo.js"></script>
<script type="text/javascript" src="assets/js/plugins/collapsible/collapsible.js"></script>
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
</html>
<?php
}
?>