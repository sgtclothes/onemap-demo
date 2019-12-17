function addLocate() {
    var locate = new ESRI.Locate({
        view: mapView2
    })

    mapView2.ui.add(locate, "top-left")
}