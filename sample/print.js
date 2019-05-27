function boot(GIS) {
    // TESTING PRINT WIDGET
    let map = new GIS.Map([117, -4.9]);
    map.setBasemap('streets-navigation-vector')
    const printServiceUrl = "http://tig.co.id/ags/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    map.addPrintWidget(printServiceUrl, "top-right")
    map.render(); 

    let btnEmptySelection = document.getElementById('emptySelection');
    btnEmptySelection.onclick = function() {
        map.removeWidget("print");
    };
}