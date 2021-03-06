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
    <!-- /@fetch google fonts -->
    <link href="assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <link href="assets/css/icons/material/styles.css" rel="stylesheet">
    <link href="assets/css/icons/fontawesome/all.css" rel="stylesheet">
    <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="assets/css/limitless.css" rel="stylesheet" type="text/css">
    <link href="assets/css/layout.css" rel="stylesheet" type="text/css">
    <link href="assets/css/components.css" rel="stylesheet" type="text/css">
    <link href="assets/css/colors.css" rel="stylesheet" type="text/css">
    <link href="assets/css/awesome-bootstrap-checkbox.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/fontawesome-5.0.1-all.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/jquery/jquery-ui-1.12.1.css" rel="stylesheet">
    <link href="assets/js/sweetalert2/sweetalert2.css">
    <script src="assets/js/sweetalert2/sweetalert2.js"></script>
    <script src="assets/js/jquery-1.12.4.js"></script>
    <script src="assets/js/jquery-1.12.1.js"></script>
    <script src="assets/js/jquery.cookie.min.js"></script>
    <script src="assets/js/jquery.blockUI.js"></script>
    <script src="assets/js/main/bootstrap.bundle.min.js"></script>
    <script>
        if (Cookies.get('arcgistoken')) {
            sessionStorage.setItem("token", Cookies.get("arcgistoken"))
        }
        window.token = sessionStorage.getItem("token")
        if (!token) {
            location.replace("login.php")
        }
        console.log(token)
    </script>
    <!-- /global stylesheets -->
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
    <script type="module" src="library/library.js"></script>
    <script src="sample/boot.js"></script>
    <!-- Load other HTML -->
    <script>
        $(function() {
            $.get("assets/js/widget/marker/fillDataMarker.html", function(data) {
                $("#includedContent").append(data);
            });
            $.get("assets/js/geohash/inputGeohash.html", function(data) {
                $("#includedContent").append(data);
            });
            $.get("assets/js/singlePie/singlePie.html", function(data) {
                $("#includedContent").append(data);
            });
            $.get("assets/js/features/features.html", function(data) {
                $("#includedContent").append(data);
            });
        });
    </script>
    <!-- End of Load other HTML -->
</head>

