var createPolygon = async function (geometry, attributes) {

    let rings = []
    var polygonGraphic = undefined

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

    if (attributes) {
        polygonGraphic = new ESRI.Graphic({
            attributes: attributes,
            geometry: polygon,
            geometry_3857: geometry,
            symbol: fillSymbol,
            popupTemplate: template
        });
    } else {
        polygonGraphic = new ESRI.Graphic({
            geometry: polygon,
            geometry_3857: geometry,
            symbol: fillSymbol,
            popupTemplate: template
        });
    }

    var graphicsLayer = new ESRI.GraphicsLayer()
    graphicsLayer.add(polygonGraphic)
    groupLayerPolygons.add(graphicsLayer)
}