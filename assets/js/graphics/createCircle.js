var createCircle = async function (geometry) {

    let rings = undefined

    await getProjectionPoint(JSON.stringify(geometry.rings[0]), "3857", "4326").then(function (results) {
        rings = results
    })

    var polygon = {
        type: "polygon",
        rings: rings
    };

    var fillSymbol = defaultSymbolGraphics()

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