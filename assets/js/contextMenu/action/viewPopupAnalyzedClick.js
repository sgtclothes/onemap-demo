var viewPopupAnalyzedClick = function (map) {
    let property = []
    let obj = []
    $(document).delegate("#contextmenu-view-popup", "click", async function () {
        $("#loading-bar").show()
        await $.get("assets/js/contextMenu/action/popup/viewPopupAnalyzed.html", function (data) {
            $(".page-content").append(data);
        });
        let id = getLocalStorage("selectedLayerID", [])
        let layer = undefined
        let attributes = undefined
        let geometry = undefined
        for (let i = 0; i < groupLayerID.length; i++) {
            layer = getNestedLayerById(map, groupLayerID[i], id)
            if (layer != undefined) {
                break;
            }
        }
        geometry = layer.graphics.items[0].geometry
        attributes = layer.graphics.items[0].attributes
        await getProperty(geometry, "office").then(function (results) {
            property.push(results)
            console.log(results)
        })
        await getProperty(geometry, "house").then(function (results) {
            property.push(results)
            console.log(results)
        })
        await getProperty(geometry, "sold").then(function (results) {
            property.push(results)
            console.log(results)
        })
        let title = layer.graphics.items[0].layer.id
        let population = attributes.firstClass.populasi
        let density = parseFloat(Math.round(attributes.secondClass.kepadatan * 100) / 100).toFixed(1);
        let house = attributes.firstClass.rumah
        let shop = attributes.firstClass.toko
        let average = attributes.thirdClass.average
        let min = attributes.thirdClass.min
        let max = attributes.thirdClass.max
        var outAll = Object.keys(attributes.firstClass).map(function (data) {
            return { key: data, value: attributes.firstClass[data] };
        });
        var outAverage = Object.keys(average).map(function (data) {
            return { key: data, value: parseFloat(Math.round(average[data] * 100) / 100).toFixed(1) };
        });
        var outMin = Object.keys(min).map(function (data) {
            return { key: data, value: parseFloat(Math.round(min[data] * 100) / 100).toFixed(1) };
        });
        var outMax = Object.keys(max).map(function (data) {
            return { key: data, value: parseFloat(Math.round(max[data] * 100) / 100).toFixed(1) };
        });
        appendObjectToTable(outAll, "table-data-left", "popup")
        appendObjectToTable(outAverage, "table-data-left-2", "popup")
        appendObjectToTable(outMin, "table-data-right-2", "popup")
        appendObjectToTable(outMax, "table-data-right", "popup")
        $("#title-popup-analyzed").text(title)
        $("#population-analyzed").text(population + " penduduk")
        $("#density-analyzed").text(density + " penduduk/km")
        $("#house-analyzed").text(house)
        $("#shop-analyzed").text(shop)
        $("#colliers-property-office-analyzed").text(property[0].features.length)
        appendShowPoints("#colliers-property-office-analyzed", property[0].features.length)
        $("#colliers-property-house-analyzed").text(property[1].features.length)
        appendShowPoints("#colliers-property-house-analyzed", property[1].features.length)
        $("#colliers-property-sold-analyzed").text(property[2].features.length)
        appendShowPoints("#colliers-property-sold-analyzed", property[2].features.length)
        $("#colliers-property-analyzed").text(property[0].features.length + property[1].features.length + property[2].features.length)
        appendShowPoints("#colliers-property-analyzed", property[0].features.length + property[1].features.length + property[2].features.length)
        $("#loading-bar").hide()
    })

    $(document).delegate("#close-popup-analyzed", "click", function () {
        property = []
        $(".popup-analyze").remove()
    })

    $(document).delegate("#close-sub-popup-analyzed", "click", function () {
        obj = []
        $("#list-property-div").remove()
    })

    $(document).delegate("#colliers-property-office-analyzed", "click", async function () {
        if ($(this).text() != 0) {
            await $.get("assets/js/contextMenu/action/popup/subViewPopupAnalyzed.html", function (data) {
                $(".page-content").append(data);
            });
        }
        for (let i = 0; i < property[0].features.length; i++) {
            obj.push({
                key: property[0].features[i].attributes.property_photo,
                value: property[0].features[i].attributes.property_address,
                response: property[0].features[i].attributes
            })
        }
        appendObjectToTable(obj, "popup-features-analyzed", "sub-popup")
    })

    $(document).delegate("#colliers-property-house-analyzed", "click", async function () {
        if ($(this).text() != 0) {
            await $.get("assets/js/contextMenu/action/popup/subViewPopupAnalyzed.html", function (data) {
                $(".page-content").append(data);
            });
        }
        for (let i = 0; i < property[1].features.length; i++) {
            obj.push({
                key: property[1].features[i].attributes.property_photo,
                value: property[1].features[i].attributes.property_address,
                response: property[1].features[i].attributes
            })
        }
        appendObjectToTable(obj, "popup-features-analyzed", "sub-popup")
    })

    $(document).delegate(".view-property-analyzed", "click", function () {
        let response = obj[$(this).attr("value")].response
        getColliersData(response)
    })

    $(document).delegate(".append-show-points", "click", function () {
        var graphicsLayer = new ESRI.GraphicsLayer({
            id: "colliers-property-"
        });
        $(".popup-analyze").remove()
        displayResultsGraphics(map, property[0], graphicsLayer, groupLayerProperty)
        console.log(map.ObjMap)
    })
}

var appendObjectToTable = function (obj, name, key) {
    var tbody = document.getElementById(name);
    if (key == "popup") {
        for (var i = 0; i < Object.keys(obj).length; i++) {
            var tr = "<tr>";
            if (obj[i].value.toString().substring(obj[i].value.toString().indexOf('.'), obj[i].value.toString().length) < 2) obj[i].value += "0";

            tr += "<td>" + obj[i].key + "</td>" + "<td>" + obj[i].value.toString() + "</td></tr>";
            tbody.innerHTML += tr;
        }
    } else if (key == "sub-popup") {
        for (var i = 0; i < Object.keys(obj).length; i++) {
            var tr = "<tr>";
            if (obj[i].value.toString().substring(obj[i].value.toString().indexOf('.'), obj[i].value.toString().length) < 2) obj[i].value += "0";

            tr += "<td>" + (i + 1) + "</td>" + "<td style='width:100px; height:100px; background-size: 100% 100%; background-image:url(" + obj[i].key + ");'></td>" + "<td>" + obj[i].value.toString() + "</td>" + "<td><a class='view-property-analyzed' value=" + i + " href='#'>" + "View" + "</a></td>" + "</tr>";
            tbody.innerHTML += tr;
        }
    }
}

var getProperty = async function (geometry, key) {
    let query = new ESRI.Query()
    let result = undefined
    query.returnGeometry = true;
    if (key == "sold") {
        query.where = "lower(property_status)='sold'"
    } else {
        query.where = "(lower(property_type) = '" + key + "')"
    }
    query.geometry = geometry;
    query.outFields = "*";
    await colliersPropertyStaging.queryFeatures(query).then(function (results) {
        result = results
    })
    return result
}

var appendShowPoints = function (key, value) {
    if (value > 0) {
        let td = $(key).parent().next()
        $(td).append("<a id=" + key + " class='append-show-points' href='#'>Show Points</a>")
    }
}