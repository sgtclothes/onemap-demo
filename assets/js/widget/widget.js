var widgetCollection = function (map) {

    var markerSymbol = {
        type: "picture-marker",
        url: "assets/images/icons/map-marker.png",
        width: "24px",
        height: "24px"
    };

    var sources = [
        {
            layer: new ESRI.FeatureLayer({
                url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/0",
                outFields: ["*"]
            }),
            searchFields: ["DESA"],
            displayField: "DESA",
            exactMatch: false,
            outFields: ["*"],
            name: "DESA INDONESIA",
            placeholder: "Search Desa",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        },
        {
            layer: new ESRI.FeatureLayer({
                url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/1",
                outFields: ["*"]
            }),
            searchFields: ["KECAMATAN"],
            displayField: "KECAMATAN",
            exactMatch: false,
            outFields: ["*"],
            name: "KECAMATAN INDONESIA",
            placeholder: "Search Kecamatan",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        },
        {
            layer: new ESRI.FeatureLayer({
                url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/2",
                outFields: ["*"]
            }),
            searchFields: ["KABUPATEN"],
            displayField: "KABUPATEN",
            exactMatch: false,
            outFields: ["*"],
            name: "KABUPATEN INDONESIA",
            placeholder: "Search Kabupaten",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        },
        {
            layer: new ESRI.FeatureLayer({
                url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/3",
                outFields: ["*"]
            }),
            searchFields: ["PROVINSI"],
            displayField: "PROVINSI",
            exactMatch: false,
            outFields: ["*"],
            name: "PROVINSI INDONESIA",
            placeholder: "Search Provinsi",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        }
    ];

    var search = new ESRI.Search( //Add search widget in sidenav layers
        {
            view: map.ObjMapView,
            sources: sources
        },
        "search-widget-property"
    );

    var searchWidget = new ESRI.Search({
        view: map.ObjMapView,
        sources: sources
    });

    map.ObjMapView.ui.add(searchWidget, {
        position: "top-right",
        index: 1
    });

    search.on("search-start", function () {
        loading("show")
    })

    searchWidget.on("search-start", function () {
        loading("show")
    })

    search.on("search-complete", async function (res) {
        searchConfig(map, res, markerSymbol)
    })

    searchWidget.on("search-complete", async function (res) {
        searchConfig(map, res, markerSymbol)
    })
}

var searchConfig = async function (map, res, markerSymbol) {
    var geometry = res.results[0].results[0].feature.geometry
    actionElement(".esri-popup", "hide")
    await setTimeout(async function () {
        resetSelectedGraphics(groupLayers)
        var type = res.results[0].results[0].feature.geometry.type
        var longitude = 0
        var latitude = 0
        if (type == "point") {
            longitude = res.results[0].results[0].feature.geometry.longitude
            latitude = res.results[0].results[0].feature.geometry.latitude
            setPointing(map, [longitude, latitude])
            res.target.resultGraphic.symbol = markerSymbol
        } else if (type == "polygon") {
            var cPoint = new ESRI.Point()
            cPoint.x = res.results[0].results[0].feature.geometry.centroid.x
            cPoint.y = res.results[0].results[0].feature.geometry.centroid.y
            await getProjectionGeometryPoint(cPoint, "3857", "4326").then(function (results) {
                longitude = results[0].x
                latitude = results[0].y
            })
            await createPolygon(geometry).then(function () {
                sortID(map, "polygons", "dynamic-polygon-")
                registerAttributes(map, "polygons", "polygon-graphics", 0)
            })
        }
        map.ObjMapView.goTo({
            target: [res.results[0].results[0].extent.center.longitude, res.results[0].results[0].extent.center.latitude],
            zoom: 13
        });
        await loading("hide")
        await res.target.clear()
    }, 500)
}