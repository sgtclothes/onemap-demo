var fillParameterDrivingDistance = function (map) {
    let div = document.createElement("DIV")
    div.style.backgroundColor = "white"
    div.style.borderRadius = "10px"
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

        let rings = undefined

        await getProjectionPoint(JSON.stringify(resultGraphics[0].geometry.rings[0]), "3857", "4326").then(function (results) {
            rings = results
        })

        var polygon = {
            type: "polygon",
            rings: rings
        };

        var fillSymbol = defaultSymbolGraphics()

        var template = {}

        var polygonGraphic = new ESRI.Graphic({
            geometry: polygon,
            geometry_3857: resultGraphics[0].geometry,
            symbol: fillSymbol,
            popupTemplate: template
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