var polygonClick = function (map) {

    createSketch(map)

    $(document).delegate("#contextmenu-polygon", "click", function () {
        $(".image-wrapper-a").remove() //Remove context menu
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;

        sketch.create("polygon", { mode: "hybrid" });

        sketch.on("create", function (event) {
            if (event.state === "complete") {
                console.log(event.graphic.geometry)
                delete window.sketch
                createSketch(map)
            }
        })
    })
}