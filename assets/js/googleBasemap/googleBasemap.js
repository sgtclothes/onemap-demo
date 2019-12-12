var addGoogleBasemap = function () {
    var webTileLayer = new ESRI.WebTileLayer({
        urlTemplate: "https://mts{subDomain}.google.com/vt/lyrs=y@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
        subDomains: ["0", "1", "2", "3"],
        copyright: "Google Maps"
    });

    var 
}