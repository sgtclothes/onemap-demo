var createLabel = async function (map, geometry, area, id) {

    var rings = undefined

    await getProjectionGeometryPoint(geometry, "3857", "4326").then(function (results) {
        rings = results
    })

    geometry.longitude = rings[0]["x"]
    geometry.latitude = rings[0]["y"]

    var graphic = new ESRI.Graphic({
        geometry: geometry,
        symbol: {
            type: "text",
            color: "black",
            text: area,
            font: {
                size: 14,
                family: "sans-serif"
            }
        }
    });

    var graphicsLayer = new ESRI.GraphicsLayer({
        id: id
    })
    graphicsLayer.add(graphic)
    groupLayerLabels.add(graphicsLayer)

    sortID(map, "labels", "label-dynamic-buffer-")
    registerAttributes(map, "labels", "label-graphics", 0)

    console.log(map.ObjMap)
}