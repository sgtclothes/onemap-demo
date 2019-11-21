var createRectangle = async function (geometry) {

    let rings = undefined

    await getProjectionPoint(JSON.stringify(geometry.rings[0]), "3857", "4326").then(function (results) {
        rings = results
    })

    var polygon = {
        type: "polygon",
        rings: rings
    };

    var fillSymbol = defaultSymbolGraphics()

    var rectangleGraphic = new ESRI.Graphic({
        geometry: polygon,
        geometry_3857: geometry,
        symbol: fillSymbol
    });

    var graphicsLayer = new ESRI.GraphicsLayer()
    graphicsLayer.add(rectangleGraphic)
    groupLayerRectangles.add(graphicsLayer)
}