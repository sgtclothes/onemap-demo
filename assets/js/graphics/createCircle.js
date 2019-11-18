var createCircle = async function (geometry) {

    let rings = undefined

    await getProjectionPoint(JSON.stringify(geometry.rings[0]), "3857", "4326").then(function (results) {
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

    var template = {}

    var circleGraphic = new ESRI.Graphic({
        geometry: polygon,
        geometry_3857: geometry,
        symbol: fillSymbol,
        popupTemplate: template
    });

    var graphicsLayer = new ESRI.GraphicsLayer()
    graphicsLayer.add(circleGraphic)
    groupLayerRadius.add(graphicsLayer)
}