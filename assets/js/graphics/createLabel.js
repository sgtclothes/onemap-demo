var createLabel = function (graphic, selector, name, text, reference) {

    var point = new ESRI.Point()
    var countSelector = countLayerBySelector(selector)
    var countReference = countLayerBySelector(reference) - 1

    if (checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("text", selector)).length > 0) {
        countSelector = checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("text", selector))[0]
    }
    if (checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("text", reference)).length > 0) {
        countReference = checkOrderNumbersReference(getLayerViewByGraphicsTypeAndTypeReference("text", reference))[0]
    }

    console.log(countSelector)
    console.log(countReference)

    if (reference == "buffer" || reference == "search" || reference == "polygon") {
        point.latitude = graphic.centroid.latitude
        point.longitude = graphic.centroid.longitude
    } else if (reference == "marker") {
        point.latitude = graphic.latitude
        point.longitude = graphic.longitude
    } else if (reference == "polyline") {
        point.latitude = graphic.extent.center.latitude
        point.longitude = graphic.extent.center.longitude
    }

    var labelGraphic = new ESRI.Graphic({
        geometry: point,
        group: "text",
        gType: "text",
        reference: reference + "-" + countReference,
        selector: selector,
        name: name,
        id: selector + "-" + countSelector,
        symbol: {
            type: "text",
            color: "black",
            text: text,
            font: {
                size: 10,
                family: "sans-serif"
            }
        }
    });

    mapView.graphics.add(labelGraphic)
}