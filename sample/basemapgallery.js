function boot(GIS) {
    // TESTING BASEMAP GALLERY WIDGET
    let config = new GIS.Config();
    let map = new GIS.Map(config.CenterPoint);
    map.setBasemap('streets-navigation-vector')
    map.addBasemapGalleryWidget({
        portal: {
            url: "https://www.arcgis.com",
            useVectorBasemaps: true
        }
    }, config.Position[6])
    map.render();

    let btnEmptySelection = document.getElementById('delete');
    btnEmptySelection.onclick = function () {
        map.removeWidget("basemapgallery");
    };
}