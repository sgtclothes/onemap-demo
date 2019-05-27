function boot(GIS) {
    // TESTING LOCATE WIDGET
    let map = new GIS.Map([117, -4.9]);
    map.setBasemap('streets-navigation-vector')
    map.addLocateWidget("top-right")
    map.render(); 

    let btnEmptySelection = document.getElementById('emptySelection');
    btnEmptySelection.onclick = function() {
        map.removeWidget("locate");
    };
}