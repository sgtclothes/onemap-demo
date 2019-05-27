function boot(GIS) {
    // TESTING PRINT WIDGET
    let map = new GIS.Map([117, -4.9]);
    map.setBasemap('streets-navigation-vector')
    map.addHomeWidget("top-left")
    map.render(); 

    let btnEmptySelection = document.getElementById('emptySelection');
    btnEmptySelection.onclick = function() {
        map.removeWidget("home");
    };
}