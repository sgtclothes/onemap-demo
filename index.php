<?php
session_start();
if (!isset($_SESSION['auth'])) {
    echo "<script>alert('Login Required.'); location.href='login.php';</script>";
} else {
    include 'config/conn.php';
    include 'content/layer.php';
    include 'content/analysis/analysis_id.php';
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
        <!-- <link href="assets/js/plugins/tree/tree.css" rel="stylesheet" type="text/css" /> -->
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
        <link href="assets/css/jquery/jquery.multiselect.css" rel="stylesheet" />
        <script src="assets/js/jquery.multiselect.js"></script>
        <script>
            $(function() {
                $('select[multiple].active.3col').multiselect({
                    columns: 3,
                    placeholder: 'Select Property',
                    search: true,
                    maxPlaceholderOpts: 3,
                    searchOptions: {
                        'default': 'Search Property'
                    },
                    selectAll: true
                });

            });
        </script>
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
            
            .btn-modal-form-poi{
                background-color: transparent;
                background-repeat: no-repeat;
                border: none;
                cursor: pointer;
                overflow: hidden;
                outline: none;
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
            window.layerDataArr = '<?php print json_encode($layer_array) ?>'
            window.analysis_id = '<?php print json_encode($an_id_array) ?>'
        </script>

        <script src="sample/boot.js"></script>
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
                            <a id="instant-analysis" href="#" class="dropdown-item">Instant Analysis</a>
                            <a style="display:none;" id="myModal" href="#" class="dropdown-item">Drag and Drop CSV</a>
                            <a id="site-analysis" href="#" class="dropdown-item">Site Analysis</a>
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
                            <input type="text" class="form-control" style="margin-left:16px; width:150px" id="name_analysis" name="name_analysis" required placeholder="Name of Analysis">
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
                                            <p><b>PROPERTY INFO</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td class="property-item">
                                        <div><b>Strata</b></div>
                                    </td>
                                    <td style="height:26px;">
                                        <div style="padding-top:5px; width: 100%; height: 100%; overflow:hidden;" id="strata-value" value="yes">
                                            <label class="radio-inline">
                                                <input type="radio" name="strata-input" value="yes" checked /> Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="strata-input" value="no" /> No
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item"><b>Property Type</b></td>
                                    <td>
                                        <div>
                                            <select id="property-type-value" name="property-type" multiple="multiple" class="3col active">
                                                <option value="land">Land</option>
                                                <option value="apartment">Apartment</option>
                                                <option value="house">House</option>
                                                <option value="office">Office</option>
                                                <option value="ruko">Ruko</option>
                                                <option value="shopping-center">Shopping Center</option>
                                                <option value="warehouse">Warehouse</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item"><b>Size</b></td>
                                    <td>
                                        <div class="unit-input">
                                            <select id="property-unit-size-value">
                                                <option value="meter-square">m&sup2;</option>
                                                <option value="hectare">ha</option>
                                                <option value="feet">ft</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item"></td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="text-align:center; width:50px;">Min</td>
                                                <td style="width:67.5px;">
                                                    <div class="popup-require">
                                                        <input style="width:100%; border-radius:10px; text-align:center;" name="popup-input-min" type="text" id="property-min-size-value" />
                                                        <span class="popuptext" id="property-popup-alert-min-empty">Please input min value!</span>
                                                        <span class="popuptext" id="property-popup-alert-min-valid">Please input valid min value!</span>
                                                    </div>
                                                </td>
                                                <td style="text-align:center; width:50px;">Max</td>
                                                <td style="width:67.5px;">
                                                    <div class="popup-require">
                                                        <input style="width:100%; border-radius:10px; text-align:center;" name="popup-input-max" type="text" id="property-max-size-value" />
                                                        <span class="popuptext" id="property-popup-alert-max-empty">Please input max value!</span>
                                                        <span class="popuptext" id="property-popup-alert-max-valid">Please input valid max value!</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item"><b>Time Period</b></td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="text-align: center; width:50px;">From</td>
                                                <td style="width:67.5px;">
                                                    <div>
                                                        <input style="width:100%; border-radius:10px; text-align:center;" type="text" id="property-from-time-period-value" />
                                                    </div>
                                                </td>
                                                <td style="text-align: center; width:50px; border-radius:10px; text-align:center;">To</td>
                                                <td style="width:67.5px;">
                                                    <div>
                                                        <input style="width:100%; border-radius:10px; text-align:center;" type="text" id="property-to-time-period-value" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>Land Info</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td class="property-item"><b>Size</b></td>
                                    <td>
                                        <div class="unit-input">
                                            <select>
                                                <option value="meter-square">m&sup2;</option>
                                                <option value="hectare">ha</option>
                                                <option value="feet">ft</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item"></td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="text-align:center; width:50px;">Min</td>
                                                <td style="width:67.5px;">
                                                    <div class="popup-require">
                                                        <input style="width:100%; border-radius:10px; text-align:center; margin-right:20px;" name="popup-input-min" type="text" id="land-min-size-value" />
                                                        <span class="popuptext" id="land-popup-alert-min-empty">Please input min value!</span>
                                                        <span class="popuptext" id="land-popup-alert-min-valid">Please input valid min value!</span>
                                                    </div>
                                                </td>
                                                <td style="text-align:center; width:50px;">Max</td>
                                                <td style="width:67.5px;">
                                                    <div class="popup-require">
                                                        <input style="width:100%; border-radius:10px; text-align:center; margin-right:20px;" name="popup-input-max" type="text" id="land-max-size-value" />
                                                        <div style="z-index: 1000">
                                                            <span class="popuptext" id="land-popup-alert-max-empty">Please input max value!</span>
                                                            <span class="popuptext" id="land-popup-alert-max-valid">Please input valid max value!</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="property-item"><b>Time Period</b></td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="text-align: center; width:50px;">From</td>
                                                <td style="width:67.5px;">
                                                    <input style="width:100%; margin-right:20px; border-radius:10px; text-align:center;" type="text" id="land-from-time-period-value" />
                                                </td>
                                                <td style="text-align: center; width:50px;">To</td>
                                                <td style="width:67.5px;">
                                                    <input style="width:100%; margin-right:20px; border-radius:10px; text-align:center;" type="text" id="land-to-time-period-value" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td style="height:26px;">
                                        <div class="title-property">
                                            <p><b>PROPERTY STATUS</b></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table class="table-property">
                                <tr>
                                    <td>
                                        <div class="sub-property-status">
                                            <p><b>Property Available</b></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-listing" class="styled" type="checkbox" name="listing" value="listing">
                                            <label for="checkbox-listing">
                                                Listing
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-available" class="styled" type="checkbox" name="available" value="available">
                                            <label for="checkbox-available">
                                                Available
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="sub-property-status">
                                            <p><b>Property Sold</b></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-colliers" class="styled" type="checkbox" name="colliers" value="colliers">
                                            <label for="checkbox-colliers">
                                                Colliers
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-sold-others" class="styled" type="checkbox" name="others" value="others">
                                            <label for="checkbox-sold-others">
                                                Others
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="sub-property-status">
                                            <p><b>Property Advisory Work</b></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="sub-property-status">
                                            <p><b>Property Valuation</b></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-kjpp" class="styled" type="checkbox" name="kjpp" value="kjpp">
                                            <label for="checkbox-kjpp">
                                                KJPP
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                            <input id="checkbox-valuation-others" class="styled" type="checkbox" name="others" value="others">
                                            <label for="checkbox-valuation-others">
                                                Others
                                            </label>
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
                                                                                                                                <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree"></i>
                                                                                                                                <input type="checkbox" name="colliers-custom-data-master-select-all-poi" class="colliers-custom-data-master-select-all-poi">
                                                                                                                                <label for="colliers-custom-data-master-select-all-poi" class="label-custom-data">Colliers Properties</label>
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
                                <input id="checkbox-poi" class="styled" type="checkbox" name="POI" value="POI">
                                <label for="checkbox-poi">
                                    POI
                                </label>
                            </div>
                            <ul class="nested" style="display:none">
                                <form id="all-poi">
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="16" name="tall-1-1" id="tall-1-1">
                                        <label for="tall-1-1" class="custom-unchecked">Bank DKI</label>
                                    </li>
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="27" name="tall-1-2" id="tall-1-2">
                                        <label for="tall-1-2" class="custom-unchecked">Bank Mandiri</label>
                                    </li>
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="48" name="tall-1-3" id="tall-1-3">
                                        <label for="tall-1-3" class="custom-unchecked">Bank Sumut</label>
                                    </li>
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="4" name="tall-1-4" id="tall-1-4">
                                        <label for="tall-1-4" class="custom-unchecked">Apotek K24</label>
                                    </li>
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="5" name="tall-1-5" id="tall-1-5">
                                        <label for="tall-1-5" class="custom-unchecked">Apotek Kimia Farma</label>
                                    </li>
                                    <li class="last">
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="7" name="tall-1-6" id="tall-1-6">
                                        <label for="tall-1-6" class="custom-unchecked">Apotek Watsons</label>
                                    </li>
                                </form>
                            </ul>
                        </li>

                        <li>
                            <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                <input id="checkbox-infrastructure" class="styled" type="checkbox" name="infrastructure" value="infrastructure">
                                <label for="checkbox-infrastructure">
                                    Infrastructure
                                </label>
                            </div>
                            <ul class="nested" style="display:none">
                                <form id="all-infrastructure">
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="109" name="tall-2-1" id="tall-2-1">
                                        <label for="tall-2-1" class="custom-unchecked">Masjid</label>
                                    </li>
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="133" name="tall-2-2" id="tall-2-2">
                                        <label for="tall-2-2" class="custom-unchecked">Industri Mikro</label>
                                    </li>
                                </form>
                            </ul>
                        </li>

                        <li style="margin-bottom:50px;">
                            <div style="margin-top:2px;" class="property-status-items checkbox checkbox-circle checkbox-info">
                                <input id="checkbox-demographic" class="styled" type="checkbox" name="demographic" value="demographic">
                                <label for="checkbox-demographic">
                                    Demographic
                                </label>
                            </div>
                            <ul class="nested" style="display:none;">
                                <form id="all-demographic">
                                    <li>
                                        <i style="margin-top:-5px;" class="mi-play-arrow rotate i-tree-layers"></i>
                                        <input type="checkbox" value="4" name="tall-3-1" id="tall-3-1">
                                        <label for="tall-3-1" class="custom-unchecked">Populasi</label>
                                    </li>
                                </form>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- End of the SideNav Viewer -->

            <!-- SideNav Site Instant Analysis -->
            <div id="mySiteAnalysis" class="sidenav panel-left">
                <div class="inline">
                    <a href="javascript:void(0)" id="closeSiteAnalysis">&times;</a>
                </div>
                <div>
                    <p style="padding: 20px 8px 0px 90px;" class="title">
                    </p>
                    <div class="table-responsive tbl">
                        <?php include 'content/site_analysis.php'; ?>
                    </div>
                </div>
            </div>
            <!-- End of the SideNav Site Instant Analysis -->

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
                <button class="action-button esri-icon-minus" id="distanceButton" type="button" title="Measure distance between two or more points"></button>
                <button class="action-button esri-icon-polygon" id="areaButton" type="button" title="Measure area"></button>
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

            <div class="content-wrapper">
                <div id="mapDiv"></div>
                <div style="align-items:center; justify-content:center;">
                    <table class="table-filter">

                    </table>
                </div>
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
    <script src="assets/js/analysis_poi.js"></script>
    <script src="assets/js/submitFilter.js"></script>
    <script src="assets/js/showCurrentDepartment.js"></script>
    <script src="assets/js/inputFilter.js"></script>
    <script src="assets/js/selectUnitSize.js"></script>
    <script src="content/analysis/analysis_poi.js"></script>
    <script>
        $(document).ready(function() {
            $('#datatable-sorting').dataTable({
                "bLengthChange": false,
                "bFilter": true,
                "pageLength": 5
            });
            $('#datatable-site').dataTable({
                "bLengthChange": false,
                "bFilter": true,
                "bInfo": false,
                "paging": false,
            });
        });
    </script>

    </html>
<?php
}
?>