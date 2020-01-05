var getGraphicsInfo = async function (response, map) {
    if (response.results.length > 0) {
        var res = []
        if ("id" in response.results[0].graphic.layer) {
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
        } else {
            console.log("Undefined")
        }
    } else {
        resetSelectedGraphics(groupLayers)
        let longitude = convertScreenPoint(response, map)[0]
        let latitude = convertScreenPoint(response, map)[1]

        console.log("Longitude : " + longitude + ", Latitude : " + latitude)

        setPointing(map, [longitude, latitude])
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

var combiningVDOData = function (res) {
    var id = []
    var duplicates = []
    for (let i = 0; i < res.length; i++) {
        id.push(res[i].attributes.id)
    }
    var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    var duplicatesId = findDuplicates(id)
    for (let i = 0; i < duplicatesId.length; i++) {
        for (let j = 0; j < res.length; j++) {
            if (res[j].attributes.id == duplicatesId[i] && (res[j].attributes.source == "vdo" || res[j].attributes.source == "vdo-ayda")) {
                duplicates.push(res[j])
            }
        }
    }

    for (let i = 0; i < duplicates.length; i++) {
        var unId = duplicates[i].attributes.id
        var cursor = 0
        for (let j = 0; j < duplicates.length; j++) {
            if (duplicates[j].attributes.id == unId) {
                cursor += 1
            }
        }
        if (cursor < 2) {
            duplicates.splice(i, 1)
        }
    }

    for (let i = 0; i < duplicates.length; i++) {
        var tempId = 0
        if (duplicates[i].attributes.property_type.toLowerCase() == "land" && (duplicates[i].attributes.source == "vdo" || duplicates[i].attributes.source == "vdo-ayda")) {
            tempId = duplicates[i].attributes.id
            for (let j = 0; j < duplicates.length; j++) {
                if (duplicates[j].attributes.id == tempId && duplicates[j].attributes.property_type.toLowerCase() !== "land" && (duplicates[j].attributes.source == "vdo" || duplicates[j].attributes.source == "vdo-ayda")) {
                    var ppssgai = duplicates[j].attributes.price_per_sqm_sganett_idr
                    var ppssgau = duplicates[j].attributes.price_per_sqm_sganett_usd
                    var total_idr_building = duplicates[j].attributes.total_idr
                    var total_usd_building = duplicates[j].attributes.total_usd
                    duplicates[i].attributes.price_per_sqm_sganett_idr = ppssgai
                    duplicates[i].attributes.price_per_sqm_sganett_usd = ppssgau
                    duplicates[i].attributes.total_idr_building = total_idr_building
                    duplicates[i].attributes.total_usd_building = total_usd_building
                    duplicates.splice(j, 1)
                    j = 0
                    i = 0
                }
            }
        }
    }

    for (let i = 0; i < duplicatesId.length; i++) {
        for (let j = 0; j < res.length; j++) {
            if (res[j].attributes.id == duplicatesId[i] && (res[j].attributes.source == "vdo" || res[j].attributes.source == "vdo-ayda")) {
                res.splice(j, 1)
                i = 0
                j = 0
            }
        }
    }

    for (let i = 0; i < duplicates.length; i++) {
        res.push(duplicates[i])
    }

    console.log(res)

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

var setPointings = function (map, points) {

    var longitude = points[0]
    var latitude = points[1]

    let point = new ESRI.Point();
    point.longitude = points[0];
    point.latitude = points[1];

    localStorage.setItem("livePointingLatitude", latitude);
    localStorage.setItem("livePointingLongitude", longitude);
    localStorage.setItem("livePointingX", map.ObjMapView.toScreen(point).x);
    localStorage.setItem("livePointingY", map.ObjMapView.toScreen(point).y);

    let layer = getLayerById(map, "pointer")
    map.ObjMap.remove(layer)

    let pointing = new GIS.Action.LivePointing(
        map.ObjMap,
        map.ObjMapView,
        latitude,
        longitude
    );

    pointing.setPictureMarker();
    pointing.render();

    actionElement(".popupFilter", "hide")

    setLocalStorage("pointingHighlight", null);

    if ($("#hold-radius-slider").length < 1) {
        let div = document.createElement("DIV")
        div.style.backgroundColor = "white"
        div.style.borderRadius = "10px"
        div.style.width = "auto"
        div.style.padding = "5px"
        div.style.height = "auto"
        div.style.fontWeight = "bold"
        div.id = "hold-radius-slider"
        map.ObjMapView.ui.add(div, "bottom-left")
        $.get("assets/js/graphics/slider/slider.html", function (data) {
            $(div).html(data);
        });
    } else {
        $("#slider-radius").val("0")
        $("#slider-radius-results").text("Area Radius : 0 km²")
    }

}