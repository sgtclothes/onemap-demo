function mapViewClick(map) {
    map.ObjMapView.on("click", function (event) {
        graphicsBehavior(map, event)
        pointTheSite(map, event)
        pointingFromNavAnalysis(map, event)
    })
}

var pointTheSite = function (map, event) {
    if (pointTheSiteEnabled) {
        pointTheSiteEnabled = !pointTheSiteEnabled;
        document
            .getElementById("mapDiv")
            .setAttribute("style", "cursor:crosshair;");
        let latitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
        }).latitude.toFixed(7);

        let longitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
        }).longitude.toFixed(7);

        document.getElementById("lat-site").value = latitude;
        document.getElementById("lon-site").value = longitude;
        document
            .getElementById("create-site-div")
            .setAttribute(
                "style",
                "background: rgba(255, 255, 255, 0.8) none repeat scroll 0% 0%; display:inline-block; width: 500px;"
            );
    }
    if (pointTheSiteEnabled == false) {
        document
            .getElementById("mapDiv")
            .setAttribute("style", "cursor:default;");
    }
}

var pointingFromNavAnalysis = function (map, event) {
    //Click pointing button to start pointing and get latlong
    $(document).delegate("#pointing-btn", "click", function () {
        pointEnabled = true;
        $("#mapDiv").attr("style", "cursor:crosshair;");
    })

    if (pointEnabled) {
        pointEnabled = !pointEnabled;
        let latitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
        }).latitude.toFixed(7);

        let longitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
        }).longitude.toFixed(7);

        let pointing = new GIS.Buffer.Pointing(
            map.ObjMapView,
            latitude,
            longitude
        );
        pointing.setPictureMarker();
        pointing.render();
        $("#error-input-points").hide();
        $("#error-down-service").hide();

        $.addRows();
        $.each(window.counterArr, function (index, value) {
            if ($(".latitude-form-" + value).val() === "") {
                $(".latitude-form-" + value).val(latitude);
                $(".longitude-form-" + value).val(longitude);
                $(".latitude-form-" + value).attr(
                    "title",
                    "Latitude " + latitude
                );
                $(".longitude-form-" + value).attr(
                    "title",
                    "Longitude " + longitude
                );
                $("#form-list").delegate(
                    ".selectbuffer-" + value,
                    "click",
                    function () {
                        $("#error-input-buffer").hide();
                        $("#error-down-service").hide();
                        $.get(
                            "content/template/instant_analysis/buffer.php",
                            function (data) {
                                $(".form-buffer-" + value).append(data);
                            }
                        );
                    }
                );
                $("#form-list").delegate(
                    ".selectdrive-" + value,
                    "click",
                    function () {
                        $("#error-input-buffer").hide();
                        $("#error-down-service").hide();
                        $.get(
                            "content/template/instant_analysis/driving.php",
                            function (data) {
                                $(".form-drive-" + value).append(data);
                            }
                        );
                    }
                );
                $("#form-list").delegate(
                    ".selectdrive-distance-" + value,
                    "click",
                    function () {
                        $("#error-input-buffer").hide();
                        $("#error-down-service").hide();
                        $.get(
                            "content/template/instant_analysis/driving_distance.php",
                            function (data) {
                                $(".form-drive-distance-" + value).append(data);
                            }
                        );
                    }
                );
            }
        });
    }
    if (pointEnabled == false) {
        $("#mapDiv").attr("style", "cursor:default;");
    }
}

var graphicsBehavior = function (map, event) {
    $(".image-wrapper-a").remove()
    $("#subcontextmenum").remove()
    $("#subcontextmenud").remove()
    let point = new ESRI.Point(event.x, event.y)
    if (event.button == 0) {
        hoveredMeasurement = false
        hoveredDraw = false
        map.ObjMapView.hitTest(point).then(function (response) {
            getGraphicsInfo(response, map)
        });
    } else if (event.button == 2) {
        hoveredMeasurement = false
        hoveredDraw = false
        var selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
        map.ObjMapView.hitTest(point).then(function (response) {
            if (response.results.length > 0 && (response.results[0].graphic.selector == "buffer-graphics" || response.results[0].graphic.selector == "polygon-graphics" || response.results[0].graphic.selector == "rectangle-graphics" || response.results[0].graphic.selector == "drivetime-graphics" || response.results[0].graphic.selector == "drivedistance-graphics")) {
                selectLayer(response)
                createContextMenu(map, event, condition = ["analyze", "remove"])
            } else {
                if (selectedLayer.length > 0) {
                    createContextMenu(map, event, condition = ["analyze", "remove"])
                } else {
                    createContextMenu(map, event, condition = ["measurement", "draw"])
                }
            }
        })
    }
}
