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
                markerSymbol = getMarkerSymbol(propertyType)
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
            var template = {};
            g = new ESRI.Graphic({
                geometry: point,
                attributes: attributes[i],
                symbol: markerSymbol,
                popupTemplate: template
            });
            graphicsLayer.add(g);
        }
        sortID(map, "colliers-property", "colliers-property-")
        registerAttributes(map, "colliers-property", "colliers-property-attr", "*")
        $("#loading-bar").hide()
    }
}

var displayLegendProperty = function (title, results) {
    let imgUrl = []
    if (results.features.length < 1) {
        $("#loading-bar").hide();
        $("#legendProperty").remove()
    } else {
        $(".titleLegendProperty").text(title)
        for (let i = 0; i < results.features.length; i++) {
            let propertyType = results.features[i].attributes.property_type.toLowerCase()
            let markerSymbol = getMarkerSymbol(propertyType)
            let obj = {
                type: propertyType,
                url: markerSymbol.url
            }
            imgUrl.push(obj)
        }

        imgUrl = removeDuplicates(imgUrl, "type")

        for (let i = 0; i < imgUrl.length; i++) {
            if (imgUrl[i].type.includes("/")) {
                let index = imgUrl[i].type.indexOf("/")
                imgUrl[i].type = imgUrl[i].type.replace(/\//ig, "-")
            }
            $(".tableLegendProperty").append("<tr id=" + imgUrl[i].type + "-" + i + ">")
            $("#" + imgUrl[i].type + "-" + i).append("<td id=" + imgUrl[i].type + "-img-" + i + " style='padding-left:5px;'>")
            $("#" + imgUrl[i].type + "-img-" + i).append("<img style='width:14px; height:14px;' src=" + imgUrl[i].url + ">")
            $("#" + imgUrl[i].type + "-" + i).append("<td id=" + imgUrl[i].type + "-text-" + i + " style='font-size:9px;'>")
            $("#" + imgUrl[i].type + "-text-" + i).text(imgUrl[i].type)
        }

    }
}

var getMarkerSymbol = function (propertyType, renderer) {
    let markerSymbol = {}
    if (propertyType == "office") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/office.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "house") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/house.png",
            width: "12px",
            height: "12px"
        };
    }
    else if (propertyType == "ruko") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/ruko.png",
            width: "12px",
            height: "12px"
        };
    }
    else if (propertyType == "industrial/logistic") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/industrial.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "data center") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/data-center.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "shopping center") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/shopping-center.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "apartment") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/apartment.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "hotel") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/hotel.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "others") {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/property-icon/others.png",
            width: "12px",
            height: "12px"
        };
    } else if (propertyType == "symbol" && renderer) {
        markerSymbol = renderer
    }
    else {
        markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: "assets/images/icons/OB-red.png",
            width: "12px",
            height: "12px"
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