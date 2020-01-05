function addSearch() {

    var search = new ESRI.Search({
        view: mapView,
        sources: addSearchSource(),
        popupEnabled: false
    })

    var searchColliers = new ESRI.Search({
        view: mapView,
        sources: addSearchSource(),
        popupEnabled: false
    },
        "search-widget-property"
    );

    mapView.ui.add(search, "top-right")

    search.on("search-complete", function (res) {
        if (res.results[0].results[0].feature.geometry.type == "point") {
            var point = []
            point["latitude"] = res.results[0].results[0].feature.geometry.latitude
            point["longitude"] = res.results[0].results[0].feature.geometry.longitude
            setPointing(point)
            setTimeout(() => {
                search.clear()
                mapView.goTo({
                    target: [point["longitude"], point["latitude"]]
                })
            }, 100);
        } else if (res.results[0].results[0].feature.geometry.type == "polygon") {
            var polygons = getLayerViewByGraphicsTypeAndName("polygon", res.searchTerm)
            createPolygon(res.results[0].results[0].feature.geometry, "search", res.searchTerm, "search")
            createLabel(res.results[0].results[0].feature.geometry, "label", res.searchTerm, res.searchTerm, "search")
            setTimeout(() => {
                search.clear()
                mapView.goTo({
                    target: [res.results[0].results[0].feature.geometry.centroid.longitude, res.results[0].results[0].feature.geometry.centroid.latitude]
                })
                appendDataLayerGraphics()
            }, 100);
        }
    })

    search.on("search-focus", function () {
        graphicsListExpand.collapse()
    })

}

var addSearchSource = function () {
    var sources = [
        {
            layer: new ESRI.FeatureLayer({
                url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/3",
                outFields: ["*"]
            }),
            searchFields: ["PROVINSI"],
            displayField: "PROVINSI",
            exactMatch: false,
            outFields: ["*"],
            name: "PROVINSI(Province) by Area",
            placeholder: "Search Provinsi",
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
            searchFields: ["KABKOT", "PROVINSI"],
            displayField: "KABKOT",
            exactMatch: false,
            outFields: ["*"],
            name: "KABUPATEN(Region) by Area",
            placeholder: "Search Kabupaten",
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
            searchFields: ["KECAMATAN", "KAB_KOT", "PROVINSI"],
            displayField: "KECAMATAN",
            exactMatch: false,
            outFields: ["*"],
            name: "KECAMATAN(District) by Area",
            placeholder: "Search Kecamatan",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        },
        {
            layer: new ESRI.FeatureLayer({
                url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/0",
                outFields: ["*"]
            }),
            searchFields: ["DESA", "KABKOT", "PROVINSI", "KECAMATAN"],
            displayField: "DESA",
            exactMatch: false,
            outFields: ["*"],
            name: "DESA(Village) by Area",
            placeholder: "Search Desa",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        },
    ];

    return sources
}

// var widgetCollection = function (map) {
//     //Marker symbol for point search result
//     var markerSymbol = {
//         type: "picture-marker",
//         url: "assets/images/icons/map-marker.png",
//         width: "24px",
//         height: "24px"
//     };

//     //Punctuations for punctuationFixer
//     var punctuations = [/\s/g, "&", "'", ".", "/"]

