function addLocate() {

    //Add new locate object 
    var locate = new ESRI.Locate({
        view: mapView
    })

    //Add locate object to mapView
    mapView.ui.add(locate, "top-left")
}