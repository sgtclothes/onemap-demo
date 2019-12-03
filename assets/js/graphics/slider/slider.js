var radiusSlider = function (map) {
    $(document).delegate("#slider-radius", "input change", function () {
        var res = document.getElementById("slider-radius-results");
        res.innerHTML = "Area Radius : " + $(this).val() + " km²";
        startCreatingCircle(map, Math.sqrt($(this).val() / Math.PI), "kilometers");
    });

    $(document).delegate("#slider-radius-submit", "click", async function () {
        var val = $(this).prev().val()
        var geometry = getLayerById(map, "hold-radius").graphics.items[0].geometry
        var rings = []

        await getProjectionPoint(JSON.stringify(geometry.rings[0]), "4326", "3857").then(function (results) {
            rings.push(results)
        })

        var polygon = new ESRI.Polygon({
            rings: rings,
            spatialReference: { wkid: 4326 }
        })

        await createCircle(polygon).then(function () {
            sortID(map, "radius", "dynamic-buffer-")
            registerAttributes(map, "radius", "buffer-graphics", 0)
            $("#hold-radius-slider").remove()
            map.ObjMap.remove(getLayerById(map, "hold-radius"))
        })

        let cPoint = new ESRI.Point()
        cPoint.x = localStorage.getItem("livePointingLongitude");
        cPoint.y = localStorage.getItem("livePointingLatitude");

        await getProjectionGeometryPoint(cPoint, "4326", "3857").then(function (results) {
            cPoint.x = results[0]["x"]
            cPoint.y = results[0]["y"]
        })
        createLabel(map, cPoint, "Area : " + val + " km²", "label-dynamic-buffer-")
        map.ObjMap.remove(getLayerById(map, "pointer"))
    })
}

var startCreatingCircle = function (map, radius, unit) {
    var circle = new ESRI.Circle({
        center: [
            localStorage.getItem("livePointingLongitude"),
            localStorage.getItem("livePointingLatitude")
        ],
        radius: radius,
        radiusUnit: unit
    });
    var fillSymbol = defaultSymbolGraphics();
    var graphic = new ESRI.Graphic({
        geometry: circle,
        symbol: fillSymbol
    });

    if (getLayerById(map, "hold-radius")) {
        map.ObjMap.remove(getLayerById(map, "hold-radius"))
        var graphicsLayer = new ESRI.GraphicsLayer({
            id: "hold-radius"
        })

        graphicsLayer.add(graphic)
        map.ObjMap.add(graphicsLayer);
    } else {
        var graphicsLayer = new ESRI.GraphicsLayer({
            id: "hold-radius"
        })

        graphicsLayer.add(graphic)
        map.ObjMap.add(graphicsLayer);
    }
};