<?php
session_start();
if (!isset($_SESSION['auth'])) {
    header('Location: login.php'); 
} else {
    include 'config/conn.php';
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
        <!-- /Adding other css -->

        <!-- MultiSelect CSS & JS library -->
        <!-- <link href="assets/css/jquery/jquery.multiselect.css" rel="stylesheet" />
        <script src="assets/js/jquery.multiselect.js"></script>
        <script>
            $(function() {
                $('select[multiple].active.3col').multiselect({
                    columns: 3,
                    placeholder: 'Select Property',
                    search: true,
                    maxPlaceholderOpts: 2,
                    searchOptions: {
                        'default': 'Search Property'
                    },
                    selectAll: true
                });

            });
        </script> -->
        <!-- /MultiSelect CSS & JS library -->

        <!-- core js files -->
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> -->
        <!-- <script src="assets/js/main/jquery.min.js"></script> -->
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

            #form-list {
                margin-left: 5px;
                margin-top: 5px;
                margin-bottom: 10px;
                overflow-y: auto;
                overflow-x: hidden;
                min-height: 100px;
                min-height: 200px
            }

            .bottom-input-name {
                background-color: #fff;
                width: 300px;
                display: flex;
                flex-direction: row;
                margin-top: 16px;
            }

            .tbl {
                padding-left: 8px;
                padding-right: 8px;
            }

            table.dataTable th {
                padding-top: 1.2px;
                padding-bottom: 1.2px;
            }

            table.dataTable td {
                padding-top: 1.2px;
                padding-bottom: 1.2px;
            }

            table.dataTable {
                margin-bottom: 5px;
            }

            .btn-modal-form-poi {
                background-color: transparent;
                background-repeat: no-repeat;
                border: none;
                cursor: pointer;
                overflow: hidden;
                outline: none;
                margin-bottom: 9px;
            }

            .link {
                background:none!important;
                border:none; 
                padding:0!important;
                color:#069;
                text-decoration:underline;
                cursor:pointer;
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
        </script>

        <script src="sample/boot.js"></script>
        <script src="content/analysis/dataAnalysis.js"></script>
        <script src="content/template/instant_analysis/buffers.js"></script>
        <script src="content/template/instant_analysis/drivetime_distance.js"></script>
        <script src="content/template/instant_analysis/drivetime.js"></script>
        <script src="sample/serviceLayerPOI.js"></script>
        <script src="sample/serviceLayerInfrastructure.js"></script>
        <script src="sample/serviceLayerDemographic.js"></script>
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
                    <li class="nav-item">
                        <a id="viewer-nav" href="#" class="navbar-nav-link">
                            <i class="icon-list-unordered mr-2"></i>Layers
                        </a>
                    </li>

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
                    <!-- /analysis menu item navbar -->
                </ul>

                <span class="ml-md-3 mr-md-auto"></span>

                <ul class="navbar-nav">
                    <!-- user menu item navbar -->
                    <li class="nav-item dropdown dropdown-user">
                        <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                            <span><?php echo "$_SESSION[name]"; ?></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item"><i class="icon-user-plus"></i> My profile</a>
                            <div class="dropdown-divider"></div>
                            <?php
                            if ($_SESSION['role'] == 'Admin' || $_SESSION['role'] == 'System Administrator') {
                                echo "<a href=\"admin.php\" class=\"dropdown-item\"><i class=\"icon-cog5\"></i> Admin</a>";
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
                <div>
                    <p class="title" style="padding: 50px 8px 0px 88px;"></p>
                    <div style="margin-left:52px; margin-bottom: 8px;">
                        <button type="button" id="adding-btn" title="Input Latitude & Longitude" data-toggle="modal" data-target="#modal_form_input_point" class="btn btn-sm alpha-teal border-teal text-teal-800 btn-icon rounded-round ml-2"><i class="icon-plus3"></i></button>
                        <button type="button" id="add-from-site" title="Add from Site" data-toggle="modal" data-target="#modal_form_vertical" class="btn btn-sm alpha-primary border-primary text-primary-800 btn-icon rounded-round ml-2"><i class="icon-office"></i></button>
                        <button type="button" id="add-from-csv" title="Add From CSV" class="btn btn-sm alpha-success border-success text-success-800 btn-icon rounded-round ml-2"><i class="icon-folder-open"></i></button>
                        <button type="button" title="Pointing on the Map" id="pointing-btn" class="btn btn-sm alpha-pink border-pink-400 text-pink-800 btn-icon rounded-round ml-2"><i class="icon-pin-alt"></i></button>
                    </div>
                    <form action="" method="post" id="form-create-analysis">
                        <div class="bottom-input-name">
                            <input type="text" class="form-control" style="margin-left:16px; width:150px" id="name_analysis" name="name_analysis" required placeholder="Site's Name">
                            <input type="hidden" id="created_by" name="created_by" value="<?php echo $_SESSION['auth']['id'] ?>">
                            <button type="submit" name="add" class="btn btn-primary ml-3">Save Analysis</button>
                        </div>
                        <div id="form-list"></div>
                    </form>
                </div>
            </div>
            <!-- End of the SideNav Analysis -->

            <!-- The SideNav Edit Analysis -->
            <div id="myEditSiteAnalysis" class="sidenav panel-right">
                <div class="inline">
                    <a href="javascript:void(0)" id="closebtn">&times;</a>
                </div>
                <div>
                    <p class="title" style="padding: 70px 8px 0px 88px;">Form Update Site Analysis</p>
                </div>
            </div>
            <!-- End of the SideNav Analysis -->


            <!-- The SideNav Edit Analysis -->
            <div id="myEditSiteAnalysis" class="sidenav panel-right">
                <div class="inline">
                    <a href="javascript:void(0)" id="closebtn">&times;</a>
                </div>
                <div>
                    <p class="title" style="padding: 70px 8px 0px 88px;">Form Update Site Analysis</p>
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
                                    <p><i class="mi-view-headline"></i><b>LAYERS</b></p>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <ul class="treeview">
                        <li>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>BUILDING INFO</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td class="property-item"><b>Property Type</b></td>
                                </tr>
                                <tr>
                                    <td style=>
                                        <div class="unit-input dropdown-filter">
                                            <div id="dropdown-property-div">
                                                <p id="property-value" style="margin-left:10px;">Select Property</p>
                                            </div>
                                            <div class="dropdown-content-property">
                                                <table class="dropdown-table-property">
                                                    <tr>
                                                        <td>
                                                            <a id="select-all-property" href="#">Select all</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table class="dropdown-table-property">
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-office" value="Office">
                                                                <label for="property-office">Office</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-ruko" value="Ruko">
                                                                <label for="property-ruko">Ruko</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-apartment" value="Apartment">
                                                                <label for="property-apartment">Apartment</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-industrial" value="Industrial">
                                                                <label for="property-industrial">Industrial/Logistic</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-shopping-center" value="Shopping Center">
                                                                <label for="property-shopping-center">Shopping Center</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-house" value="House">
                                                                <label for="property-house">House</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table style="margin-top:10px;" class="dropdown-table-property">
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-property" id="property-others" value="Others">
                                                                <label for="property-others">Others</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="button-property-ok" id="button-property-ok">
                                                                <button style="width:80px; height:30px; float:right; background-color: #7a7c80; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary">OK</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item">
                                        <div><b>Strata</b></div>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="height:26px;">
                                        <div style="padding-top:5px; padding-left:5px; width: 100%; height: 100%; overflow:hidden;" id="strata-value" value="yes">
                                            <label class="radio-inline">
                                                <input type="radio" name="strata-input" value="yes" /> Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="strata-input" value="no" /> No
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>LAND INFO</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px; width:90px;">
                                        <div style="width:100%">
                                            <p>Description</p>
                                        </div>
                                    </td>
                                    <td style="height:26px;">
                                        <div style="width:100%; text-align:center;">
                                            <p>Min</p>
                                        </div>
                                    </td>
                                    <td style="height:26px;">
                                        <div style="width:100%; text-align:center;">
                                            <p>Max</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:26px;">
                                        <div style="width:100%">
                                            <p>Sqm</p>
                                        </div>
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <div class="popup-require">
                                            <input style="width:67px; border-radius:10px; text-align:center;" name="popup-input-min" type="text" id="land-min-size-meter-value" />
                                            <span class="popuptext" id="land-popup-alert-min-meter-empty">Please input min value!</span>
                                            <span class="popuptext" id="land-popup-alert-min-meter-valid">Please input valid min value!</span>
                                        </div>
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <div class="popup-require">
                                            <input style="width:67px; border-radius:10px; text-align:center;" name="popup-input-max" type="text" id="land-max-size-meter-value" />
                                            <div style="z-index: 1000">
                                                <span class="popuptext" id="land-popup-alert-max-meter-empty">Please input max value!</span>
                                                <span class="popuptext" id="land-popup-alert-max-meter-valid">Please input valid max value!</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:26px; width:90px;">
                                        <div style="width:100%">
                                            <p>Unit/Room</p>
                                        </div>
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <div class="popup-require">
                                            <input style="width:67px; border-radius:10px; text-align:center;" name="popup-input-min" type="text" id="land-min-size-unit-value" />
                                            <span class="popuptext" id="land-popup-alert-min-unit-empty">Please input min value!</span>
                                            <span class="popuptext" id="land-popup-alert-min-unit-valid">Please input valid min value!</span>
                                        </div>
                                    </td>
                                    <td style="height:26px; text-align:center;">
                                        <div class="popup-require">
                                            <input style="width:67px; border-radius:10px; text-align:center;" name="popup-input-max" type="text" id="land-max-size-unit-value" />
                                            <div style="z-index: 1000">
                                                <span class="popuptext" id="land-popup-alert-max-unit-empty">Please input max value!</span>
                                                <span class="popuptext" id="land-popup-alert-max-unit-valid">Please input valid max value!</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>MARKETING SCHEME</b></p>
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
                                            <input style="width:100%; border-radius:10px; text-align:center;" type="text" id="time-period-from-value" />
                                            <span class="popuptext" id="popup-alert-from-empty">Please input from value!</span>
                                            <span class="popuptext" id="popup-alert-from-valid">Please input valid from value!</span>
                                        </div>
                                    </td>
                                    <td style="text-align: center; width:38.45px;">To</td>
                                    <td style="width:70px;">
                                        <div class="popup-require">
                                            <input style="width:100%; border-radius:10px; text-align:center;" type="text" id="time-period-to-value" />
                                            <span class="popuptext" id="popup-alert-to-empty">Please input to value!</span>
                                            <span class="popuptext" id="popup-alert-to-valid">Please input valid to value!</span>
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
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-available-for-sale" class="property-status-available-for-sale styled" type="checkbox" name="property-status-available-for-sale">
                                            <label for="checkbox-available-for-sale">
                                                <b>Property Available For Sale</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-land-with-agreement" class="property-available styled" type="checkbox" name="property-available" value="land with agreement">
                                            <label for="checkbox-land-with-agreement">
                                                Land with Agreement
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-available" class="property-available styled" type="checkbox" name="property-available" value="available">
                                            <label for="checkbox-available">
                                                Available
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-sold" class="property-status-sold styled" type="checkbox" name="property-status-sold">
                                            <label for="checkbox-sold">
                                                <b>Property Sold</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-sold-colliers" class="property-sold styled" type="checkbox" name="property-sold" value="colliers">
                                            <label for="checkbox-sold-colliers">
                                                By Colliers
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-sold-others" class="property-sold styled" type="checkbox" name="property-sold" value="others">
                                            <label for="checkbox-sold-others">
                                                Others
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-valuation" class="property-status-valuation styled" type="checkbox" name="property-status-valuation">
                                            <label for="checkbox-valuation">
                                                <b>Property Valuation</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-kjpp" class="property-valuation styled" type="checkbox" name="property-valuation" value="kjpp">
                                            <label for="checkbox-kjpp">
                                                KJPP
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-valuation-others" class="property-valuation styled" type="checkbox" name="property-valuation" value="others">
                                            <label for="checkbox-valuation-others">
                                                Others
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-advisory-work" class="property-status-advisory-work styled" type="checkbox" name="property-status-advisory-work">
                                            <label for="checkbox-advisory-work">
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
                                            <input id="checkbox-location" class="property-status-location styled" type="checkbox" name="property-status-location">
                                            <label for="checkbox-location">
                                                <b>Property Location</b>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>DEPARTMENT</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style=>
                                        <div class="unit-input dropdown-filter">
                                            <div id="dropdown-department-div">
                                                <p id="department-value" style="margin-left:10px;">Select Department</p>
                                            </div>
                                            <div class="dropdown-content-department">
                                                <table class="dropdown-table-department">
                                                    <tr>
                                                        <td>
                                                            <a id="select-all-department" href="#">Select all</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table class="dropdown-table-department">
                                                    <tr>
                                                        <td style="width:100px;">
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-advisory" value="Advisory">
                                                                <label for="department-advisory">Advisory</label>
                                                            </div>
                                                        </td>
                                                        <td style="width:100px;">
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-industrial" value="Industrial">
                                                                <label for="department-industrial">Industrial/Logistic</label>
                                                            </div>
                                                        </td>
                                                        <td style="width:100px;">
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-project-management" value="Project Management">
                                                                <label for="department-project-management">Project Management</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-office" value="Office">
                                                                <label for="department-office">Office</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-residential" value="Residential">
                                                                <label for="department-residential">Residential</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-facility-management" value="Facility Management">
                                                                <label for="department-facility-management">Facility Management</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-retail" value="Retail">
                                                                <label for="department-retail">Retail</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-capital-market" value="Capital Market">
                                                                <label for="department-capital-market">Capital Market</label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="checkbox" name="select-department" id="department-real-estate-management" value="Real Estate Management">
                                                                <label for="department-real-estate-management">Real Estate Management</label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div style="width:300px; text-align:center;">
                                                    <table style="margin: 10px auto; text-align:center; width:150px;" class="dropdown-table-department">
                                                        <tr>
                                                            <td>
                                                                <div class="department-direction">
                                                                    <input type="checkbox" name="select-department-direction" id="department-current">
                                                                    <label for="property-others">Current</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="department-direction">
                                                                    <input type="checkbox" name="select-department-direction" id="department-previous">
                                                                    <label for="property-others">Previous</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <table class="dropdown-table-department">
                                                    <tr>
                                                        <td>
                                                            <div class="button-department-ok" id="button-department-ok">
                                                                <button style="width:80px; height:30px; float:right; background-color: #7a7c80; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary">OK</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property button-filter-table">
                                <tr>
                                    <td>
                                        <div class="button-filter-property" id="button-filter-property">
                                            <button style="width:80px; height:30px; float:right; background-color: #7a7c80; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary">
                                                <i class="mi-search"></i> Find</button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </li>
                        <!-- <li>
                                                                                                                                                                                                                                                                <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                                                                                                                                                                                                                                                    <input id="checkbox-colliers-property" class="styled" type="checkbox" name="colliers-property" value="colliers-property">
                                                                                                                                                                                                                                                                    <label for="checkbox-colliers-property">
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
                            <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                <input id="tall-1" class="checkbox-poi styled" type="checkbox" name="POI" value="POI">
                                <label for="tall-1">
                                    POI
                                </label>
                            </div>
                            <ul class="nested">
                                <form id="all-poi">
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-poi styled" type="checkbox" value="16" id="tall-1-1">
                                            <label for="tall-1-1">
                                                Bank DKI
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-poi styled" type="checkbox" value="27" id="tall-1-2">
                                            <label for="tall-1-2">
                                                Bank Mandiri
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-poi styled" type="checkbox" value="48" id="tall-1-3">
                                            <label for="tall-1-3">
                                                Bank Sumut
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-poi styled" type="checkbox" value="4" id="tall-1-4">
                                            <label for="tall-1-4">
                                                Apotek K24
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-poi styled" type="checkbox" value="5" id="tall-1-5">
                                            <label for="tall-1-5">
                                                Apotek Kimia Farma
                                            </label>
                                        </div>
                                    </li>
                                    <li class="last">
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-poi styled" type="checkbox" value="7" id="tall-1-6">
                                            <label for="tall-1-6">
                                                Apotek Watsons
                                            </label>
                                        </div>
                                    </li>
                                </form>
                            </ul>
                        </li>
                        <li>
                            <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                <input id="checkbox-infrastructure" class="checkbox-infrastructure styled" type="checkbox" name="infrastructure">
                                <label for="checkbox-infrastructure">
                                    Infrastructure
                                </label>
                            </div>
                            <ul class="nested">
                                <form id="all-infrastructure">
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-infrastructure styled" type="checkbox" value="14" id="tall-2-1">
                                            <label for="tall-2-1">
                                                Bus Station
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-infrastructure styled" type="checkbox" value="15" id="tall-2-2">
                                            <label for="tall-2-2">
                                                MRT Station
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-infrastructure styled" type="checkbox" value="16" id="tall-2-3">
                                            <label for="tall-2-3">
                                                Commuter Line Station
                                            </label>
                                        </div>
                                    </li>
                                </form>
                            </ul>
                        </li>

                        <li style="margin-bottom:50px;">
                            <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                <input id="checkbox-demographic" class="checkbox-demographic styled" type="checkbox" name="demographic">
                                <label for="checkbox-demographic">
                                    Demographic
                                </label>
                            </div>
                            <ul class="nested">
                                <form id="all-demographic">
                                    <li>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input class="checkbox-sub-demographic styled" type="checkbox" value="4" id="tall-3-1">
                                            <label for="tall-3-1">
                                                Populasi
                                            </label>
                                        </div>
                                    </li>
                                </form>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- End of the SideNav Viewer -->

            <div id="legend-POI" class="legend-POI">TEST</div>

            <!-- SideNav Analysis -->
            <div id="mySiteAnalysis" class="sidenav panel-left">
                <div class="inline">
                    <a href="javascript:void(0)" id="closeSiteAnalysis">&times;</a>
                </div>
                <div>
                    <p style="padding: 20px 8px 0px 90px;" class="title">
                    </p>
                    <div id="tbl-analysis-div" class="table-responsive tbl"></div>
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

            <!-- Top bar for measurement -->
            <div id="topbar">
                <button class="action-button esri-icon-minus" id="distanceButton" type="button" title="Drawing distance between two or more points"></button>
                <button class="action-button esri-icon-polygon" id="areaButton" type="button" title="Drawing Polygon (Area)"></button>
                <!-- <button class="action-button esri-icon-erase" id="deleteGraphics" type="button" title="Delete drawing results"></button> -->
            </div>
            <!-- End of Top bar for measurement -->

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
                <div id="mapDiv"></div>
                <div style="align-items:center; justify-content:center;">
                    <table class="table-filter">

                    </table>
                </div>
                <div id="analysisDiv" style="display:none;"><?php include "content/analysis/results_table.html"; ?></div>
                <div id="instantAnalysisDiv" style="display:none;"><?php include "content/analysis/results_table_instant.html"; ?></div>
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
                <p>4. Format file name must not contain a space or it will be automatically replaced by underline</p>
            </div>
        </div>
        <!-- End of Modal drag and drop csv -->

        <!-- Confirm Box -->
        <div id="confirmBox">
            <div class="message"></div>
            <button id="first" class="first">Use Database</button>
            <button id="second" class="second">Use Web Storage</button>
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
        <?php
        include 'content/edit_poi.php';
        include 'content/data_site.php';
        include 'content/input_point.php';
        include 'content/analysis/form_poi.php';
        ?>
        <!-- <script src="assets/colors/app.js"></script> -->
        <script type="text/javascript" src="assets/js/plugins/collapsible/collapsible.js"></script>
        <script type="text/javascript" src="content/template/instant_analysis/form_instant_analysis.js"></script>
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
    <script src="assets/js/create_site.js"></script>
    <script src="assets/js/add_points_from_site.js"></script>
    <script src="assets/js/add_points_manual.js"></script>
    <script src="assets/js/create_analysis.js"></script>
    <script src="assets/js/from_list_csv.js"></script>
    <script src="assets/js/submitFilterLocal.js"></script>
    <script src="assets/js/submitFilterServices.js"></script>
    <script src="assets/js/showCurrentDepartment.js"></script>
    <script src="assets/js/inputFilter.js"></script>
    <script src="assets/js/selectUnitSize.js"></script>
    <script src="assets/js/multiSelect.js"></script>
    <script src="assets/js/inputCheckboxPropertyStatus.js"></script>
    <script src="assets/js/inputCheckboxServices.js"></script>
    <script src="content/analysis/analysisPoi.js"></script>
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