var analyzeClick = function (token) {
    $(document).delegate("#contextmenu-analyze", "click", async function () {
        $(".image-wrapper-a").remove() //Remove context menu
        $("#loading-bar").show() //Add loading bar
        let geometry = []
        let shapeRings = []
        let shapeAreas = []
        let resultUnion = undefined

        let listNonProjectedRings = []
        let listConvertedProject = []

        let projectedRings = []
        let listProjectedPoints = []

        let intersectResults = []
        let areaLengthResults = []

        let areaVillages = []
        let attributes = []

        let selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
        for (let s = 0; s < groupLayers.length; s++) {
            for (let i = 0; i < groupLayers[s].layers.items.length; i++) {
                for (let j = 0; j < groupLayers[s].layers.items[i].graphics.items.length; j++) {
                    for (let k = 0; k < selectedLayer.length; k++) {
                        if (groupLayers[s].layers.items[i].id == selectedLayer[k]) {
                            if (groupLayers[s].layers.items[i].graphics.items[j].selector == "buffer-graphics") {
                                groupLayers[s].layers.items[i].graphics.items[j].analyzed = true
                                geometry.push(groupLayers[s].layers.items[i].graphics.items[j].geometry)
                                shapeRings.push(groupLayers[s].layers.items[i].graphics.items[j].geometry.rings[0])
                                await getAreaAndLengthPolygons(JSON.stringify(groupLayers[s].layers.items[i].graphics.items[j].geometry.rings[0])).then(async function (res) {
                                    shapeAreas.push(res[0][0])
                                })
                            } else if (groupLayers[s].layers.items[i].graphics.items[j].selector == "polygon-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "rectangle-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "drivetime-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "drivedistance-graphics") {
                                groupLayers[s].layers.items[i].graphics.items[j].analyzed = true
                                geometry.push(groupLayers[s].layers.items[i].graphics.items[j].geometry_3857)
                                await getProjectionPoint(JSON.stringify(groupLayers[s].layers.items[i].graphics.items[j].geometry.rings[0]), "4326", "3857").then(async function (res) {
                                    await shapeRings.push(res)
                                    await getAreaAndLengthPolygons(JSON.stringify(res)).then(async function (results) {
                                        await shapeAreas.push(results[0][0])
                                    })
                                })
                            }
                        }
                    }
                }
            }
        }

        //Get the projection point
        for (let i = 0; i < shapeRings.length; i++) {
            await getProjectionPoint(JSON.stringify(shapeRings[i]), "3857", "4326").then(function (results) {
                projectedRings.push(results)
            })
        }

        //Setting featureLayer url for service
        let featureLayer = new ESRI.FeatureLayer(
            "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
        );

        //Get the rings from query results
        await queryGeometryGetAttributes(featureLayer, geometry, "st_area(shape)").then(async function (results) {
            await areaVillages.push(results)
        })

        await queryGeometryGetAttributes(featureLayer, geometry, "*").then(async function (results) {
            await attributes.push(results)
        })

        await unionAttributes(attributes, token).then(function (results) {
            resultUnion = results
        })

        await queryGeometryGetRings(featureLayer, geometry, "").then(async function (results) {
            for (let i = 0; i < results.length; i++) {
                let projectedPoints = []
                let nonProjectedRings = []
                for (let j = 0; j < results[i].length; j++) {
                    nonProjectedRings.push(results[i][j])
                    await getProjectionPoint(JSON.stringify(results[i][j]), "3857", "4326").then(async function (res) {
                        await projectedPoints.push(res)
                    })
                }
                listNonProjectedRings.push(nonProjectedRings)
                await listProjectedPoints.push(projectedPoints)
            }
        })

        for (let i = 0; i < projectedRings.length; i++) {
            let intersectQuery = []
            for (let j = 0; j < listProjectedPoints[i].length; j++) {
                await getIntersectPolygons(JSON.stringify(projectedRings[i]), JSON.stringify(listProjectedPoints[i][j])).then(async function (res) {
                    await intersectQuery.push(res)
                })
            }
            await intersectResults.push(intersectQuery)
        }

        for (let i = 0; i < intersectResults.length; i++) {
            let convertedProject = []
            for (let j = 0; j < intersectResults[i].length; j++) {
                await getProjectionPoint(JSON.stringify(intersectResults[i][j][0]), "4326", "3857").then(async function (res) {
                    await convertedProject.push(res)
                })
            }
            await listConvertedProject.push(convertedProject)
        }

        for (let i = 0; i < listConvertedProject.length; i++) {
            let areaLengthQuery = []
            for (let j = 0; j < listConvertedProject[i].length; j++) {
                await getAreaAndLengthPolygons(JSON.stringify(listConvertedProject[i][j])).then(async function (res) {
                    await areaLengthQuery.push(res)
                })
            }
            await areaLengthResults.push(areaLengthQuery)
        }

        for (let i = 0; i < shapeAreas.length; i++) {

            let areas = []
            let areaIntersect = []
            let populations = []

            for (let j = 0; j < areaLengthResults[i].length; j++) {
                for (let k = 0; k < areaLengthResults[i][j].length; k++) {
                    areaIntersect.push(areaLengthResults[i][j][k][0][0])
                }
            }
            for (let j = 0; j < areaVillages[0][i].length; j++) {
                areas.push(areaVillages[0][i][j])
            }

            let firstClass = resultUnion[0]
            let secondClass = resultUnion[1]
            let thirdClass = resultUnion[2]
            let average = thirdClass["average"]
            let min = thirdClass["min"]
            let max = thirdClass["max"]

            let finalResultsFirst = []
            let finalResultsSecond = []
            let finalResultsThird = []
            let tempAvGRes = []
            let tempMinRes = []
            let tempMaxRes = []

            for (let j = 0; j < firstClass.length; j++) {
                finalResultsFirst.push([])
                for (let k = 0; k < areas.length; k++) {
                    let result = {}
                    for (let key in firstClass[j]) {
                        result[key] = calculateIntersectFeatures(firstClass[j][key], areas[k], areaIntersect[k])
                    }
                    if (finalResultsFirst[j].length < 1) {
                        finalResultsFirst[j] = result
                    } else {
                        finalResultsFirst[j] = Object.keys(finalResultsFirst[j]).concat(Object.keys(result)).reduce(function (obj, s) {
                            obj[s] = (finalResultsFirst[j][s] || 0) + (result[s] || 0);
                            if (k == areas.length - 1) {
                                obj[s] = Math.round(obj[s])
                            }
                            return obj;
                        }, {})
                    }
                }
            }

            for (let j = 0; j < secondClass.length; j++) {
                finalResultsSecond.push([])
                for (let k = 0; k < areas.length; k++) {
                    let result = {}
                    for (let key in secondClass[j]) {
                        result[key] = calculateIntersectFeatures(secondClass[j][key], areas[k], areaIntersect[k])
                    }

                    if (finalResultsSecond[j].length < 1) {
                        finalResultsSecond[j] = result
                    } else {
                        finalResultsSecond[j] = Object.keys(finalResultsSecond[j]).concat(Object.keys(result)).reduce(function (obj, s) {
                            obj[s] = (finalResultsSecond[j][s] || 0) + (result[s] || 0);
                            return obj;
                        }, {})
                    }
                }
            }

            for (let j = 0; j < average.length; j++) {
                tempAvGRes.push([])
                for (let k = 0; k < areas.length; k++) {
                    let result = {}
                    for (let key in average[j]) {
                        result[key] = calculateIntersectFeatures(average[j][key], areas[k], areaIntersect[k])
                    }

                    if (tempAvGRes[j].length < 1) {
                        tempAvGRes[j] = result
                    } else {
                        tempAvGRes[j] = Object.keys(tempAvGRes[j]).concat(Object.keys(result)).reduce(function (obj, s) {
                            obj[s] = (tempAvGRes[j][s] || 0) + (result[s] || 0);
                            return obj;
                        }, {})
                    }
                }
            }

            for (let j = 0; j < min.length; j++) {
                tempMinRes.push([])
                for (let k = 0; k < areas.length; k++) {
                    let result = {}
                    for (let key in min[j]) {
                        result[key] = calculateIntersectFeatures(min[j][key], areas[k], areaIntersect[k])
                    }

                    if (tempMinRes[j].length < 1) {
                        tempMinRes[j] = result
                    } else {
                        tempMinRes[j] = Object.keys(tempMinRes[j]).concat(Object.keys(result)).reduce(function (obj, s) {
                            obj[s] = (tempMinRes[j][s] || 0) + (result[s] || 0);
                            return obj;
                        }, {})
                    }
                }
            }

            for (let j = 0; j < max.length; j++) {
                tempMaxRes.push([])
                for (let k = 0; k < areas.length; k++) {
                    let result = {}
                    for (let key in max[j]) {
                        result[key] = calculateIntersectFeatures(max[j][key], areas[k], areaIntersect[k])
                    }

                    if (tempMaxRes[j].length < 1) {
                        tempMaxRes[j] = result
                    } else {
                        tempMaxRes[j] = Object.keys(tempMaxRes[j]).concat(Object.keys(result)).reduce(function (obj, s) {
                            obj[s] = (tempMaxRes[j][s] || 0) + (result[s] || 0);
                            return obj;
                        }, {})
                    }
                }
            }

            finalResultsThird = [tempAvGRes, tempMinRes, tempMaxRes]
            setTargetToAnalyzed(finalResultsFirst, finalResultsSecond, finalResultsThird)
        }
        $("#loading-bar").hide()
    })
}

