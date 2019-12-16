<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dashboard</title>
    <link rel="icon" href="assets/images/icons/favicon.ico">

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
    <link rel="stylesheet" href="assets/css/style-dashboard.css" type="text/css" />

    <link rel="stylesheet" href="assets/css/jquery/jquery-ui-1.12.1.css">
    <script src="assets/js/jquery-1.12.4.js"></script>
    <script src="assets/js/jquery-1.12.1.js"></script>
    <script src="assets/js/jquery.cookie.min.js"></script>
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
    <script src="assets/js/layout/default/app.js"></script>
    <script src="https://unpkg.com/imask"></script>
    <!-- /themes & template js files -->

    <style>
        #viewDiv {
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
        }

        ul.list-group.list-group-striped li:nth-of-type(odd) {
            background: #e9e9f0;
        }

        ul.list-group.list-group-striped li:nth-of-type(even) {
            background: #d7dbd8;
        }

        ul.list-group.list-group-hover li:hover {
            background: #f7f7f7;
        }
    </style>

    <link rel="stylesheet" href="https://js.arcgis.com/4.12/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.12/"></script>
    <script type="module" src="library/library.js"></script>
    <script src="sample/dashboardBoot.js"></script>
</head>

<body id="main" class="navbar-top backbody">
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
                <i class="icon-tree5"></i>
            </button>
            <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
                <i class="icon-paragraph-justify3"></i>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="navbar-mobile">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a id="viewer-nav" href="#" class="navbar-nav-link">
                        <i class="mi-dashboard"></i>Dashboard
                    </a>
                </li>

                <li class="nav-item">
                    <a id="viewer-nav" href="#" class="navbar-nav-link">
                        <i class="mi-assignment"></i>Project
                    </a>
                </li>

                <li class="nav-item">
                    <a id="viewer-nav" href="#" class="navbar-nav-link">
                        <i class="mi-location-city"></i>Sites
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
                    <div class="dropdown-menu dropdown-menu-right">
                        <!-- <a href="#" id="modal-profile-onemap" class="dropdown-item" data-toggle="modal" data-target="#modal_my_profile"><i class="icon-user-plus"></i> My profile</a> -->
                        <div class="dropdown-divider"></div>
                        <a id="logout" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
                    </div>
                </li>
                <!-- /user menu item navbar -->
            </ul>
        </div>
    </div>
    <div class="backbody">
        <div id="menu-dashboard">
            <div class="mb-3 mt-3">
                <div class="no-gutters row">
                    <div class="col-sm-6 col-md-4 col-xl-4">
                        <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div class="icon-wrapper rounded-circle">
                                <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
                                <i class="lnr-laptop-phone text-dark opacity-8"></i>
                            </div>
                            <div class="widget-chart-content bg-theme">
                                <table class="table text-white">
                                    <tr>
                                        <td>
                                            <div>
                                                <img src="assets\images\dashboard\01_Land existing.png" width="50" height="50">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="widget-subheading">Land Existing</div>
                                            <div class="widget-numbers">500</div>
                                        </td>
                                        <td>
                                            <div class="dropdown-custom">▼
                                                <div class="dropdown-content-custom">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="divider m-0 d-md-none d-sm-block"></div>
                    </div>
                    <div class="col-sm-6 col-md-4 col-xl-4">
                        <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div class="icon-wrapper rounded-circle">
                                <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                                <i class="lnr-graduation-hat text-white"></i>
                            </div>
                            <div class="widget-chart-content bg-theme">
                                <table class="table text-white">
                                    <tr>
                                        <td>
                                            <div>
                                                <img src="assets\images\dashboard\02_on progress.png" width="50" height="50">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="widget-subheading">On Progress</div>
                                            <div class="widget-numbers">200</div>
                                        </td>
                                        <td>
                                            <div class="dropdown-custom">▼
                                                <div class="dropdown-content-custom">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="divider m-0 d-md-none d-sm-block"></div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-xl-4">
                        <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div class="icon-wrapper rounded-circle">
                                <div class="icon-wrapper-bg opacity-9 bg-success"></div>
                                <i class="lnr-apartment text-white"></i>
                            </div>
                            <div class="widget-chart-content bg-theme">
                                <table class="table text-white">
                                    <tr>
                                        <td>
                                            <div>
                                                <img src="assets\images\dashboard\03_request.png" width="50" height="50">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="widget-subheading">Request</div>
                                            <div class="widget-numbers">200</div>
                                        </td>
                                        <td>
                                            <div class="dropdown-custom">▼
                                                <div class="dropdown-content-custom">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:200px;" class="row">
                <div style="height:300px;" class="col-md-6 overflow-auto border">
                    <h4>Latest News</h4>
                    <ul class="timeline">
                        <li>
                            <a target="_blank" href="https://www.totoprayogo.com/#">Pending Task</a>
                            <a href="#" class="float-right">21 November, 2019</a>
                            <p>You have 4 pending tasks!</p>
                        </li>
                        <li>
                            <a href="#">Update Property</a>
                            <a href="#" class="float-right">24 November, 2019</a>
                            <p>sigit.sasongko just updated property property_type house with objectid = 4</p>
                        </li>
                        <li>
                            <a href="#">Add Property</a>
                            <a href="#" class="float-right">1 December, 2019</a>
                            <p>sigit.sasongko just add new property!</p>
                        </li>
                        <li>
                            <a href="#">Add Property</a>
                            <a href="#" class="float-right">1 December, 2019</a>
                            <p>sigit.sasongko just add new property!</p>
                        </li>
                        <li>
                            <a href="#">Add Property</a>
                            <a href="#" class="float-right">1 December, 2019</a>
                            <p>sigit.sasongko just add new property!</p>
                        </li>
                        <li>
                            <a href="#">Add Property</a>
                            <a href="#" class="float-right">1 December, 2019</a>
                            <p>didit.priyono just add new property!</p>
                        </li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <div id="viewDiv"></div>
                </div>
            </div>
            <!-- <table style="margin-top:10px; width:100%;height:20%;">
                <tr>
                    <td>
                        <table style="width:100%;height:100%;">
                            <tr>
                                <td style="width:100px; margin:0; padding:0px;" valign="top">
                                    <table class="table-striped" style="margin-right:20px; font-size:12px; height:100%; text-align:center;">
                                        <tr>
                                            <td colspan="2">System</td>
                                            <td>Activities</td>
                                        </tr>
                                        <tr>
                                            <td><i class="mi-notifications"></i></td>
                                            <td>You have 4 pending tasks!</td>
                                            <td>Just Now</td>
                                        </tr>
                                        <tr>
                                            <td><i class="mi-notifications"></i></td>
                                            <td>New Version v1.4 just launched!</td>
                                            <td>20 Mins</td>
                                        </tr>
                                        <tr>
                                            <td><i class="mi-trending-down"></i></td>
                                            <td>Database server #12 overloaded. Please fix the issue</td>
                                            <td>24 Mins</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width:70%; height:400px;">
                        <div id="viewDiv"></div>
                    </td>
                </tr>
            </table> -->
        </div>
        <!-- <div id="menu-sites">
            <p class="title-pr">SITE</p>
            <ul style="margin:0; padding:0;" class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#tab-overview">Overview</a></li>
                <li><a data-toggle="tab" href="#tab-analysis">Analysis</a></li>
                <li><a data-toggle="tab" href="#tab-documents">Documents</a></li>
                <li><a data-toggle="tab" href="#tab-survey-questions">Survey Questions</a></li>
                <li><a data-toggle="tab" href="#tab-comments">Comments</a></li>
            </ul>
            <div class="tab-content">
                <div id="tab-overview" class="tab-pane fade in active">
                    <h3>Site details</h3>
                    <table class="full-width">
                        <tr>
                            <td>
                                <table class="table-striped">
                                    <tr>
                                        <td>Site Name</td>
                                        <td>A</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>Jalan XYZ</td>
                                    </tr>
                                    <tr>
                                        <td>Coordinate</td>
                                        <td>106,12523; -6,234123</td>
                                    </tr>
                                    <tr>
                                        <td>Size</td>
                                        <td>300 m<sup>2</sup></td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>Hak Milik</td>
                                    </tr>
                                    <tr>
                                        <td>Owner</td>
                                        <td>Deni Andri</td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td colspan="2">Summary</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>In Progress</td>
                                    </tr>
                                    <tr>
                                        <td>Due</td>
                                        <td>1 Mei 2018</td>
                                    </tr>
                                    <tr>
                                        <td>Surveyor</td>
                                        <td>Jaka Wondo</td>
                                    </tr>
                                    <tr>
                                        <td>Last Update</td>
                                        <td>By Wisnu H</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">13 April 2018</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <ul style="margin:0; padding:0;" class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#tab-description">Description</a></li>
                    <li><a data-toggle="tab" href="#tab-nearby-poi">Nearby POI</a></li>
                </ul>
                <div class="tab-content">
                    <div class="div-down tab-pane fade in active" id="tab-description">
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</body>
<script>
    $(".bg-theme").css("background-color", sessionStorage.getItem("colorTheme"))
    $(".head-point").css("background-color", sessionStorage.getItem("colorTheme"))
    $(".title-size-min-max").css("background-color", sessionStorage.getItem("colorTheme"))
</script>
<script src="assets/logout.js"></script>

</html>