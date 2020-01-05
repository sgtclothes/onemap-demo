function addClearButton() {
    var clear = $("<div>").addClass("esri-component esri-widget--button esri-widget esri-icon-trash clear-all-graphics")
    mapView.ui.add($(clear)[0], "top-left")
}

$(document).delegate(".clear-all-graphics", "click", function () {
    mapView.graphics.removeAll()
    $(".screen-component-map").remove()
    $("#current-point").text("None")
    console.log(mapView.graphics)
})