var radiusClick = function (map) {
    $(document).delegate("#contextmenu-radius", "click", function () {
        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        $("#loading-bar").show()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;
        createDynamicCircle(map, map.ObjMapView.toScreen(point).x, map.ObjMapView.toScreen(point).y)
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