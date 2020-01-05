var createPolyline = function (polyline, selector, name, reference) {

    var lineSymbol = {
        type: "simple-line",
        color: "white",
        width: "2",
        style: "solid"
    }
    var template = {}
    var countSelector = countLayerBySelector(selector)
    var countReference = countLayerBySelector(reference)

    if (checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("polyline", selector)).length > 0) {
        countSelector = checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("polyline", selector))[0]
    }

    if (checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("polyline", reference)).length > 0) {
        countReference = checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("polyline", reference))[0]
    }

    console.log(countSelector)
    console.log(countReference)

    var polylineGraphic = new ESRI.Graphic({
        geometry: polyline,
        symbol: lineSymbol,
        group: "layer",
        gType: "polyline",
        reference: reference + "-" + countReference,
        selector: selector,
        name: name,
        id: selector + "-" + countSelector,
        popupTemplate: template
    });

    mapView.graphics.add(polylineGraphic)
    console.log(mapView)
    console.log(map)

}