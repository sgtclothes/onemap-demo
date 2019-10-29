var getGraphicsInfo = function (response, map) {
    if (response.results.length > 0) {
        let val = response.results[0].graphic.layer.id.split("-")
        if ((val[0] == "dynamic" && (val[1] == "buffer" || val[1] == "polygon")) || (val[0] == "drive" && (val[1] == "time" || val[1] == "distance")) || (val[0] == "rectangle")) {
            selectMe(0, response)
        } else if (val[0] == "colliers" && val[1] == "property") {
            localStorage.setItem(
                "selectedFeatureFilterLatitude",
                JSON.stringify(response.results[0].graphic.geometry.latitude)
            );
            localStorage.setItem(
                "selectedFeatureFilterLongitude",
                JSON.stringify(response.results[0].graphic.geometry.longitude)
            );
            getColliersData(response)
        }
        else {
            //Highlight pointing
            let lat = response.results[0].graphic.geometry.latitude;
            let lon = response.results[0].graphic.geometry.longitude;
            let posLat = lat + 0.04;
            let posLon = lon;
            for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {

                if (map.ObjMapView.graphics.items[i].attributes.hasOwnProperty("id")) {
                    if (
                        map.ObjMapView.graphics.items[i].attributes.id ==
                        localStorage.getItem("pointingHighlight")
                    ) {
                        map.ObjMapView.graphics.items[i].visible = false;
                        map.ObjMapView.graphics.items.splice(i, 1);
                    }
                }
            }

            if (response.results[0].graphic.symbol === null) {
                localStorage.setItem(
                    "pointingHighlight",
                    lat.toString() + lon.toString()
                );
                let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
                pointing.setPointingPopupMarker();
                if (attr.includes("propertytype")) {
                    pointing.positionFixing(posLat, posLon);
                }
                pointing.render();
            } else if (
                response.results[0].graphic.symbol.url !==
                "assets/images/icons/map-marker.png"
            ) {
                localStorage.setItem(
                    "pointingHighlight",
                    lat.toString() + lon.toString()
                );
                let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
                pointing.setPointingPopupMarker();
                if (attr.includes("propertytype") || attr.includes("property_type") || attr.includes("property_t")) {
                    pointing.positionFixing(posLat, posLon);
                }
                pointing.render();
            }
            //End of Highlight pointing
        }
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

var getItemsGroupLayer = function (layer) {
    let results = []
    for (let i = 0; i < layer.layers.items.length; i++) {
        if (layer.layers.items[i].graphics.items.length > 0) {
            for (let j = 0; j < layer.layers.items[i].graphics.items.length; j++) {
                results.push(layer.layers.items[i].graphics.items[j])
            }
        }
    }
    return results
}

var getLayerById = function (map, id) {
    let layer = undefined
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == id) {
            layer = map.ObjMap.layers.items[i]
        }
    }
    return layer
}

var getNestedLayerById = function (map, id, nested_id) {
    let layer = undefined
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == id) {
            if (map.ObjMap.layers.items[i].layers.items.length > 0) {
                for (let j = 0; j < map.ObjMap.layers.items[i].layers.items.length; j++) {
                    if (map.ObjMap.layers.items[i].layers.items[j].id == nested_id) {
                        layer = map.ObjMap.layers.items[i].layers.items[j]
                    }
                }
            }
        }
    }
    return layer
}