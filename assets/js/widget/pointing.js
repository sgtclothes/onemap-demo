function addFocusPointing() {
    var focus = $("<div>").addClass("esri-component esri-widget--button esri-widget esri-icon-zoom-in-fixed focus-pointing")
    mapView.ui.add($(focus)[0], "top-left")
}

$(document).delegate(".focus-pointing", "click", function () {
    var pointing = getLayerViewById("pointing")
    if (pointing !== undefined) {
        mapView.goTo({
            target: pointing
        })
    }
})