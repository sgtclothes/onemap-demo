var createDynamicPolygon = function (map, sketch, enableMeasureLength) {
    sketch.on("create", function (event) {
        if (event.state === "complete") {
            event.graphic.attributes = "polygon-graphics"
            let index = map.ObjMap.findLayerById("polygons").layers.items.length
            sketch.complete()
            console.log(index)

            // let index = getLocalStorage("layerCounterPolygons", 0)
            // setLocalStorage("layerCounterPolygons", Number(index) + 1) //Increase layerCounterPolygon counter

            // // //---Make graphicsLayer for next polygons---//
            // // var layerCounterPolygons = getLocalStorage("layerCounterPolygons", 0)
            // // var nextIndex = Number(layerCounterPolygons)
            // // var graphicsLayer = new ESRI.GraphicsLayer({ //Create first graphicsLayer
            // //     id: "dynamic-polygon-" + nextIndex
            // // })
            // // groupLayerPolygons.add(graphicsLayer)
            // // sketch.layer = map.ObjMap.findLayerById("dynamic-polygon-" + nextIndex) //Set layer sketch for next graphicsLayer
            // // //--- End of Make graphicsLayer for next polygons---//
            // // sort(map, "polygons", "dynamic-polygon-")
            // // console.log(map.ObjMap)
        }
    })

    // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //   var R = 6371; // Radius of the earth in km
    //   var dLat = deg2rad(lat2 - lat1); // deg2rad below
    //   var dLon = deg2rad(lon2 - lon1);
    //   var a =
    //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //     Math.cos(deg2rad(lat1)) *
    //     Math.cos(deg2rad(lat2)) *
    //     Math.sin(dLon / 2) *
    //     Math.sin(dLon / 2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   var d = R * c; // Distance in km
    //   return d;
    // }

    // function deg2rad(deg) {
    //   return deg * (Math.PI / 180);
    // }

    // function createListPOI() {
    //   let div = document.createElement("div");
    //   div.style.width = "auto";
    //   div.style.height = "auto";
    //   div.style.backgroundColor = "white";
    //   div.style.padding = "10px";
    //   let text = document.createElement("div");
    //   text.innerHTML = "List of POI";
    //   text.style.textAlign = "center";
    //   div.appendChild(text);
    //   let subPOI = $(".checkbox-sub-poi");
    //   let labels = [];
    //   let values = [];
    //   let secondValues = [];
    //   for (let i = 0; i < subPOI.length; i++) {
    //     labels.push(
    //       $(subPOI[i])
    //         .siblings("label")
    //         .text()
    //     );
    //     values.push($(subPOI[i]).val());
    //     secondValues.push($(subPOI[i]).attr("secondValue"));
    //   }
    //   $(div).append(
    //     '<div class="property-status-items checkbox checkbox-circle checkbox-info">' +
    //     '<input class="checkbox-sub-poi-query styled" type="checkbox" id="tall-1-1-colliers">' +
    //     '<label for="tall-1-1-colliers"><span></span>' +
    //     " Colliers Property" +
    //     "</label></div>"
    //   );
    //   for (let i = 0; i < subPOI.length; i++) {
    //     $(div).append(
    //       '<div class="property-status-items checkbox checkbox-circle checkbox-info">' +
    //       '<input class="checkbox-sub-poi-query styled" type="checkbox" id="tall-' +
    //       values[i] +
    //       '" value="' +
    //       values[i] +
    //       '"' +
    //       ' secondValue="' +
    //       secondValues[i] +
    //       '"' +
    //       ">" +
    //       '<label for="tall-' +
    //       values[i] +
    //       '"><span></span>' +
    //       labels[i] +
    //       "</label></div>"
    //     );
    //   }
    //   map.ObjMapView.ui.add(div, "bottom-left");
    // }

    // sketch.on("create", function (event) {
    //   if (event.state == "complete") {
    //     let rings = event.graphic.geometry.rings[0]
    //     let ringsLatLon = []
    //     for (let i = 0; i < rings.length; i++) {
    //       let point = new ESRI.Point({
    //         x: rings[i][0],
    //         y: rings[i][1]
    //       })

    //       console.log(point)
    //       // let latitude = map.ObjMapView.toMap({
    //       //   x: rings[i][0],
    //       //   y: rings[i][1]
    //       // }).latitude.toFixed(7);

    //       // let longitude = map.ObjMapView.toMap({
    //       //   x: rings[i][0],
    //       //   y: rings[i][1]
    //       // }).longitude.toFixed(7);

    //       // ringsLatLon.push([Number(longitude), Number(latitude)])
    //     }
    //     console.log(JSON.stringify(rings))
    //     console.log(JSON.stringify(ringsLatLon))
    //   }
    //   $("#loading-bar").show();
    //   //Store point to localstorage
    //   if (event.state === "start") {
    //     map.ObjMapView.on("click", function (evt) {
    //       let latitude = map.ObjMapView.toMap({
    //         x: evt.x,
    //         y: evt.y
    //       }).latitude.toFixed(7);

    //       let longitude = map.ObjMapView.toMap({
    //         x: evt.x,
    //         y: evt.y
    //       }).longitude.toFixed(7);

    //       localStorage.setItem(
    //         "calculateLength",
    //         JSON.stringify([latitude, longitude])
    //       );
    //       console.log(JSON.parse(localStorage.getItem("calculateLength")));
    //       $("#loading-bar").hide();
    //     });
    //   } else if (event.state === "active") {
    //     $("#loading-bar").hide();
    //     let lat1 = JSON.parse(localStorage.getItem("calculateLength"))[0];
    //     let lon1 = JSON.parse(localStorage.getItem("calculateLength"))[1];
    //     map.ObjMapView.on("pointer-move", function (evt) {
    //       let lat2 = map.ObjMapView.toMap({
    //         x: evt.x,
    //         y: evt.y
    //       }).latitude.toFixed(7);
    //       let lon2 = map.ObjMapView.toMap({
    //         x: evt.x,
    //         y: evt.y
    //       }).longitude.toFixed(7);
    //       // console.log(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2));
    //     });
    //   } else if (event.state === "complete") {
    //     createListPOI();
    //     let colliersProperty = new ESRI.FeatureLayer({
    //       url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0"
    //     });
    //     console.log(event.graphic.geometry);
    //     let query = new ESRI.Query();
    //     query.returnGeometry = true;
    //     query.outFields = ["*"];
    //     query.outSpatialReference = map.ObjMap.spatialReference;
    //     query.geometry = event.graphic.geometry;

    //     let queryShape = new GIS.Buffer.QueryShape(
    //       map.ObjMap,
    //       map.ObjMapView,
    //       event.graphic.geometry
    //     );

    //     queryShape.create();

    //     colliersProperty.queryFeatures(query).then(function (results) {
    //       if (results.features.length < 1) {
    //         $("#loading-bar").hide();
    //       }
    //       displayResults(results);
    //     });

    //     function displayResults(results) {
    //       let chunkedResults = results.features;
    //       var lyrFields;
    //       var layersRequest = {
    //         query: {
    //           f: "json"
    //         },
    //         responseType: "json"
    //       };

    //       EsriRequest(
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0",
    //         layersRequest
    //       ).then(function (response) {
    //         console.log("response", response);
    //         lyrFields = response.data.fields;
    //       });

    //       function getFldAlias(fieldName) {
    //         var retVal = "";
    //         arrayUtils.forEach(lyrFields, function (item) {
    //           if (item.name === fieldName) {
    //             retVal = item.alias;
    //             return true;
    //           }
    //         });
    //         return retVal;
    //       }

    //       let attributes = [];
    //       let geometry = [];
    //       let alias = {};

    //       for (let i in chunkedResults) {
    //         attributes.push(chunkedResults[i].attributes);
    //         geometry.push(chunkedResults[i].geometry);
    //       }

    //       for (let j in chunkedResults[0].attributes) {
    //         alias[j] = getFldAlias(j);
    //       }

    //       console.log(attributes);

    //       convertCSV.processCSVData(
    //         convertData.getRowofTextArray(attributes),
    //         "custom",
    //         geometry,
    //         alias,
    //         true
    //       );
    //       $("#loading-bar").hide();
    //     }

    //     let rings = JSON.stringify(event.graphic.geometry.rings[0]);
    //     var area, length;

    //     EsriRequest(
    //       "https://gis.locatorlogic.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/areasAndLengths?sr=102009&polygons=[%7B%22rings%22:[" +
    //       rings +
    //       "]%7D]&lengthUnit=9001&areaUnit=%7B%22areaUnit%22:%22esriAcres%22%7D&calculationType=preserveShape&f=json"
    //     ).then(function (response) {
    //       console.log("response", response);
    //       area = response.data.areas;
    //       length = response.data.lengths;
    //       area = (area[0] * 4046.8564224) / 1000;
    //       length = length[0] / 1000;
    //       console.log(area + " km" + "2".sup());
    //       console.log(length + " km");
    //       let div = document.createElement("div");
    //       div.style.fontSize = "10px";
    //       let table = document.createElement("table");
    //       table.style.width = "100%";
    //       table.style.margin = "10px";
    //       let trArea = document.createElement("tr");
    //       let trLength = document.createElement("tr");
    //       let tdAreaTitle = document.createElement("td");
    //       tdAreaTitle.style.textAlign = "left";
    //       let tdAreaResults = document.createElement("td");
    //       tdAreaResults.style.textAlign = "left";
    //       let tdLengthTitle = document.createElement("td");
    //       tdLengthTitle.style.textAlign = "left";
    //       let tdLengthResults = document.createElement("td");
    //       tdLengthResults.style.textAlign = "left";
    //       div.style.width = "auto";
    //       div.style.height = "auto";
    //       div.style.textAlign = "center";
    //       div.style.backgroundColor = "white";
    //       div.innerHTML = "<b>Measurement</b>";
    //       tdAreaTitle.innerHTML = "<b>Area</b>";
    //       tdAreaResults.innerHTML =
    //         area.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
    //         " km" +
    //         "2".sup();
    //       tdLengthTitle.innerHTML = "<b>Length<b/>";
    //       tdLengthResults.innerHTML =
    //         length.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " km";
    //       trArea.appendChild(tdAreaTitle);
    //       trArea.appendChild(tdAreaResults);
    //       trLength.appendChild(tdLengthTitle);
    //       trLength.appendChild(tdLengthResults);
    //       table.appendChild(trArea);
    //       table.appendChild(trLength);
    //       div.appendChild(table);
    //       map.ObjMapView.ui.add(div, "bottom-right");
    //     });
    //   }
    // });

    // $("#button-analysis").append(sketch);

    // sketch.on("update", onGraphicUpdate);
    // function onGraphicUpdate(event) {
    //   if (event.state === "complete") {
    //     map.ObjMapView.graphics.removeAll();
    //     for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
    //       if ("customShape" in map.ObjMap.layers.items[i]) {
    //         map.ObjMap.layers.items[i].visible = false;
    //         map.ObjMap.layers.items.splice(i, 1);
    //       }
    //     }
    //     console.log(event.graphics);
    //     console.log(event.graphics[0].geometry);
    //     $("#loading-bar").show();
    //     $(".popupFilter").hide();
    //     let colliersProperty = new ESRI.FeatureLayer({
    //       url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0"
    //     });
    //     let query = new ESRI.Query();
    //     query.returnGeometry = true;
    //     query.outFields = ["*"];
    //     query.outSpatialReference = map.ObjMap.spatialReference;
    //     query.geometry = event.graphics[0].geometry;

    //     let queryShape = new GIS.Buffer.QueryShape(
    //       map.ObjMap,
    //       map.ObjMapView,
    //       event.graphics[0].geometry
    //     );

    //     queryShape.create();

    //     colliersProperty.queryFeatures(query).then(function (results) {
    //       if (results.features.length < 1) {
    //         $("#loading-bar").hide();
    //       }
    //       displayResults(results);
    //     });

    //     function displayResults(results) {
    //       let chunkedResults = results.features;
    //       var lyrFields;
    //       var layersRequest = {
    //         query: {
    //           f: "json"
    //         },
    //         responseType: "json"
    //       };

    //       EsriRequest(
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0",
    //         layersRequest
    //       ).then(function (response) {
    //         console.log("response", response);
    //         lyrFields = response.data.fields;
    //       });

    //       function getFldAlias(fieldName) {
    //         var retVal = "";
    //         arrayUtils.forEach(lyrFields, function (item) {
    //           if (item.name === fieldName) {
    //             retVal = item.alias;
    //             return true;
    //           }
    //         });
    //         return retVal;
    //       }

    //       let attributes = [];
    //       let geometry = [];
    //       let alias = {};

    //       for (let i in chunkedResults) {
    //         attributes.push(chunkedResults[i].attributes);
    //         geometry.push(chunkedResults[i].geometry);
    //       }

    //       for (let j in chunkedResults[0].attributes) {
    //         alias[j] = getFldAlias(j);
    //       }

    //       console.log(attributes);

    //       convertCSV.processCSVData(
    //         convertData.getRowofTextArray(attributes),
    //         "custom",
    //         geometry,
    //         alias,
    //         true
    //       );
    //       $("#loading-bar").hide();
    //     }
    //   }
    // }
}

var sort = function (map, layer, id) {
    let l = map.ObjMap.findLayerById(layer)
    for (let i = 0; i < l.layers.items.length; i++) {
        l.layers.items[i].id = id + (i + 1)
    }
}

var removeEmptyLayer = function (map, layer) {
    let l = map.ObjMap.findLayerById(layer)
    for (let i = 0; i < l.layers.items.length; i++) {
        if (l.layers.items[i].graphics.items.length < 1) {
            l.layers.items.splice(i, 1)
        }
    }
}