var createPolygon = function (polygon, selector, name, reference) {

    var fillSymbol = defaultSymbolGraphics()
    var template = {}
    var countSelector = countLayerBySelector(selector)
    var countReference = countLayerBySelector(reference)

    if (checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("polygon", selector)).length > 0) {
        countSelector = checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("polygon", selector))[0]
    }

    if (checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("polygon", reference)).length > 0) {
        countReference = checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("polygon", reference))[0]
    }

    console.log(countSelector)
    console.log(countReference)

    var polygonGraphic = new ESRI.Graphic({
        geometry: polygon,
        symbol: fillSymbol,
        group: "layer",
        gType: "polygon",
        reference: reference + "-" + countReference,
        selector: selector,
        name: name,
        id: selector + "-" + countSelector,
        popupTemplate: template
    });

    mapView.graphics.add(polygonGraphic)
    console.log(mapView)
    console.log(map)

}

var checkOrderNumbersId = function (items) {
    var activeId = []
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            activeId.push(Number(items[i].id.split("-")[1]))
        }
        var count = activeId.length,
            missing = [];

        for (var i = 0; i < count; i++) {
            if (activeId.indexOf(i) == -1) {
                missing.push(i);
            }
        }
        return missing
    } else {
        return []
    }
}

var checkOrderNumbersReference = function (items) {
    var activeId = []
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            activeId.push(Number(items[i].reference.split("-")[1]))
        }
        var count = activeId.length,
            missing = [];

        for (var i = 0; i <= count; i++) {
            if (activeId.indexOf(i) == -1) {
                missing.push(i);
            }
        }
        return missing
    } else {
        return []
    }
}