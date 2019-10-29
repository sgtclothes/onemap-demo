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

        sketch.create("polygon", { mode: "hybrid" });

        sketch.on("create", async function (event) {
            if (event.state === "complete" || event.state === "cancel") {
                $("#hold-polygon").remove()
                await createPolygon(event.graphic.geometry).then(function () {
                    sortID(map, "polygons", "dynamic-polygon-")
                    registerAttributes(map, "polygons", "polygon-graphics", 0)
                    delete window.sketch
                    createSketch(map)
                })
            }
        })
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