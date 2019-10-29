var createDrivingDistance = function (map) {
    let latitude = Number(getLocalStorage("livePointingLatitude", 0))
    let longitude = Number(getLocalStorage("livePointingLongitude", 0))

    map.ObjMapView.goTo({
        target: [longitude, latitude],
        zoom: 14
    });

    fillParameterDrivingDistance(map)
    startDrivingDistance(map, longitude, latitude)
}

var fillParameterDrivingDistance = function (map) {
    let div = document.createElement("DIV")
    div.style.backgroundColor = "white"
    div.style.width = "auto"
    div.style.padding = "5px"
    div.style.height = "auto"
    div.style.fontWeight = "bold"
    div.id = "hold-driving-distance"
    div.innerHTML = "Start create polygon"
    map.ObjMapView.ui.add(div, "bottom-left")
    $.get("assets/js/graphics/modals/createDrivingDistance.html", function (data) {
        $(div).html(data);
    });
}

var startDrivingDistance = function (map, longitude, latitude) {

    //Fill driving distance data
    $(document).delegate(".select-driving-distance-mini", "change", function () {
        if ($(this).val() == 3) {
            $(".driving-historical-mini").show();
        } else {
            $(".driving-historical-mini").hide();
        }
    });

    //Click button for validation
    $(document).delegate(".btn-create-drive-distance-mini", "click", function () {
        let distance = $(".driving-distance-distance-mini").val()
        let unit = $(".select-unit-distance-mini").val()
        processDrivingDistance(map, longitude, latitude, unit, distance)
    });

}

var processDrivingDistance = function (map, longitude, latitude, unit, distance) {

    $("#loading-bar").show()

    let gp = new ESRI.Geoprocessor({
        url: "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3"
    });

    let driveDistanceParams = {
        'f': 'json',
        'env:outSR': 3857,
        'env:processSR': 3857,
        'facilities': '{"geometryType":"esriGeometryPoint","features":[{"geometry":{"x":' + longitude + ',"y":' + latitude + ',"spatialReference":{"wkid":4326}}}],"sr":{"wkid":4326}}',
        'break_units': unit,
        'B_Values': distance
    }

    gp.execute(driveDistanceParams).then(async function (result) {
        let resultValue = result.results[0].value;
        let resultFeatures = resultValue.features;
        let resultGraphics = resultFeatures.map(function (feature) {
            feature.symbol = fillSymbol;
            return feature;
        });

        console.log(resultGraphics)

        let rings = undefined

        await getProjectionPoint(JSON.stringify(resultGraphics[0].geometry.rings[0]), "3857", "4326").then(function (results) {
            rings = results
        })

        var polygon = {
            type: "polygon",
            rings: rings
        };

        var fillSymbol = {
            type: "simple-fill",
            color: [150, 150, 150, 0.2],
            outline: {
                color: "#7a7c80",
                width: 2
            }
        };

        var polygonGraphic = new ESRI.Graphic({
            geometry: polygon,
            geometry_3857: resultGraphics[0].geometry,
            symbol: fillSymbol
        });

        var graphicsLayer = new ESRI.GraphicsLayer({
            id: "drive-distance-"
        })
        graphicsLayer.add(polygonGraphic)
        groupLayerDrivingDistance.add(graphicsLayer)
        sortID(map, "driving-distance", "drive-distance-")
        registerAttributes(map, "driving-distance", "drivedistance-graphics", 0)
        console.log(map.ObjMap)
        $("#loading-bar").hide()
        $("#hold-driving-distance").remove()
    });
}