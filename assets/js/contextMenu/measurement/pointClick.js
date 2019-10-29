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