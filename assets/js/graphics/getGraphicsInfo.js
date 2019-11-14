var getGraphicsInfo = async function (response, map) {
    if (response.results.length > 0) {
        let val = response.results[0].graphic.layer.id.split("-")
        if ((val[0] == "dynamic" && (val[1] == "buffer" || val[1] == "polygon")) || (val[0] == "drive" && (val[1] == "time" || val[1] == "distance")) || (val[0] == "rectangle")) {
            selectMe(0, response)
        } else if (val[0] == "colliers" && val[1] == "property") {
            var latitude = undefined
            var longitude = undefined
            var res = undefined
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
            toggleViewer("close")

            for (let i = 0; i < response.results.length; i++) {
                if (response.results[i].graphic.selector == "colliers-property-attr") {
                    longitude = response.results[i].graphic.geometry.longitude
                    latitude = response.results[i].graphic.geometry.latitude
                }
                let point = new ESRI.Point()
                point.longitude = longitude
                point.latitude = latitude

                var queryWhere = undefined
                if (propertyServiceStatusValue.length > 0) {
                    let a = "("
                    for (let i = 0; i < propertyServiceStatusValue.length; i++) {
                        a += propertyServiceStatusValue[i]
                        if (propertyServiceStatusValue[i + 1] !== undefined) {
                            a += " OR "
                        }
                    }
                    a += ")"
                    queryWhere = a
                } else {
                    queryWhere = ""
                }

                console.log(map.ObjMapView.popup)

                await processQuery(map, colliersPropertyStaging, queryWhere, ["*"], point, "esriGeometryPoint").then(function (results) {
                    res = results.features
                })
            }

            await $.get("assets/js/data/popup/popupFilter.html", function (data) {
                $(".page-content").append(data);
            });

            await paginationColliersPopup(map, res)
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

