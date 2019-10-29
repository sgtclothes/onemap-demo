var mapViewWhenReady = function (map, config) {
    // Create a site
    map.ObjMapView.when(function () {
        let createSiteDiv = document.getElementById("create-site-div");
        createSiteDiv.style.display = "inline-block";

        let createSiteExpand = new ESRI.Expand({
            expandIconClass: "esri-icon-organization",
            view: map.ObjMapView,
            content: createSiteDiv,
            expanded: false,
            collapseIconClass: "esri-icon-close"
        });

        createSite(createSiteExpand, GIS, map);
        map.ObjMapView.ui.add(createSiteExpand, config.Position[6]);

        //Zoom to Jakarta
        map.ObjMapView.goTo({
            target: [106.8306808, -6.1994095],
            zoom: 13
        });

    });
}