var displayResultsGraphics = function (map, results, graphicsLayer, groupLayer, renderer) {
    groupLayer.add(graphicsLayer);
    var attributes = []
    if (results.features.length < 1) {
        $("#loading-bar").hide();
    } else {
        for (let i = 0; i < results.features.length; i++) {
            attributes.push(results.features[i].attributes)
        }
        for (let i = 0; i < results.features.length; i++) {
            var g
            let property = undefined
            let markerSymbol = undefined
            if (results.features[i].attributes.hasOwnProperty("property_type")) {
                property = results.features[i].attributes.property_type.toLowerCase()
                markerSymbol = getMarkerSymbol(property)
            } else {
                property = "symbol"
                markerSymbol = getMarkerSymbol(property, renderer)
            }
            let point = new ESRI.Point()
            if (results.features[i].geometry.longitude == undefined && results.features[i].geometry.latitude == undefined) {
                point.longitude = results.features[i].geometry.x
                point.latitude = results.features[i].geometry.y
            } else {
                point.longitude = results.features[i].geometry.longitude
                point.latitude = results.features[i].geometry.latitude
            }
            var template = {
                title: "{name}",
                content: "{*}"
            }
            g = new ESRI.Graphic({
                selector: "external-data-graphics",
                geometry: point,
                attributes: attributes[i],
                symbol: markerSymbol,
                popupTemplate: template
            });
            graphicsLayer.add(g);
        }
        sortID(map, "colliers-property", "colliers-property-")
        registerAttributes(map, "colliers-property", "colliers-property-attr", "*")
    }
}

var displayLegendProperty = async function (map, title, results, kTag, renderer, index) {
    let imgUrl = []
    let choice = undefined
    let obj = {}
    let property = undefined
    let tableLegend = $(".tableLegendProperty")
    if (tableLegend.length < 1) {
        await $.get("assets/js/filter/legend/resultsLegend.html", function (data) {
            map.ObjMapView.ui.add($(data)[0], "bottom-right");
        });
    }
    $(".titleLegendProperty").text(title)
    if (results.features.length < 1) {
        $("#loading-bar").hide();
        if (renderer.hasOwnProperty("url")) {
            choice = "external data icon"
            obj = {
                name: kTag,
                type: kTag,
                url: renderer.url
            }
        } else if (renderer.hasOwnProperty("color")) {
            choice = "external data mark"
            obj = {
                name: kTag,
                type: kTag,
                color: renderer.color
            }
        }
        imgUrl.push(obj)
    } else {
        for (let i = 0; i < results.features.length; i++) {
            if (results.features[i].attributes.hasOwnProperty("property_type")) {
                choice = "external data icon"
                property = results.features[i].attributes.property_type.toLowerCase()
                markerSymbol = getMarkerSymbol(property)
                obj = {
                    name: property,
                    type: "colliers-property-" + property,
                    url: markerSymbol.url
                }
            } else {
                if (renderer.hasOwnProperty("url")) {
                    choice = "external data icon"
                    obj = {
                        name: kTag,
                        type: kTag,
                        url: renderer.url
                    }
                } else if (renderer.hasOwnProperty("color")) {
                    choice = "external data mark"
                    obj = {
                        name: kTag,
                        type: kTag,
                        color: renderer.color
                    }
                }
            }
            imgUrl.push(obj)
        }

        imgUrl = removeDuplicates(imgUrl, "type")
    }

    for (let i = 0; i < imgUrl.length; i++) {
        let punctuations = [/\s/g, "&", "'", ".", "/"]
        imgUrl[i].type_id = punctuationFixer(punctuations, "_", imgUrl[i].type)
        if (!kTag) {
            index = i
        }
        $(".tableLegendProperty").append("<tr style='padding-right:5px; padding-left:5px;' id=" + imgUrl[i].type_id + "-" + index + ">")
        $("#" + imgUrl[i].type_id + "-" + index).append("<td id=" + imgUrl[i].type_id + "-img-" + index + " style='padding-left:5px;'>")
        if (choice == "external data icon") {
            $("#" + imgUrl[i].type_id + "-img-" + index).append("<img style='width:14px; height:14px;' src=" + imgUrl[i].url + ">")
        } else if (choice == "external data mark") {
            $("#" + imgUrl[i].type_id + "-img-" + index).append("<span style='display:inline-block; border-radius:50%; width:14px; height:14px; background-color:rgb(" + imgUrl[i].color[0] + "," + imgUrl[i].color[1] + "," + imgUrl[i].color[2] + ")' src=" + imgUrl[i].url + "></span>")
        }
        $("#" + imgUrl[i].type_id + "-" + index).append("<td id=" + imgUrl[i].type_id + "-text-" + index + " style='font-size:9px;'>")
        $("#" + imgUrl[i].type_id + "-text-" + index).text(imgUrl[i].name)
        if ($(".tableLegendProperty").find("tr").length > 4 && legendOverflow == false) {
            window.legendOverflow = true
            let height = $(".tableLegendProperty").css("height")
            $(".div-tableLegendProperty").css("height", height)
            $(".div-tableLegendProperty").css("overflow-y", "auto")
        }
    }

}