<body id="main" class="navbar-top sidebar-main-hidden">
    <div id="includedContent"></div>
    <div class="navbar navbar-expand-md navbar-dark bg-theme fixed-top">

        <div class="navbar-brand py-0">
            <a href="index.php" class="d-flex h-100">
                <img id="department-logo-onemap" class="img-fluid my-auto h-auto" style="width:50px; height:20px;" src="" alt="">
                <img class="img-fluid my-auto h-auto" style="width:145px; height:24px;" src="assets/images/icons/logo-fix.png" alt="">
            </a>
            <script>
                var departments = sessionStorage.getItem("departments")
                var logoDep = $("#department-logo-onemap")
                console.log(departments)
                var img = new Image();
                img.onload = function() {
                    $(logoDep).attr("src", "assets/images/department_logo/" + departments + ".png")
                };
                img.onerror = function() {
                    $(logoDep).remove()
                };
                img.src = "assets/images/department_logo/" + departments + ".png";
            </script>
        </div>

        <div class="d-md-none">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                <i class="icon-paragraph-justify3"></i>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="navbar-mobile">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <a id="viewer-nav" href="#" class="navbar-nav-link">
                        <i class="icon-list-unordered mr-2"></i>Layers
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a href="#" class="navbar-nav-link dropdown-toggle legitRipple" data-toggle="dropdown">
                        <i class="icon-stats-bars2 mr-2"></i>Analysis
                    </a>

                    <div class="bg-theme dropdown-menu dropdown-menu-left">
                        <a id="instant-analysis" href="#" class="dropdown-item">Select Sites</a>
                        <a style="display:none;" id="myModal" href="#" class="dropdown-item">Drag and Drop CSV</a>
                        <a id="site-analysis" href="#" class="dropdown-item">Sites List</a>
                        <a id="geohash" href="#" data-toggle="modal" data-target="#modal-geohash" class="dropdown-item">Single Geohash</a>
                        <a id="single-pie" href="#" data-toggle="modal" data-target="#modal-single-pie" class="dropdown-item">Single Pie</a>
                    </div>
                </li>

                <li class="nav-item">
                    <a id="menu-dashboard" href="dashboard.php" class="navbar-nav-link">
                        <i class="mi-dashboard"></i> Dashboard
                    </a>
                </li>

                <li class="nav-item">
                    <a id="menu-input-data" data-toggle="modal" data-target="#modal-features" href="#" class="navbar-nav-link">
                        <i class="mi-input"></i> Input Data
                    </a>
                </li>

            </ul>

            <span class="ml-md-3 mr-md-auto"></span>

            <ul class="navbar-nav">
                <!-- user menu item navbar -->
                <li class="nav-item dropdown dropdown-user">
                    <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                        <img src="assets/images/profile/icons-profile.png" id="user-photo-onemap" class="user_photo" alt="My Photo" width="25px" style="border-radius: 50%;">&nbsp;<span id="username-onemap">Anonymous</span>
                    </a>
                    <script>
                        var id = sessionStorage.getItem("id")
                        var img = new Image();
                        img.onload = function() {
                            $("#user-photo-onemap").attr("src", "assets/images/profile/user_id_" + id + "/user_id_" + id + ".png")
                        };
                        img.onerror = function() {
                            $("#user-photo-onemap").attr("src", "assets/images/profile/icons-profile.png")
                        };
                        img.src = "assets/images/profile/user_id_" + id + "/user_id_" + id + ".png";
                        $("#username-onemap").text(sessionStorage.getItem("username"))
                    </script>
                    <div class="dropdown-menu dropdown-menu-right bg-theme">
                        <!-- <a href="#" id="modal-profile-onemap" class="dropdown-item" data-toggle="modal" data-target="#modal_my_profile"><i class="icon-user-plus"></i> My profile</a> -->
                        <div class="dropdown-divider"></div>
                        <a id="logout" class="dropdown-item bg-theme"><i class="icon-switch2"></i> Logout</a>
                    </div>
                </li>
                <!-- /user menu item navbar -->
            </ul>
        </div>
    </div>
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
                            <div class="title-layers-property bg-theme">
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
                                        <input class="styled" type="checkbox" name="select-property" id="property-land" value="land">
                                        <label for="property-land"><span></span>Land</label>
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
                        <table class="table-property title-size-min-max" style="background-color: #6496e8; color:white;">
                            <tr>
                                <td style="padding-left:10px; width:90px;">
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
                                        <p>Building Sqm</p>
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
                                    </div>
                                </td>
                                <td style="text-align: center; width:38.45px;">To</td>
                                <td style="width:70px;">
                                    <div class="popup-require">
                                        <input style="width:100%; border-radius:10px; text-align:center;" type="text" readonly="readonly" id="time-period-to-value" />
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
                                <td valign="top">
                                    <table class="table-property-2">
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
                                                    <input id="checkbox-property-for-sale-others" class="property-for-sale-others styled" type="checkbox" name="sub-property-for-sale" value="others">
                                                    <label for="checkbox-property-for-sale-others"><span></span>
                                                        By Others
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="margin-top:2px; padding-left:25px;" class="property-status-items checkbox-circle">
                                                    <input id="checkbox-property-for-sale-npl-ayda" class="property-for-sale-npl-ayda styled" type="checkbox" name="sub-property-for-sale" value="npl-ayda">
                                                    <label for="checkbox-property-for-sale-npl-ayda"><span></span>
                                                        Property NPL/AYDA
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <table class="table-property-2">
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
                                    <table class="table-property-2">
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
                                    <table class="table-property-2">
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
                                </td>
                            </tr>
                        </table>
                        <table class="table-property">
                            <tr>
                                <td>
                                    <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                        <input id="checkbox-project" class="property-project styled" type="checkbox" name="property-project">
                                        <label for="checkbox-project"><span></span>
                                            <b>Project Management</b>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table class="table-property">
                            <tr>
                                <td>
                                    <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                        <input id="checkbox-facilities" class="property-facilities styled" type="checkbox" name="property-facilities">
                                        <label for="checkbox-facilities"><span></span>
                                            <b>Facilities Management</b>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table class="table-property">
                            <tr>
                                <td>
                                    <div style="margin-top:2px;" class="sub-property-status property-status-items checkbox checkbox-circle checkbox-info">
                                        <input id="checkbox-property" class="property-property styled" type="checkbox" name="property-property">
                                        <label for="checkbox-property"><span></span>
                                            <b>Property Management</b>
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
                        <table class="table-property button-filter-table">
                            <tr>
                                <td>
                                    <div class="button-filter-property" id="button-filter-property">
                                        <button style="width:80px; height:30px; float:right; background-color: #7a7c80; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary btn-find">
                                            <i class="mi-search"></i> Find</button>
                                    </div>
                                    <div class="button-filter-property button-remove-filter" id="button-filter-remove-property">
                                        <button style="width:80px; height:30px; margin-right:10px; float:right; background-color: #d9493f; padding:0px; border-radius: 10px;" type="button" class="btn btn-primary">
                                            <i class="esri-icon-trash "></i> Clear
                                        </button>
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
                    <li>
                        <table style="display:none;" class="table-property" id="table-external-data"></table>
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
            </div>
        </div>
        <!-- End of Form Create Site -->

        <div class="content-wrapper" id="contentAnalysisDiv">
            <div id="mapDiv" class="mapDiv"></div>
            <div class="table_list_services"></div>
            <div id="analysisDiv" style="display:none;"></div>
            <div id="instantAnalysisDiv" style="display:none;"></div>
        </div>
    </div>
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
    <div style="display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4);" id="loading-bar">
        <img class="image-loading" draggable="false" style="margin-left:30%; margin-top:15%;" src="assets/images/oneMap-loading-2-hole.gif" width="500" height="300" loop>
    </div>
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

