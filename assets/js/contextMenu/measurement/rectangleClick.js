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
                    console.log(map.ObjMap)
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