var convertSqmToSqkm = function (value) {
    return value / 1000000
}

var convertSqkmToSqm = function (value) {
    return value * 1000000
}

var calculateIntersectFeatures = function (value, area, areaIntersect) {
    return (areaIntersect / area) * value
}

var unionAttributes = async function (attributes, token) {
    let data = []
    for (let i = 0; i < attributes[0].length; i++) {
        let d = []
        for (let j = 0; j < attributes[0][i].length; j++) {
            await compareAttributes(attributes[0][i][j], token).then(async function (results) {
                await d.push(results)
            })
        }
        await data.push(d)
    }

    //Method for first classification
    let mergeFirstClass = []
    for (let i = 0; i < data.length; i++) {
        mergeFirstClass.push([])
        for (let s = 0; s < data[i].length; s++) {
            if (mergeFirstClass[i].length < 1) {
                mergeFirstClass[i] = data[i][s][0]
            } else {
                mergeFirstClass[i] = Object.keys(mergeFirstClass[i]).concat(Object.keys(data[i][s][0])).reduce(function (obj, k) {
                    obj[k] = (mergeFirstClass[i][k] || 0) + (data[i][s][0][k] || 0);
                    return obj;
                }, {})
            }
        }
    }

    //Method for second classification
    let mergeSecondClass = []
    for (let i = 0; i < data.length; i++) {
        mergeSecondClass.push([])
        for (let s = 0; s < data[i].length; s++) {
            if (mergeSecondClass[i].length < 1) {
                mergeSecondClass[i] = data[i][s][1]
            } else {
                mergeSecondClass[i] = Object.keys(mergeSecondClass[i]).concat(Object.keys(data[i][s][1])).reduce(function (obj, k) {
                    obj[k] = (mergeSecondClass[i][k] || 0) + (data[i][s][1][k] || 0);
                    return obj;
                }, {})
            }
        }
    }

    //Method for third classification
    let mergeThirdClass = []
    let min = []
    let max = []
    let average = []
    for (let i = 0; i < data.length; i++) {
        min.push([])
        max.push([])
        average.push([])
        for (let s = 0; s < data[i].length; s++) {
            if (min[i].length < 1) {
                min[i] = data[i][s][2]
            } else {
                min[i] = Object.keys(min[i]).concat(Object.keys(data[i][s][2])).reduce(function (obj, k) {
                    obj[k] = min[i][k]
                    if (obj[k] > data[i][s][2][k]) {
                        obj[k] = data[i][s][2][k]
                    }
                    return obj;
                }, {})
            }
            if (max[i].length < 1) {
                max[i] = data[i][s][2]
            } else {
                max[i] = Object.keys(max[i]).concat(Object.keys(data[i][s][2])).reduce(function (obj, k) {
                    obj[k] = max[i][k]
                    if (obj[k] < data[i][s][2][k]) {
                        obj[k] = data[i][s][2][k]
                    }
                    return obj;
                }, {})
            }

            if (average[i].length < 1) {
                average[i] = data[i][s][2]
            } else {
                average[i] = Object.keys(average[i]).concat(Object.keys(data[i][s][2])).reduce(function (obj, k) {
                    obj[k] = (average[i][k] || 0) + (data[i][s][2][k] || 0);
                    if (s == data[i].length - 1) {
                        obj[k] = obj[k] / data[i].length
                    }
                    return obj;
                }, {})
            }
        }
    }

    mergeThirdClass = {
        min: min,
        max: max,
        average: average
    }

    return [mergeFirstClass, mergeSecondClass, mergeThirdClass]
}

