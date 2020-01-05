var createCircle = function (polygon, name) {

    var fillSymbol = defaultSymbolGraphics()
    var template = {}
    var count = countLayerBySelector("buffer")

    var circleGraphic = new ESRI.Graphic({
        geometry: polygon,
        symbol: fillSymbol,
        gType: "polygon",
        selector: "buffer",
        name: name,
        id: "buffer-" + count,
        popupTemplate: template
    });

    mapView.graphics.add(circleGraphic)
}