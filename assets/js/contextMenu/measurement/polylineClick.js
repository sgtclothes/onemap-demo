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

        console.log(measurePolyline)

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