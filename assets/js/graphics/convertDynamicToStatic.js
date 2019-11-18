var convertDynamicToStatic = async function (map, layer) {
    console.log(layer)

    var nestedid = layer.layer.id
    var parentid = layer.layer.parent.id
    var selector = layer.selector

    console.log(selector)

    getLayerById(map, parentid).remove(getNestedLayerById(map, parentid, nestedid))

    await getProjectionPoint(JSON.stringify(layer.geometry.rings[0]), "3857", "4326").then(function (results) {
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

    var radiusGraphic = new ESRI.Graphic({
        geometry: polygon,
        selector: selector,
        geometry_3857: layer.geometry,
        symbol: fillSymbol,
        popupTemplate: template
    });

    var graphicsLayer = new ESRI.GraphicsLayer({
        id: nestedid + "-s"
    })
    graphicsLayer.add(radiusGraphic)
    groupLayerRadius.add(graphicsLayer)
}