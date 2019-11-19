var getGraphicsInfo = async function (response, map) {
    if (response.results.length > 0) {
        var res = []
        let val = response.results[0].graphic.layer.id.split("-")
        if ((val[0] == "dynamic" && (val[1] == "buffer" || val[1] == "polygon")) || (val[0] == "drive" && (val[1] == "time" || val[1] == "distance")) || (val[0] == "rectangle")) {
            actionElement(".esri-popup", "hide")
            selectMe(0, response)
        } else if (val[0] == "colliers" && val[1] == "property") {
            actionElement(".esri-popup", "hide")
            setLocalStorage(
                "selectedFeatureFilterLatitude",
                JSON.stringify(response.results[0].graphic.geometry.latitude)
            );
            setLocalStorage(
                "selectedFeatureFilterLongitude",
                JSON.stringify(response.results[0].graphic.geometry.longitude)
            );

            loading("show")
            $("#popupFilter").remove()
            window.currentPagePopup = 1

            await setTimeout(async function () {
                res = await getPopupColliersFeatures(map, res)
                await $.get("assets/js/data/popup/popupFilter.html", function (data) {
                    $(".page-content").append(data);
                });
                await paginationColliersPopup(map, res)
            }, 1000)
        } else if (val[0] == "external" && val[1] == "data") {
            actionElement("#loading-bar", "show")
            await setTimeout(async function () {
                res = await getExternalDataGraphics(map, res)
                map.ObjMapView.popup.features = res
                await setTimeout(async function () {
                    actionElement("#loading-bar", "hide")
                    await actionElement(".esri-popup", "show")
                }, 1000)
            }, 1000)
        } else {
            actionElement(".esri-popup", "hide")
        }
        // else {
        //     //Highlight pointing
        //     let lat = response.results[0].graphic.geometry.latitude;
        //     let lon = response.results[0].graphic.geometry.longitude;
        //     let posLat = lat + 0.04;
        //     let posLon = lon;
        //     for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {

        //         if (map.ObjMapView.graphics.items[i].attributes.hasOwnProperty("id")) {
        //             if (
        //                 map.ObjMapView.graphics.items[i].attributes.id ==
        //                 localStorage.getItem("pointingHighlight")
        //             ) {
        //                 map.ObjMapView.graphics.items[i].visible = false;
        //                 map.ObjMapView.graphics.items.splice(i, 1);
        //             }
        //         }
        //     }

        //     if (response.results[0].graphic.symbol === null) {
        //         localStorage.setItem(
        //             "pointingHighlight",
        //             lat.toString() + lon.toString()
        //         );
        //         let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
        //         pointing.setPointingPopupMarker();
        //         if (attr.includes("propertytype")) {
        //             pointing.positionFixing(posLat, posLon);
        //         }
        //         pointing.render();
        //     } else if (
        //         response.results[0].graphic.symbol.url !==
        //         "assets/images/icons/map-marker.png"
        //     ) {
        //         localStorage.setItem(
        //             "pointingHighlight",
        //             lat.toString() + lon.toString()
        //         );
        //         let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
        //         pointing.setPointingPopupMarker();
        //         if (attr.includes("propertytype") || attr.includes("property_type") || attr.includes("property_t")) {
        //             pointing.positionFixing(posLat, posLon);
        //         } else {

        //         }
        //         pointing.render();
        //     }
        //     //End of Highlight pointing
        // }
    } else {
        resetSelectedGraphics(groupLayers)
        // Get longitude and latitude
        let longitude = convertScreenPoint(response, map)[0]
        let latitude = convertScreenPoint(response, map)[1]

        console.log("Longitude : " + longitude + ", Latitude : " + latitude)

        let point = new ESRI.Point();
        point.longitude = longitude;
        point.latitude = latitude;

        //Save to LocalStorage
        localStorage.setItem("livePointingLatitude", latitude);
        localStorage.setItem("livePointingLongitude", longitude);
        localStorage.setItem("livePointingX", map.ObjMapView.toScreen(point).x);
        localStorage.setItem("livePointingY", map.ObjMapView.toScreen(point).y);

        let layer = getLayerById(map, "pointer")
        map.ObjMap.remove(layer)

        //Set live pointing when clicked
        let pointing = new GIS.Action.LivePointing(
            map.ObjMap,
            map.ObjMapView,
            latitude,
            longitude
        );

        pointing.setPictureMarker();
        pointing.render();

        //Hide popup
        $(".popupFilter").hide();

        //Reset pointing localstorage
        setLocalStorage("pointingHighlight", null);
    }
}

var getPopupColliersFeatures = function (map, res) {
    for (let i = 0; i < map.ObjMapView.popup.features.length; i++) {
        if (map.ObjMapView.popup.features[i].selector == "colliers-property-attr") {
            res.push(map.ObjMapView.popup.features[i])
        }
    }
    return res
}

var getExternalDataGraphics = function (map, res) {
    for (let i = 0; i < map.ObjMapView.popup.features.length; i++) {
        if (map.ObjMapView.popup.features[i].selector == "external-data-graphics") {
            res.push(map.ObjMapView.popup.features[i])
        }
    }
    return res
}