var compareAttributes = async function (attributes, token) {
    let firstClass = {}
    let secondClass = {}
    let thirdClass = {}
    let fourthClass = {}
    await generateClassifications(token).then(function (results) {
        for (let i = 0; i < results[0].length; i++) {
            if (attributes.hasOwnProperty(results[0][i])) {
                firstClass[results[0][i]] = attributes[results[0][i]]
            }
        }
    })
    await generateClassifications(token).then(async function (results) {
        for (let i = 0; i < results[1].length; i++) {
            if (attributes.hasOwnProperty(results[1][i])) {
                secondClass[results[1][i]] = attributes[results[1][i]]
            }
        }
    })
    await generateClassifications(token).then(async function (results) {
        for (let i = 0; i < results[2].length; i++) {
            if (attributes.hasOwnProperty(results[2][i])) {
                thirdClass[results[2][i]] = attributes[results[2][i]]
            }
        }
    })
    await generateClassifications(token).then(async function (results) {
        for (let i = 0; i < results[3].length; i++) {
            if (attributes.hasOwnProperty(results[3][i])) {
                fourthClass[results[3][i]] = attributes[results[3][i]]
            }
        }
    })
    return [firstClass, secondClass, thirdClass, fourthClass]
}


var setTargetToAnalyzed = function (res1, res2, res3) {
    let selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
    let symbol = {
        type: "simple-fill",
        color: [0, 0, 255, 0.2],
        outline: {
            color: "#7a7c80",
            width: 2
        }
    }
    let obj = {}
    for (let s = 0; s < groupLayers.length; s++) {
        for (let i = 0; i < groupLayers[s].layers.items.length; i++) {
            for (let k = 0; k < selectedLayer.length; k++) {
                if (groupLayers[s].layers.items[i].id == selectedLayer[k]) {
                    obj = {
                        firstClass: res1[k],
                        secondClass: res2[k],
                        thirdClass: {
                            average: res3[0][k],
                            min: res3[1][k],
                            max: res3[2][k]
                        }
                    }
                    groupLayers[s].layers.items[i].graphics.items[0].symbol = symbol
                    groupLayers[s].layers.items[i].graphics.items[0].attributes = obj
                }
            }
        }
    }
}

