function boot(GIS) {
    // TESTING SEARCH WIDGET
    let config = new GIS.Config();
    let map = new GIS.Map(config.CenterPoint);
    map.setBasemap('streets-navigation-vector')
    map.addSearchWidget(config.Position[6])
    map.render(); 

    let btnEmptySelection = document.getElementById('emptySelection');
    btnEmptySelection.onclick = function() {
        map.removeWidget("search");
    };
}