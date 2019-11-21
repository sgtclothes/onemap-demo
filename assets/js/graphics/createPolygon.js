var createPolygon = async function (geometry) {

    let rings = []

    for (let i = 0; i < geometry.rings.length; i++) {
        await getProjectionPoint(JSON.stringify(geometry.rings[i]), "3857", "4326").then(function (results) {
            rings.push(results)
        })
    }


    var polygon = {
        type: "polygon",
        rings: rings
    };

    var fillSymbol = defaultSymbolGraphics()

    var template = {}

    var polygonGraphic = new ESRI.Graphic({
        geometry: polygon,
        geometry_3857: geometry,
        symbol: fillSymbol,
        popupTemplate: template
    });

    var graphicsLayer = new ESRI.GraphicsLayer()
    graphicsLayer.add(polygonGraphic)
    groupLayerPolygons.add(graphicsLayer)
}