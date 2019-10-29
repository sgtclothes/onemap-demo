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

        sketch.create("polyline", { mode: "hybrid" });

        sketch.on("create", async function (event) {
            if (event.state === "active") {
                map.ObjMapView.on("click", function () {
                    console.log(event.graphic.geometry)
                })
            }
            if (event.state === "complete" || event.state === "cancel") {
                $("#hold-polyline").remove()
                // await createPolygon(event.graphic.geometry).then(function () {
                //     sortID(map, "polygons", "dynamic-polygon-")
                //     registerAttributes(map, "polygons", "polygon-graphics", 0)
                //     delete window.sketch
                //     createSketch(map)
                // })
                console.log(JSON.stringify(event.graphic.geometry.paths[0]))
                delete window.sketch
                createSketch(map)
            }
        })
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