<!-- Target -->
<script src="assets/js/target/target.js"></script>
<script src="assets/js/target/resizeSensor.js"></script>
<!-- End of Target -->

<!-- Widget -->
<script src="assets/js/widget/search.js"></script>
<script src="assets/js/widget/basemapGallery.js"></script>
<script src="assets/js/widget/locate.js"></script>
<script src="assets/js/widget/pointing.js"></script>
<link rel="stylesheet" href="assets/js/widget/pointing/pointing.css">
<script src="assets/js/widget/clear.js"></script>
<script src="assets/js/widget/graphicsList.js"></script>
<link rel="stylesheet" href="assets/js/widget/graphicsList/graphicsList.css">
<link rel="stylesheet" href="assets/js/widget/polygons/polygons.css">
<script src="assets/js/widget/search.js"></script>
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

<!-- String -->
<script src="assets/js/strings/string.js"></script>
<!-- End of String -->

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
<script src="assets/js/data/colliersDataVDO.js"></script>
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
<script src="assets/js/graphics/createMark.js"></script>
<script src="assets/js/graphics/createPolygon.js"></script>
<script src="assets/js/graphics/createPolyline.js"></script>
<script src="assets/js/graphics/createRectangle.js"></script>
<script src="assets/js/graphics/createSketch.js"></script>
<script src="assets/js/graphics/createLabel.js"></script>
<script src="assets/js/graphics/createLabelSearch.js"></script>
<script src="assets/js/graphics/getGraphicsInfo.js"></script>
<script src="assets/js/graphics/pointing/pointing.js"></script>
<!-- End of Graphics -->

<!-- Roles -->
<script src="assets/js/roles/roles.js"></script>
<!-- End of Roles -->

<!-- Registers for layer -->
<script src="assets/js/registers/register.js"></script>
<!-- End of Registers for layer -->

<!-- Map Action -->
<script src="assets/js/mapView/click.js"></script>
<script src="assets/js/mapView/when.js"></script>
<!-- End of Map Action -->

<!-- Locator Logic -->
<!-- Context Menu Action -->
<script src="assets/js/locatorlogic/contextMenu/contextMenu.js"></script>
<script src="assets/js/locatorlogic/contextMenu/click.js"></script>
<link rel="stylesheet" href="assets/js/locatorlogic/contextMenu/contextMenu.css">
<script src="assets/js/locatorlogic/contextMenu/removePointer.js"></script>
<script src="assets/js/locatorlogic/contextMenu/action/action.js"></script>
<script src="assets/js/locatorlogic/contextMenu/analyze/analyze.js"></script>
<link rel="stylesheet" href="assets/js/locatorlogic/contextMenu/action/popup/result/viewPopupAnalyzed.css">
<link rel="stylesheet" href="assets/js/locatorlogic/contextMenu/action/popup/result/subViewPopupAnalyzed.css">
<link rel="stylesheet" href="assets/js/locatorlogic/contextMenu/action/popup/config/configPopup.css">
<script src="assets/js/locatorlogic/contextMenu/measurement/measurement.js"></script>
<!-- End of Context Menu Action -->
<!-- End Of Locator Logic -->

<!-- Colliers -->
<link rel="stylesheet" href="assets/js/colliers/slider/slider.css">
<script src="assets/js/colliers/slider/slider.js"></script>
<!-- End Of Colliers -->

<!-- Geometry Services -->
<script src="assets/js/geometryServiceAPI/geometryServiceAPI.js"></script>
<!-- End of Geometry Services -->

<!-- Query -->
<script src="assets/js/query/query.js"></script>
<!-- End of Query -->

<!-- Viewer -->
<script src="assets/js/viewer/viewer.js"></script>
<!-- End of Viewer -->

<!-- Crypt -->
<script src="assets/js/crypt/Barret.js"></script>
<script src="assets/js/crypt/BigInt.js"></script>
<script src="assets/js/crypt/RSA.js"></script>
<script src="assets/js/crypt/token.js"></script>
<!-- <script src="assets/js/crypt/standBy.js"></script> -->
<!-- End of Crypt -->

<!-- Request -->
<script src="assets/js/request/request.js"></script>
<!-- End of Request -->

<!-- Window -->
<script src="assets/js/window/window.js"></script>
<!-- End of Window -->

<!-- Geohash -->
<script src="assets/js/geohash/geohash.js"></script>
<!-- End of Geohash -->

<!-- Single Pie -->
<script src="assets/js/singlePie/singlePie.js"></script>
<!-- End of Single Pie -->

<!-- Features -->
<script src="assets/js/features/features.js"></script>
<!-- End of Features -->

<!-- Departments -->
<script src="assets/js/colliers/colliers.js"></script>
<!-- End Of Departments -->

<script src="assets/logout.js"></script>

<script>
    $(".bg-theme").css("background-color", sessionStorage.getItem("colorTheme"))
    $(".title-property").css("background-color", sessionStorage.getItem("colorTheme"))
    $(".title-size-min-max").css("background-color", sessionStorage.getItem("colorTheme"))
    $(".btn-find").css("background-color", sessionStorage.getItem("colorTheme"))
</script>


</html>