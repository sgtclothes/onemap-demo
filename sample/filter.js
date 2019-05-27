function boot(GIS) {

    let map = new GIS.Map([117, -3]);
    // map.setBasemap('hybrid')
    map.render(); 

    let field = "PROVINSI"
    let place = "MINIMARKET";
    let fields = null;
    let services = null;
    let filter = null; 

    if (place == "RS") {
        services = "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/377"
        fields = ["RS,PROVINSI,KAB_KOTA,KECAMATAN"]
    } else if (place == "MINIMARKET") {
        services = "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/648"
        fields = ["MINIMARKET,PROVINSI,KAB_KOTA,KECAMATAN"]
    }

    let queryMap = new GIS.Task.Query();

    queryMap.setServiceUrl(services);
    queryMap.setOutFields(fields);
    queryMap.setField(field);
    queryMap.setPlace(place)
    queryMap.setOperatorOne("LIKE", "SUMATERA")
    queryMap.setOperatorTwo(">=", 1)
    queryMap.setWhereStr()
    
    console.log(queryMap)

    let popupTemplate = new GIS.Task.PopupTemplate("<b>" + place + " AT </b>{PROVINSI}", "{*}");

    let simpleMarker = new GIS.Drawset.SimpleMarkerSymbol("circle", "red", "8px", [ 236, 28, 36, 0.25 ], 1)

    filter = new GIS.Task.Filter(queryMap,map.ObjMapView,simpleMarker,popupTemplate);
    
    filter.run();

    // // button clear selection
    // let btnEmptySelection = document.getElementById('emptySelection');
    // btnEmptySelection.onclick = function() {
    //     filter.remove();
    // };
}