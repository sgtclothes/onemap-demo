var mapViewClick = function (map) {
    map.ObjMapView.on("click", function (event) {
        actionElement("#hold-driving-time", "remove")
        actionElement("#hold-driving-distance", "remove")
        graphicsBehavior(map, event)
        pointTheSite(map, event)
        pointingFromNavAnalysis(map, event)
        // getAdministration(map, event)
    })
}

var getAdministration = function (map, event) {
    map.ObjMapView.hitTest(event).then(async function (response) {
        await createPolygon(response.results[0].graphic.geometry)
    })
}

var mapViewHover = function (map, region) {
    map.ObjMapView.on("pointer-move", function (event) {
        map.ObjMapView.hitTest(event).then(function (response) {
            if (response.results.length > 0) {
                if ("PROVINSI" in response.results[0].graphic.attributes || "KABKOT" in response.results[0].graphic.attributes) {
                    $("#mapDiv").css("cursor", "pointer")
                } else {
                    $("#mapDiv").css("cursor", "default")
                }
            } else {
                $("#mapDiv").css("cursor", "default")
            }
        })
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
            if (response.results.length > 0) {
                console.log(response.results)
                if ("analyzed" in response.results[0].graphic) {
                    console.log("Target Analyzed")
                } else if ("selector" in response.results[0].graphic) {
                    console.log("selector")
                    getGraphicsInfo(response, map)
                }
                else if ("layerName" in response.results[0].graphic.attributes) {
                    response.results = []
                    getGraphicsInfo(response, map)
                }
                else {
                    console.log(response)
                    getGraphicsInfo(response, map)
                }
            } else {
                getGraphicsInfo(response, map)
            }
        });
    } else if (event.button == 2) {
        hoveredMeasurement = false
        hoveredDraw = false
        var selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
        map.ObjMapView.hitTest(point).then(function (response) {
            if (response.results.length > 0) {
                if ("analyzed" in response.results[0].graphic) {
                    resetSelectedGraphics()
                    setLocalStorage("selectedLayer", JSON.stringify([response.results[0].graphic.layer.id]))
                    console.log(JSON.parse(getLocalStorage("selectedLayer", [])))
                    setLocalStorage("selectedLayerID", response.results[0].graphic.layer.id)
                    createContextMenu(map, event, condition = ["remove"])
                } else {
                    contextMenuNormal(response, map, event, selectedLayer)
                }
            } else {
                contextMenuNormal(response, map, event, selectedLayer)
            }
        })
    }
}

var contextMenuNormal = function (response, map, event, selectedLayer) {
    if (response.results.length > 0 && (response.results[0].graphic.selector == "buffer-graphics" || response.results[0].graphic.selector == "polygon-graphics" || response.results[0].graphic.selector == "rectangle-graphics" || response.results[0].graphic.selector == "drivetime-graphics" || response.results[0].graphic.selector == "drivedistance-graphics")) {
        selectLayer(response)
        createContextMenu(map, event, condition = ["analyze", "remove"])
    } else {
        if (selectedLayer.length > 0) {
            createContextMenu(map, event, condition = ["analyze", "remove"])
        } else {
            var pointer = getLayerById(map, "pointer")
            if (pointer == undefined) {
                createContextMenu(map, event, condition = ["measurement", "draw"])
            } else {
                createContextMenu(map, event, condition = ["measurement", "draw", "remove pointing"])
            }
        }
    }
}

var mapViewPointerMove = function (map, key) {
    if (key == true) {
        map.ObjMapView.on("pointer-move", function (event) {
            let latitude = map.ObjMapView.toMap({
                x: event.x,
                y: event.y
            }).latitude.toFixed(2)
            let longitude = map.ObjMapView.toMap({
                x: event.x,
                y: event.y
            }).longitude.toFixed(2)
            console.log(latitude, longitude)
        })
    }
}

var mapViewWhenReady = function (map) {
    // Create a site
    map.ObjMapView.when(function () {
        let createSiteDiv = document.getElementById("create-site-div");
        createSiteDiv.style.display = "inline-block";

        let createSiteExpand = new ESRI.Expand({
            expandIconClass: "esri-icon-organization",
            view: map.ObjMapView,
            content: createSiteDiv,
            expanded: false,
            collapseIconClass: "esri-icon-close"
        });

        createSite(createSiteExpand, GIS, map);
        map.ObjMapView.ui.add(createSiteExpand, "top-right");
        //Zoom to Jakarta
        map.ObjMapView.goTo({
            target: [106.8306808, -6.1994095],
            zoom: 13
        });

    });
}

var convertScreenPoint = function (response, map) {
    let latitude = map.ObjMapView.toMap({
        x: response.screenPoint.x,
        y: response.screenPoint.y
    }).latitude.toFixed(7);
    let longitude = map.ObjMapView.toMap({
        x: response.screenPoint.x,
        y: response.screenPoint.y
    }).longitude.toFixed(7);
    return [longitude, latitude]
}

var watchZoomLevel = function (map, provinsi, kabupaten, kecamatan, desa) {
    ESRI.watchUtils.watch(map.ObjMapView, "zoom", function (zoom) {
        if (zoom < 8) {
            provinsi.visible = false
        } else if (zoom >= 8 && zoom < 11) {
            provinsi.visible = true
        } else {
            provinsi.visible = false
        }

        if (zoom < 11) {
            kabupaten.visible = false
        } else if (zoom >= 11 && zoom < 14) {
            kabupaten.visible = true
        } else {
            kabupaten.visible = false
        }

        if (zoom < 14) {
            kecamatan.visible = false
        } else if (zoom >= 14 && zoom < 17) {
            kecamatan.visible = true
        } else {
            kecamatan.visible = false
        }

        if (zoom < 17) {
            desa.visible = false
        } else if (zoom >= 17 && zoom <= 19) {
            desa.visible = true
        } else {
            desa.visible = false
        }
        console.log(zoom)
    });
}