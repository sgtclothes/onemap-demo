var widgetCollection = function (map) {
    var search = new ESRI.Search( //Add search widget in sidenav layers
        {
            view: map.ObjMapView
        },
        "search-widget-property"
    );

    var searchWidget = new ESRI.Search({
        view: map.ObjMapView
    });

    map.ObjMapView.ui.add(searchWidget, {
        position: "top-right",
        index: 1
    });

    search.on("search-complete", function (res) {
        setTimeout(function () {
            console.log("OK")
            map.ObjMapView.goTo({
                target: [res.results[0].results[0].extent.center.longitude, res.results[0].results[0].extent.center.latitude],
                zoom: 17
            });
        }, 500)
    })

    searchWidget.on("search-complete", function (res) {
        setTimeout(function () {
            console.log("OK")
            map.ObjMapView.goTo({
                target: [res.results[0].results[0].extent.center.longitude, res.results[0].results[0].extent.center.latitude],
                zoom: 17
            });
        }, 500)
    })
}