//     //Sources for determining search results
//     var sources = [
//         {
//             layer: new ESRI.FeatureLayer({
//                 url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/3",
//                 outFields: ["*"]
//             }),
//             searchFields: ["PROVINSI"],
//             displayField: "PROVINSI",
//             exactMatch: false,
//             outFields: ["*"],
//             name: "PROVINSI(Province) by Area",
//             placeholder: "Search Provinsi",
//             maxResults: 6,
//             maxSuggestions: 6,
//             suggestionsEnabled: true,
//             minSuggestCharacters: 0
//         },
//         {
//             layer: new ESRI.FeatureLayer({
//                 url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/2",
//                 outFields: ["*"]
//             }),
//             searchFields: ["KABKOT", "PROVINSI"],
//             displayField: "KABKOT",
//             exactMatch: false,
//             outFields: ["*"],
//             name: "KABUPATEN(Region) by Area",
//             placeholder: "Search Kabupaten",
//             maxResults: 6,
//             maxSuggestions: 6,
//             suggestionsEnabled: true,
//             minSuggestCharacters: 0
//         },
//         {
//             layer: new ESRI.FeatureLayer({
//                 url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/1",
//                 outFields: ["*"]
//             }),
//             searchFields: ["KECAMATAN", "KAB_KOT", "PROVINSI"],
//             displayField: "KECAMATAN",
//             exactMatch: false,
//             outFields: ["*"],
//             name: "KECAMATAN(District) by Area",
//             placeholder: "Search Kecamatan",
//             maxResults: 6,
//             maxSuggestions: 6,
//             suggestionsEnabled: true,
//             minSuggestCharacters: 0
//         },
//         {
//             layer: new ESRI.FeatureLayer({
//                 url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/0",
//                 outFields: ["*"]
//             }),
//             searchFields: ["DESA", "KABKOT", "PROVINSI", "KECAMATAN"],
//             displayField: "DESA",
//             exactMatch: false,
//             outFields: ["*"],
//             name: "DESA(Village) by Area",
//             placeholder: "Search Desa",
//             maxResults: 6,
//             maxSuggestions: 6,
//             suggestionsEnabled: true,
//             minSuggestCharacters: 0
//         },
//     ];

//     //This is search widget in filter viewer
//     var search = new ESRI.Search({
//         view: map.ObjMapView,
//         sources: sources,
//         popupEnabled: false
//     },
//         "search-widget-property"
//     );

//     //This is search widget in the map view
//     var searchWidget = new ESRI.Search({
//         view: map.ObjMapView,
//         sources: sources,
//         popupEnabled: false,
//     });

//     //Adding search widget to map view
//     map.ObjMapView.ui.add(searchWidget, {
//         position: "top-right",
//         index: 1
//     });

//     search.on("search-focus", function () {
//         search.allSources.items[0].name = "WORLD by Point"
//     })

//     searchWidget.on("search-focus", function () {
//         searchWidget.allSources.items[0].name = "WORLD by Point"
//     })

//     search.on("search-start", function (event) {
//         loading("show")
//         console.log(event)
//     })

//     searchWidget.on("search-start", function () {
//         loading("show")
//         console.log(event)
//     })

//     search.on("search-complete", async function (res) {
//         search.activeSourceIndex = -1
//         searchConfig(map, res, markerSymbol)
//     })

//     searchWidget.on("search-complete", async function (res) {
//         search.activeSourceIndex = -1
//         searchConfig(map, res, markerSymbol)
//         // var symbol = {
//         //     color: [255, 0, 0, 0.3],
//         //     style: "solid",
//         //     type: "simple-fill",
//         //     outline: {
//         //         type: "simple-line",
//         //         style: "solid",
//         //         width: 1,
//         //         color: "white"
//         //     }
//         // }
//         // setTimeout(function () {
//         //     res.target.resultGraphic.symbol = symbol
//         //     searchGraphics = res.target.resultGraphic
//         //     console.log(map.ObjMapView)
//         // }, 1000)
//     })

//     // map.ObjMapView.on("click", function (event) {
//     //     map.ObjMapView.hitTest(event).then(function (response) {
//     //         for (let i = 0; i < response.results.length; i++) {
//     //             if (response.results[i].graphic.selector == "search-point-graphics") {
//     //                 var layer = getLayerById(map, "polygons")
//     //                 if (response.results[i].graphic.layer.id.split("-")[2] == "PROVINSI") {
//     //                     search.activeSourceIndex = 3
//     //                 } else if (response.results[i].graphic.layer.id.split("-")[2] == "KABUPATEN") {
//     //                     search.activeSourceIndex = 2
//     //                 }
//     //                 for (let j = 0; j < layer.layers.items.length; j++) {
//     //                     if (response.results[i].graphic.attributes.label !== punctuationFixer(punctuations, "-", layer.layers.items[j].graphics.items[0].attributes.label)) {
//     //                         var splitter = response.results[i].graphic.attributes.label.split("-")
//     //                         var key = ""
//     //                         for (let k = 0; k < splitter.length; k++) {
//     //                             key += splitter[k]
//     //                             if (k + 1 !== undefined) {
//     //                                 key += " "
//     //                             }
//     //                         }
//     //                         search.search(key)
//     //                     } else {
//     //                         map.ObjMapView.goTo({
//     //                             target: [layer.layers.items[j].graphics.items[0].geometry.centroid.longitude, layer.layers.items[j].graphics.items[0].geometry.centroid.latitude]
//     //                         });
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //     })
//     // })
// }

