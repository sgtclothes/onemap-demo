var createLabelSearch = async function (map, geometry, area, id) {

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
            horizontalAlignment: "left",
            width: "auto",
            xoffset: -50,
            yoffset: 10,
            font: {
                size: 5,
                family: "sans-serif"
            }
        },
        visible: false
    });

    var graphicsLayer = new ESRI.GraphicsLayer({
        id: id
    })
    graphicsLayer.add(graphic)
    groupLayerLabels.add(graphicsLayer)
}