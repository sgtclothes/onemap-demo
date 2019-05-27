function boot(GIS) {
    // TESTING DIRECTIONS WIDGET
    let config = new GIS.Config();
    let map = new GIS.Map(config.CenterPoint);
    map.setBasemap('streets-navigation-vector')
    
    const routeServiceUrl = "https://utility.arcgis.com/usrsvcs/appservices/Zprs58pzgVQhvYTN/rest/services/World/Route/NAServer/Route_World/"
    map.addDirectionsWidget(routeServiceUrl, config.Position[6])
    map.render(); 

    let btnRemove = document.getElementById('remove');
    btnRemove.onclick = function() {
        map.removeWidget("directions");
    };
}