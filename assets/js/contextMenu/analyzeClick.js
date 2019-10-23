var analyzeClick = function () {
    $(document).delegate("#contextmenu-analyze", "click", async function () {
        $(".image-wrapper-a").remove() //Remove context menu
        $("#loading-bar").show() //Add loading bar
        let geometry = []
        let shapeRings = []
        let textArea = []
        let shapeAreas = []

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
                            if (groupLayers[s].layers.items[i].graphics.items[j].attributes == "buffer-graphics" || groupLayers[s].layers.items[i].graphics.items[j].attributes == "polygon-graphics") {
                                geometry.push(groupLayers[s].layers.items[i].graphics.items[j].geometry)
                                shapeRings.push(groupLayers[s].layers.items[i].graphics.items[j].geometry.rings[0])
                                await getAreaAndLengthPolygons(JSON.stringify(groupLayers[s].layers.items[i].graphics.items[j].geometry.rings[0])).then(async function (res) {
                                    shapeAreas.push(res[0][0])
                                })
                            }
                        }
                    }
                }
            }
        }

        console.log(shapeAreas)

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

        // for (let i = 0; i < areaLengthResults[0].length; i++) {
        //     areaIntersects.push(areaLengthResults[0][i][0][0][0])
        // }

        console.log("ukuran radius : ")
        console.log(shapeAreas)
        console.log("ukuran luas intersect desa : ")
        console.log(areaLengthResults)
        console.log("ukuran luas desa : ")
        console.log(areaVillages)
        console.log("populasi desa : ")
        console.log(villagesPopulation)

        console.log(attributes)

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

            console.log(areas)
            console.log(areaIntersect)
            console.log(populations)

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