var displayResultsGraphicsPropertyColliers = async function (map, results) {
    //---Custom variables
    var features = results.features
    var graphicsLayer = new ESRI.GraphicsLayer({
        id: "colliers-property-"
    })
    groupLayerProperty.add(graphicsLayer)
    var attributes = []
    //---
    if (features.length < 1) {
        loading("hide")
    } else {
        loading("show")
        for (let i = 0; i < features.length; i++) {
            attributes.push(features[i].attributes)
        }
        for (let i = 0; i < features.length; i++) {
            var g
            var property = undefined
            var markerSymbol = undefined
            property = features[i].attributes.property_type.toLowerCase()
            markerSymbol = getMarkerSymbol(property)
            var point = new ESRI.Point()
            if (features[i].geometry.longitude == undefined && features[i].geometry.latitude == undefined) {
                point.longitude = features[i].geometry.x
                point.latitude = features[i].geometry.y
            } else {
                point.longitude = features[i].geometry.longitude
                point.latitude = features[i].geometry.latitude
            }
            var template = {};
            g = new ESRI.Graphic({
                geometry: point,
                attributes: attributes[i],
                symbol: markerSymbol,
                popupTemplate: template
            });
            graphicsLayer.add(g);
        }
        await sortID(map, "colliers-property", "colliers-property-")
        await registerAttributes(map, "colliers-property", "colliers-property-attr", "*")
    }
}

var displayLegendPropertyColliers = async function (map, title) {
    var layer = getLayerById(map, "colliers-property").layers.items
    var property = []

    for (let i = 0; i < layer.length; i++) {
        for (let j = 0; j < layer[i].graphics.items.length; j++) {
            if (layer[i].graphics.items[j].attributes.property_type.toLowerCase() == "land" || layer[i].graphics.items[j].attributes.property_type.toLowerCase() == "land, industrial/logistic" || layer[i].graphics.items[j].attributes.property_type.toLowerCase() == " " || layer[i].graphics.items[j].attributes.property_type.toLowerCase() == "land, office") {
                layer[i].graphics.items[j].attributes.property_type = "others"
            }
            property.push({
                type: layer[i].graphics.items[j].attributes.property_type.toLowerCase()
            })
        }
    }

    property = removeDuplicates(property, "type")

    var imgUrl = []
    var obj = {}
    var markerSymbol = undefined

    if (property.length > 0) {
        await checkLegend(map, ".tableLegendProperty", "assets/js/filter/legend/resultsLegend.html")
        await setTitleLegend(".titleLegendProperty", title)
    }

    for (let i = 0; i < property.length; i++) {
        markerSymbol = getMarkerSymbol(property[i].type)
        obj = {
            name: property[i].type,
            type: "colliers-property-" + property[i].type,
            url: markerSymbol.url
        }
        imgUrl.push(obj)
    }

    imgUrl = removeDuplicates(imgUrl, "type")

    for (let i = 0; i < imgUrl.length; i++) {
        var index = i
        let punctuations = [/\s/g, "&", "'", ".", "/"]
        imgUrl[i].type_id = punctuationFixer(punctuations, "_", imgUrl[i].type)
        $(".tableLegendProperty").append("<tr style='padding-right:5px; padding-left:5px;' id=" + imgUrl[i].type_id + "-" + index + ">")
        $("#" + imgUrl[i].type_id + "-" + index).append("<td id=" + imgUrl[i].type_id + "-img-" + index + " style='padding-left:5px;'>")
        $("#" + imgUrl[i].type_id + "-img-" + index).append("<img style='width:14px; height:14px;' src=" + imgUrl[i].url + ">")
        $("#" + imgUrl[i].type_id + "-" + index).append("<td id=" + imgUrl[i].type_id + "-text-" + index + " style='font-size:9px;'>")
        $("#" + imgUrl[i].type_id + "-text-" + index).text(imgUrl[i].name)
        if ($(".tableLegendProperty").find("tr").length > 4 && legendOverflow == false) {
            window.legendOverflow = true
            let height = $(".tableLegendProperty").css("height")
            $(".div-tableLegendProperty").css("height", height)
            $(".div-tableLegendProperty").css("overflow-y", "auto")
        }
    }
}

var getMarkerSymbol = function (propertyType, renderer) {
    let markerSymbol = {}
    if (propertyType == "office") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/office.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "house") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/house.png",
            width: "20px",
            height: "20px"
        };
    }
    else if (propertyType == "ruko") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/ruko.png",
            width: "20px",
            height: "20px"
        };
    }
    else if (propertyType == "industrial/logistic") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/industrial.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "data center") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/data-center.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "shopping center") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/shopping-center.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "apartment") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/apartment.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "hotel") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/hotel.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "others") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/others.png",
            width: "20px",
            height: "20px"
        };
    } else if (propertyType == "symbol" && renderer) {
        markerSymbol = renderer
    }
    else {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/icons/OB-red.png",
            width: "20px",
            height: "20px"
        };
    }

    return markerSymbol
}

var removeDuplicates = function (originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }

    newArray.splice(newArray.length - 1, 1)
    return newArray;
}