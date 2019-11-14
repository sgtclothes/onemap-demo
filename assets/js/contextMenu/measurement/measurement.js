var pointClick = function (map) {

    $(document).delegate("#contextmenu-point", "click", function () {

        createInfoPoint(map)

        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        sketch.create("point", { mode: "hybrid" });

        sketch.on("create", async function (event) {
            if (event.state === "complete" || event.state === "cancel") {
                $("#hold-point").remove()
                createPoint(event.graphic.geometry)
                sortID(map, "points", "point-")
                registerAttributes(map, "points", "point-graphics", 0)
                delete window.sketch
                createSketch(map)
            }
        })
    })
}

var createInfoPoint = function (map) {
    let hold = document.createElement("DIV")
    hold.style.backgroundColor = "white"
    hold.style.width = "200px"
    hold.style.textAlign = "center"
    hold.style.fontWeight = "bold"
    hold.id = "hold-point"
    hold.innerHTML = "Start create a point"
    map.ObjMapView.ui.add(hold, "bottom-left")
}

var polygonClick = function (map) {

    $(document).delegate("#contextmenu-polygon", "click", function () {

        createInfoPolygon(map)

        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        let measurePolygon = new ESRI.AreaMeasurement2D({
            view: map.ObjMapView
        });

        // skip the initial 'new measurement' button
        measurePolygon.viewModel.newMeasurement();
        measurePolygon.watch("viewModel.state", function (state) {
            if (state == "measured") {
                $("#hold-polygon").remove()
                $("body").css("cursor", "default")
            }
        });
    })
}

var createInfoPolygon = function (map) {
    let hold = document.createElement("DIV")
    hold.style.backgroundColor = "white"
    hold.style.width = "200px"
    hold.style.textAlign = "center"
    hold.style.fontWeight = "bold"
    hold.id = "hold-polygon"
    hold.innerHTML = "Start create polygon"
    map.ObjMapView.ui.add(hold, "bottom-left")
}

var polylineClick = function (map) {

    $(document).delegate("#contextmenu-polyline", "click", function () {

        createInfoPolyline(map)

        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        let palette = {
            handleWidth: 2,
            pathWidth: 2,
            pathPrimaryColor: [255, 0, 0],
            pathSecondaryColor: [255, 0, 0],
            handleColor: [255, 0, 0]
        }

        let measurePolyline = new ESRI.DistanceMeasurement2D({
            view: map.ObjMapView
        });

        measurePolyline.viewModel.palette = palette

        // skip the initial 'new measurement' button
        measurePolyline.viewModel.newMeasurement();
        measurePolyline.watch("viewModel.state", function (state) {
            if (state == "measured") {
                $("#hold-polyline").remove()
                $("body").css("cursor", "")
            }
        });
    })
}

var createInfoPolyline = function (map) {
    let hold = document.createElement("DIV")
    hold.style.backgroundColor = "white"
    hold.style.width = "200px"
    hold.style.textAlign = "center"
    hold.style.fontWeight = "bold"
    hold.id = "hold-polyline"
    hold.innerHTML = "Start create polyline"
    map.ObjMapView.ui.add(hold, "bottom-left")
}

var rectangleClick = function (map) {

    $(document).delegate("#contextmenu-rectangle", "click", function () {

        createInfoRectangle(map)

        $(".image-wrapper-a").remove() //Remove context menu
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        sketch.create("rectangle", { mode: "hybrid" });

        sketch.on("create", async function (event) {
            if (event.state === "complete" || event.state === "cancel") {
                $("#hold-rectangle").remove()
                await createRectangle(event.graphic.geometry).then(function () {
                    sortID(map, "rectangles", "rectangle-")
                    registerAttributes(map, "rectangles", "rectangle-graphics", 0)
                    delete window.sketch
                    createSketch(map)
                })
            }
        })
    })
}

var createInfoRectangle = function (map) {
    let hold = document.createElement("DIV")
    hold.style.backgroundColor = "white"
    hold.style.width = "200px"
    hold.style.textAlign = "center"
    hold.style.fontWeight = "bold"
    hold.id = "hold-rectangle"
    hold.innerHTML = "Start create rectangle"
    map.ObjMapView.ui.add(hold, "bottom-left")
}