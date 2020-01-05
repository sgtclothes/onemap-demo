var createMark = function (point, selector, name, reference) {

    var fillSymbol = {
        type: "simple-marker",
        style: "circle",
        color: "white",
        size: "12",
    };

    var template = {}
    var countSelector = countLayerBySelector(selector)
    var countReference = countLayerBySelector(reference)

    if (checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("marker", selector)).length > 0) {
        countSelector = checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("marker", selector))[0]
    }

    if (checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("marker", reference)).length > 0) {
        countReference = checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("marker", reference))[0]
    }

    var pointGraphic = new ESRI.Graphic({
        geometry: point,
        symbol: fillSymbol,
        group: "layer",
        gType: "marker",
        reference: reference + "-" + countReference,
        selector: selector,
        name: name,
        id: selector + "-" + countSelector,
        popupTemplate: template
    });

    mapView.graphics.add(pointGraphic)
    console.log(mapView)

}