var generateClassifications = async function (token) {
    let classFirst = []
    let classSecond = []
    let classThird = []
    let classFourth = []
    await getClassifications(token, 1).then(function (results) {
        for (let i = 0; i < results.length; i++) {
            classFirst.push(results[i].attributes.fieldname)
        }
    })
    await getClassifications(token, 2).then(function (results) {
        for (let i = 0; i < results.length; i++) {
            classSecond.push(results[i].attributes.fieldname)
        }
    })
    await getClassifications(token, 3).then(function (results) {
        for (let i = 0; i < results.length; i++) {
            classThird.push(results[i].attributes.fieldname)
        }
    })
    await getClassifications(token, 4).then(function (results) {
        for (let i = 0; i < results.length; i++) {
            classFourth.push(results[i].attributes.fieldname)
        }
    })

    return [classFirst, classSecond, classThird, classFourth]
}

var getClassifications = async function (token, sumclass) {
    var results = undefined
    var url = "https://139.162.2.92:6443/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/1/query?where=sumclass=" + sumclass + "&outFileds=*&token=" + token
    await EsriRequest(
        url, { query: { f: "json" }, responseType: "json" }
    ).then(function (response) {
        results = response.data.features
    });

    return results
}

var removeClick = function (map) {
    $(document).delegate("#contextmenu-remove", "click", function () {
        $('.image-wrapper-a').remove() //Remove context menu
        let selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
        for (let s = 0; s < groupLayers.length; s++) {
            for (let i = 0; i < selectedLayer.length; i++) {
                for (let j = 0; j < groupLayers[s].layers.items.length; j++) {
                    if (groupLayers[s].layers.items[j].id == selectedLayer[i]) {
                        let key = groupLayers[s].layers.items[j].id.split("-")

                        let index = selectedLayer.indexOf(groupLayers[s].layers.items[j].id)
                        selectedLayer.splice(index, 1)
                        setLocalStorage("selectedLayer", JSON.stringify(selectedLayer))

                        groupLayers[s].layers.items[j].visible = false
                        groupLayers[s].layers.items.splice(j, 1)

                        if (key[1] == "buffer") {
                            var layer = getNestedLayerById(map, "labels", "label-" + key[0] + "-" + key[1] + "-" + key[2])
                            getLayerById(map, "labels").remove(layer)
                            sortID(map, "radius", "dynamic-buffer-")
                            sortID(map, "labels", "label-dynamic-buffer-")
                        }
                        if (key[1] == "polygon") {
                            sortID(map, "polygons", "dynamic-polygon-")
                        }
                        if (key[0] == "point") {
                            sortID(map, "points", "point-")
                        }
                        if (key[0] == "rectangle") {
                            sortID(map, "rectangles", "rectangle-")
                        }
                        if (key[1] == "time") {
                            sortID(map, "driving-time", "drive-time-")
                        }
                        if (key[1] == "distance") {
                            sortID(map, "driving-distance", "drive-distance-")
                        }
                    }
                }
            }
        }
    })
}

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