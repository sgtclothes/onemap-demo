function boot(GIS) {
    // TESTING LOCATE WIDGET
    let config = new GIS.Config();
    let map = new GIS.Map(config.CenterPoint);
    map.setBasemap('streets-navigation-vector')
    map.addLocateWidget("top-right")
    map.addBasemapGalleryWidget({
        portal: {
            url: "https://www.arcgis.com",
            useVectorBasemaps: true
        }
    }, config.Position[6])
    map.render();
}