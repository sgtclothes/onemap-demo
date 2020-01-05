function mapViewWhen() {
    mapView.when(function () {
        addLocate()
        addBasemapGallery()
        addFocusPointing()
        addClearButton()
        addSearch()
        addGraphicsList()
    })
}