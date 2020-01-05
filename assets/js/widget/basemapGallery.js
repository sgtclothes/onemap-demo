function addNewBasemaps() {
    //CORS Enabling for google basemaps
    EsriConfig.request.corsEnabledServers
        .push("mts0.google.com", "mts1.google.com", "mts2.google.com",
            "mts3.google.com");

    //Create empty array for collecting custom basemaps
    var basemaps = []

    var googleHybrid = new ESRI.Basemap({
        baseLayers: [
            new ESRI.WebTileLayer({
                urlTemplate: "https://mts{subDomain}.google.com/vt/lyrs=y@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                subDomains: ["0", "1", "2", "3"],
                copyright: "Google Maps"
            })
        ],
        title: "Google Hybrid",
        id: "googlehybrid",
        thumbnailUrl:
            "https://www.arcgis.com/sharing/rest/content/items/073fc1ccaa0948cdbffed26d3701f5be/info/thumbnail/Google_Map_Hybrid.png"
    });

    var googleSatellite = new ESRI.Basemap({
        baseLayers: [
            new ESRI.WebTileLayer({
                urlTemplate: "https://mts{subDomain}.google.com/vt/lyrs=s@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                subDomains: ["0", "1", "2", "3"],
                copyright: "Google Maps"
            })
        ],
        title: "Google Satellite",
        id: "googlesatellite",
        thumbnailUrl:
            "https://www.abc.net.au/news/image/10830256-3x2-700x467.jpg"
    });

    var googleStreetView = new ESRI.Basemap({
        baseLayers: [
            new ESRI.WebTileLayer({
                urlTemplate: "https://mts{subDomain}.google.com/vt/lyrs=m@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                subDomains: ["0", "1", "2", "3"],
                copyright: "Google Maps"
            })
        ],
        title: "Google Street",
        id: "googlestreet",
        thumbnailUrl:
            "https://parking.duke.edu/sites/default/files/styles/large/public/duke-interactive-map.png?itok=fHGl1DOF"
    });

    var googleTerrain = new ESRI.Basemap({
        baseLayers: [
            new ESRI.WebTileLayer({
                urlTemplate: "https://mts{subDomain}.google.com/vt/lyrs=r@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                subDomains: ["0", "1", "2", "3"],
                copyright: "Google Maps"
            })
        ],
        title: "Google Terrain",
        id: "googleterrain",
        thumbnailUrl:
            "https://www.blogcdn.com/www.engadget.com/media/2012/10/google-maps-terrain-calgary.jpg"
    });

    var googleTraffic = new ESRI.Basemap({
        baseLayers: [
            new ESRI.WebTileLayer({
                urlTemplate: "https://mt{subDomain}.google.com/vt/lyrs=r@1000000,traffic&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                subDomains: ["0", "1", "2", "3"],
                copyright: "Google Maps"
            })
        ],
        title: "Google Traffic",
        id: "googletraffic",
        thumbnailUrl:
            "http://www.zehraoney.com/wp-content/uploads/2015/11/google-maps.jpg"
    });

    var googleTransit = new ESRI.Basemap({
        baseLayers: [
            new ESRI.WebTileLayer({
                urlTemplate: "https://mt{subDomain}.google.com/vt/lyrs=r@1000000,transit&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                subDomains: ["0", "1", "2", "3"],
                copyright: "Google Maps"
            })
        ],
        title: "Google Transit",
        id: "googletransit",
        thumbnailUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqCar2msY8b_GhiX2tOhpu0tNjSK8WCIo_rKL6Z9ir64Ero7bO&s"
    });

    //Push custom basemaps to variable basemaps
    basemaps.push(googleHybrid, googleSatellite, googleStreetView, googleTerrain, googleTraffic, googleTransit)
    //Return
    return basemaps
}

function addBasemapGallery() {

    //Add new object basemapGallery
    var basemapGallery = new ESRI.BasemapGallery({
        view: mapView,
        source: {
            portal: {
                url: "https://www.arcgis.com",
                useVectorBasemaps: true
            }
        }
    })

    //Get new custom basemaps
    var basemaps = addNewBasemaps()

    //Push each basemaps to the basemapGallery sources
    for (let i = 0; i < basemaps.length; i++) {
        basemapGallery.source.basemaps.items.push(basemaps[i])
    }

    //Insert basemapGallery to expand div
    var basemapGalleryExpand = new ESRI.Expand({
        view: mapView,
        content: basemapGallery,
        collapseIconClass: "esri-icon-close"
    });

    //Set starting basemap to mapView
    map.basemap = basemaps[0]

    //Add basemapGallery with its expand div
    mapView.ui.add(basemapGalleryExpand, "top-left")
}