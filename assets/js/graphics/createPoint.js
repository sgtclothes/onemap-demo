var createPoint = function (geometry) {

    var markerSymbol = {
        type: "simple-marker",
        color: [255, 0, 0],
        outline: {
            color: "#7a7c80",
            width: 2
        }
    };

    var pointGraphic = new ESRI.Graphic({
        geometry: geometry,
        symbol: markerSymbol
    });

    var graphicsLayer = new ESRI.GraphicsLayer()
    graphicsLayer.add(pointGraphic)
    groupLayerPoints.add(graphicsLayer)
}