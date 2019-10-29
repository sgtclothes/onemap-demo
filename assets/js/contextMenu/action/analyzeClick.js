var analyzeClick = function (token) {
    $(document).delegate("#contextmenu-analyze", "click", async function () {
        $(".image-wrapper-a").remove() //Remove context menu
        $("#loading-bar").show() //Add loading bar
        let geometry = []
        let shapeRings = []
        let textArea = []
        let shapeAreas = []
        let resultUnion = undefined

        let listNonProjectedRings = []
        let listConvertedProject = []

        let projectedRings = []
        let listProjectedPoints = []

        let intersectResults = []
        let areaLengthResults = []
        let areaIntersects = []

        let areaVillages = []
        let villagesPopulation = []
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

        await queryGeometryGetAttributes(featureLayer, geometry, "populasi").then(async function (results) {
            await villagesPopulation.push(results)
        })

        await queryGeometryGetAttributes(featureLayer, geometry, "*").then(async function (results) {
            await attributes.push(results)
        })

        console.log(villagesPopulation)
        console.log(attributes)

        await unionAttributes(attributes, token).then(function (results) {
            resultUnion = results
        })

        console.log(resultUnion)

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
            let total = 0

            for (let j = 0; j < areaLengthResults[i].length; j++) {
                for (let k = 0; k < areaLengthResults[i][j].length; k++) {
                    areaIntersect.push(areaLengthResults[i][j][k][0][0])
                }
            }
            for (let j = 0; j < areaVillages[0][i].length; j++) {
                areas.push(areaVillages[0][i][j])
            }
            for (let j = 0; j < villagesPopulation[0][i].length; j++) {
                populations.push(villagesPopulation[0][i][j])
            }

            for (let j = 0; j < areas.length; j++) {
                total += Math.round(calculateIntersectFeatures(populations[j], areas[j], areaIntersect[j]))
            }

            console.log("total " + i + " : " + total)

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
                mergeSecondClass[i] = data[i][s][0]
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
    console.log(data)
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

            // if (min[i][key] > data[i][s][2][key]) {
            //     min[i][key] = data[i][s][2][key]
            //     console.log(key + " : " + min[i][key])
            // }
            // if (max[i][key] < data[i][s][2][key]) {
            //     max[i][key] = data[i][s][2][key]
            //     console.log(key + " : " + max[i][key])
            // }

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

    console.log(mergeFirstClass)
    console.log(mergeSecondClass)
    console.log(mergeThirdClass)

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

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// Array.prototype.diff = function (arr2) {
//     var ret = [];
//     for (var i in this) {
//         if (arr2.indexOf(this[i]) > -1) {
//             ret.push(this[i]);
//         }
//     }
//     return ret;
// };