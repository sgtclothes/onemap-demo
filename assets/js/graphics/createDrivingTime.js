function fillParameterDrivingTime() {
    let div = document.createElement("DIV")
    div.style.backgroundColor = "white"
    div.style.borderRadius = "10px"
    div.style.width = "auto"
    div.style.padding = "5px"
    div.style.height = "auto"
    div.style.fontWeight = "bold"
    div.id = "hold-driving-time"
    div.className = "screen-component-map"
    mapView.ui.add(div, "bottom-left")
    $.get("assets/js/graphics/modals/createDrivingTime.html", function (data) {
        $(div).html(data);
    });
}

function processDrivingTime(longitude, latitude, unit, distance) {

    let gp = new ESRI.Geoprocessor({
        url: "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3"
    });

    let driveTimeParams = {
        'f': 'json',
        'env:outSR': 3857,
        'env:processSR': 3857,
        'facilities': '{"geometryType":"esriGeometryPoint","features":[{"geometry":{"x":' + longitude + ',"y":' + latitude + ',"spatialReference":{"wkid":4326}}}],"sr":{"wkid":4326}}',
        'break_units': unit,
        'B_Values': distance
    }

    gp.execute(driveTimeParams).then(function (result) {
        let resultValue = result.results[0].value;
        let resultFeatures = resultValue.features;
        let resultGraphics = resultFeatures.map(function (feature) {
            feature.symbol = fillSymbol;
            return feature;
        });
        console.log(resultGraphics)
    });
}

$(document).delegate(".select-driving-mini", "change", function () {
    inputFilter()
    if ($(this).val() == "3") {
        $(".driving-historical-mini").show()
    } else {
        $(".driving-historical-mini").hide()
    }
})

$(document).delegate(".btn-create-drive-time-mini", "click", function () {
    var distance = $(".distance-time-mini").val()
    var unit = $(".select-unit-time-mini").val()
    processDrivingTime(mapView.extent.center.longitude, mapView.extent.center.latitude, unit, distance)
})

$(document).delegate("#close-driving-time", "click", function () {
    $(".driving-time").remove()
})