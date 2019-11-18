var radiusClick = function (map) {
    $(document).delegate("#contextmenu-radius", "click", function () {
        // $(".image-wrapper-a").remove() //Remove context menu
        // $("#subcontextmenum").remove()
        // $("#subcontextmenud").remove()
        // $("#loading-bar").show()
        // let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        // let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        // let point = new ESRI.Point()
        // point.longitude = longitude;
        // point.latitude = latitude;
        // createDynamicCircle(map, map.ObjMapView.toScreen(point).x, map.ObjMapView.toScreen(point).y)
        createInfoCircleManual(map)

        var area = 0
        var centerPoint = undefined
        var edgePoint = undefined
        var polylineGraphic
        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        sketch.create("circle", { mode: "hybrid" });

        sketch.on("create", async function (event) {
            if (event.state == "start") {
                centerPoint = event.toolEventInfo.added
            }
            if (event.state == "active") {
                edgePoint = event.toolEventInfo.coordinates
                const vertices = [
                    [centerPoint[0], centerPoint[1]],
                    [edgePoint[0], edgePoint[1]]
                ];
                polylineGraphic = new ESRI.Polyline({
                    hasZ: false,
                    hasM: true,
                    paths: [centerPoint, edgePoint]
                });
                calculateArea(map, polylineGraphic, vertices, area)
            }
            if (event.state === "complete") {
                area = $("#hold-circle").text()
                console.log(area)
                $("#hold-circle").remove()
                await createCircle(event.graphic.geometry).then(function () {
                    sortID(map, "radius", "dynamic-buffer-")
                    registerAttributes(map, "radius", "buffer-graphics", 0)
                    delete window.sketch
                    createSketch(map)
                })

                let cPoint = new ESRI.Point()
                cPoint.x = centerPoint[0];
                cPoint.y = centerPoint[1];
                createLabel(map, cPoint, area, "label-dynamic-buffer-")
            }
            if (event.state === "cancel") {
                $("#hold-circle").remove()
                delete window.sketch
                createSketch(map)
            }
        })
    })
}

var drivingdistanceClick = function (map) {
    $(document).delegate("#contextmenu-driving-distance", "click", function () {
        $(".image-wrapper-a").remove()
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        createDrivingDistance(map)
    })
}

var drivingtimeClick = function (map) {
    $(document).delegate("#contextmenu-driving-time", "click", function () {
        $(".image-wrapper-a").remove()
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        createDrivingTime(map)
    })
}

var manualClick = function (map) {

    $(document).delegate("#contextmenu-manual", "click", function () {

        createInfoPolygonManual(map)

        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        sketch.create("polygon", { mode: "hybrid" });

        sketch.on("create", async function (event) {
            if (event.state === "complete") {
                $("#hold-manual").remove()
                await createPolygon(event.graphic.geometry).then(function () {
                    sortID(map, "polygons", "dynamic-polygon-")
                    registerAttributes(map, "polygons", "polygon-graphics", 0)
                    delete window.sketch
                    createSketch(map)
                })
            }
            if (event.state === "cancel") {
                $("#hold-manual").remove()
                delete window.sketch
                createSketch(map)
            }
        })
    })
}

var createInfoCircleManual = function (map) {
    let hold = document.createElement("DIV")
    hold.style.backgroundColor = "white"
    hold.style.width = "200px"
    hold.style.textAlign = "center"
    hold.style.fontWeight = "bold"
    hold.id = "hold-circle"
    hold.innerHTML = "Start create circle"
    map.ObjMapView.ui.add(hold, "bottom-left")
}

var createInfoPolygonManual = function (map) {
    let hold = document.createElement("DIV")
    hold.style.backgroundColor = "white"
    hold.style.width = "200px"
    hold.style.textAlign = "center"
    hold.style.fontWeight = "bold"
    hold.id = "hold-manual"
    hold.innerHTML = "Start create polygon"
    map.ObjMapView.ui.add(hold, "bottom-left")
}

var calculateArea = function (map, polylineGraphic, vertices, area) {
    polylineGraphic.geometry = new ESRI.Polyline({
        paths: vertices,
        spatialReference: map.ObjMapView.spatialReference
    });

    var length = ESRI.geometryEngine.geodesicLength(
        polylineGraphic.geometry,
        "kilometers"
    );

    area = length * length * Math.PI

    var point = new ESRI.Point()
    point.x = vertices[1][0]
    point.y = vertices[1][1]

    $("#hold-circle").text("Area : " + area.toFixed(2) + " km²")
}