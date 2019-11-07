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

        let palette = {
            handleWidth: 2,
            pathWidth: 2,
            pathPrimaryColor: [255, 0, 0],
            pathSecondaryColor: [255, 0, 0],
            handleColor: [255, 0, 0]
        }

        let measurePolygon = new ESRI.AreaMeasurement2D({
            view: map.ObjMapView
        });

        // measurePolygon.viewModel.palette = palette

        console.log(measurePolygon)

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