// var searchConfig = async function (map, res, markerSymbol) {
//     console.log(res)
//     if (res.results[0].results.length < 1) {
//         await loading("hide")
//     } else {
//         var geometry = res.results[0].results[0].feature.geometry
//         var centroid = res.results[0].results[0].feature.geometry.centroid
//         var punctuations = [/\s/g, "&", "'", ".", "/"]
//         actionElement(".esri-popup", "hide")
//         await setTimeout(async function () {
//             resetSelectedGraphics(groupLayers)
//             var type = res.results[0].results[0].feature.geometry.type
//             var longitude = 0
//             var latitude = 0
//             if (type == "point") {
//                 longitude = res.results[0].results[0].feature.geometry.longitude
//                 latitude = res.results[0].results[0].feature.geometry.latitude
//                 setPointing(map, [longitude, latitude])
//                 res.target.resultGraphic.symbol = markerSymbol
//             } else if (type == "polygon") {
//                 var cPoint = new ESRI.Point()
//                 cPoint.x = res.results[0].results[0].feature.geometry.centroid.x
//                 cPoint.y = res.results[0].results[0].feature.geometry.centroid.y
//                 await getProjectionGeometryPoint(cPoint, "3857", "4326").then(function (results) {
//                     longitude = results[0].x
//                     latitude = results[0].y
//                 })
//                 await createPolygon(geometry, {
//                     label: res.searchTerm,
//                     field: res.results[0].source.displayField
//                 }).then(function () {
//                     sortID(map, "polygons", "dynamic-polygon-")
//                     registerAttributes(map, "polygons", "polygon-graphics", 0)
//                 })
//                 await renderSearchClassification(res.searchTerm, res.results[0].source.displayField, centroid).then(async function (results) {
//                     var cPoint4 = new ESRI.Point()
//                     cPoint4.x = results[0][2].x;
//                     cPoint4.y = results[0][2].y;

//                     var masterSymbol = {
//                         type: "simple-marker",
//                         style: "circle",
//                         color: "black",
//                         size: "6px"
//                     }

//                     for (let i = 0; i < results.length; i++) {
//                         var cPoint2 = new ESRI.Point()
//                         var cPoint3 = new ESRI.Point()
//                         cPoint2.x = results[i][4].longitude;
//                         cPoint2.y = results[i][4].latitude;

//                         var markerSymbol2 = {}

//                         if (results[i][0] == "KABUPATEN") {
//                             markerSymbol2 = {
//                                 type: "simple-marker",
//                                 style: "circle",
//                                 color: "red",
//                                 size: "6px"
//                             }
//                         } else if (results[i][0] == "KECAMATAN") {
//                             markerSymbol2 = {
//                                 type: "simple-marker",
//                                 style: "circle",
//                                 color: "blue",
//                                 size: "6px"
//                             }
//                         }

//                         await getProjectionGeometryPoint(cPoint2, "3857", "4326").then(function (res) {
//                             cPoint3.longitude = res[0]["x"]
//                             cPoint3.latitude = res[0]["y"]
//                         })

//                         var graphic = new ESRI.Graphic({
//                             attributes: {
//                                 label: punctuationFixer(punctuations, "-", results[i][3])
//                             },
//                             geometry: cPoint3,
//                             symbol: markerSymbol2,
//                             visible: false
//                         })

//                         var graphicsLayer = new ESRI.GraphicsLayer({
//                             id: "search-point-" + results[i][0] + "-" + punctuationFixer(punctuations, "-", results[i][3])
//                         })

//                         graphicsLayer.add(graphic)
//                         groupLayerPoints.add(graphicsLayer)

//                         await createLabelSearch(map, cPoint2, results[i][3], "label-search-" + results[i][0] + "-" + punctuationFixer(punctuations, "-", results[i][3]))
//                     }

//                     var level = undefined

//                     if (results[0][0] == "KABUPATEN") {
//                         level = "PROVINSI"
//                     } else if (results[0][0] == "KECAMATAN") {
//                         level = "KABUPATEN"
//                     }

//                     await createLabelSearch(map, cPoint4, results[0][1], "label-search-" + level + "-" + punctuationFixer(punctuations, "-", results[0][1]))

//                     var masterGraphic = new ESRI.Graphic({
//                         attributes: {
//                             label: punctuationFixer(punctuations, "-", results[0][1])
//                         },
//                         geometry: cPoint4,
//                         symbol: masterSymbol,
//                         visible: false
//                     })

//                     var graphicsLayer2 = new ESRI.GraphicsLayer({
//                         id: "search-point-" + level + "-" + punctuationFixer(punctuations, "-", results[0][1])
//                     })

//                     graphicsLayer2.add(masterGraphic)
//                     groupLayerPoints.add(graphicsLayer2)
//                     registerAttributes(map, "points", "search-point-graphics", 0)
//                     registerAttributes(map, "labels", "label-graphics", 0)
//                 })
//             }
//             map.ObjMapView.goTo({
//                 target: [res.results[0].results[0].extent.center.longitude, res.results[0].results[0].extent.center.latitude]
//             });

//             zoomSearchLevel = map.ObjMapView.zoom
//             await loading("hide")
//             await res.target.clear()
//         }, 400)
//     }
// }

// var renderSearchClassification = async function (name, classification, centroid) {
//     var res = []
//     if (classification == "PROVINSI") {
//         await makeEsriRequest("https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/2/query?where=" + classification + "= '" + name + "' &outFields=PROVINSI,KABKOT&returnGeometry=true&returnExtentsOnly=true&inSR=3857&outSR=3857").then(function (results) {
//             for (let i = 0; i < results.data.features.length; i++) {
//                 var KABKOT = results.data.features[i].attributes.KABKOT
//                 var polygon = new ESRI.Graphic({
//                     geometry: {
//                         type: "polygon",
//                         rings: results.data.features[i].geometry.rings
//                     }
//                 })
//                 res.push(["KABUPATEN", name, centroid, KABKOT, polygon.geometry.centroid])
//             }
//         })
//     } else if (classification == "KABKOT") {
//         classification = "KAB_KOT"
//         await makeEsriRequest("https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/1/query?where=" + classification + "= '" + name + "' &outFields=KECAMATAN,KAB_KOT,PROVINSI&returnGeometry=true&returnExtentsOnly=true&inSR=3857&outSR=3857").then(function (results) {
//             for (let i = 0; i < results.data.features.length; i++) {
//                 var KECAMATAN = results.data.features[i].attributes.KECAMATAN
//                 var polygon = new ESRI.Graphic({
//                     geometry: {
//                         type: "polygon",
//                         rings: results.data.features[i].geometry.rings
//                     }
//                 })
//                 res.push(["KECAMATAN", name, centroid, KECAMATAN, polygon.geometry.centroid])
//             }
//         })
//     } else if (classification == "KECAMATAN") {
//         await makeEsriRequest("https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/1/query?where=" + classification + "= '" + name + "' &outFields=KECAMATAN,KAB_KOT,PROVINSI,DESA&returnGeometry=true&returnExtentsOnly=true&inSR=3857&outSR=3857").then(function (results) {
//             for (let i = 0; i < results.data.features.length; i++) {
//                 var DESA = results.data.features[i].attributes.DESA
//                 var polygon = new ESRI.Graphic({
//                     geometry: {
//                         type: "polygon",
//                         rings: results.data.features[i].geometry.rings
//                     }
//                 })
//                 res.push(["DESA", name, centroid, DESA, polygon.geometry.centroid])
//             }
//         })
//     }
//     return res
// }