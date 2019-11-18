async function queryGeometryGetAttributes(featureLayer, geometry, outFields) {
    let resultsFinal = []
    for (let i = 0; i < geometry.length; i++) {
        let resultsQuery = []
        let query = new ESRI.Query();
        query.returnGeometry = true;
        query.where = "1=1"
        query.geometry = geometry[i];
        query.outFields = outFields;
        await featureLayer.queryFeatures(query).then(function (results) {
            for (let j = 0; j < results.features.length; j++) {
                let name = []
                let obj = []
                if (outFields == "*") {
                    for (let k = 0; k < results.fields.length; k++) {
                        name.push(results.fields[k].name)
                    }
                    for (let k = 0; k < name.length; k++) {
                        obj[name[k]] = results.features[j].attributes[name[k]]
                    }
                    resultsQuery.push(obj)
                } else {
                    resultsQuery.push(results.features[j].attributes[outFields])
                }
            }
            resultsFinal.push(resultsQuery)
        })
    }
    return resultsFinal
}

async function queryGeometryGetRings(featureLayer, geometry, outFields) {
    let resultsFinal = []
    for (let i = 0; i < geometry.length; i++) {
        let resultsQuery = []
        let query = new ESRI.Query();
        query.returnGeometry = true;
        query.where = "1=1"
        query.geometry = geometry[i];
        query.outFields = outFields;
        await featureLayer.queryFeatures(query).then(function (results) {
            for (let j = 0; j < results.features.length; j++) {
                resultsQuery.push(results.features[j].geometry.rings[0])
            }
            resultsFinal.push(resultsQuery)
        })
    }
    return resultsFinal
}

var processQuery = async function (map, featureService, where, outFields, readGeometry, geometryType) {
    loading("show")
    var query = new ESRI.Query();
    var res = undefined
    query.returnGeometry = true;
    query.outFields = outFields;
    query.outSpatialReference = map.ObjMap.spatialReference;
    if (readGeometry) {
        // if (readGeometry.geometry.dynamic) {
        //     if (readGeometry.geometry.dynamic == "yes") {
        //         await convertDynamicToStatic(map, readGeometry)
        //         query.geometry = readGeometry.geometry
        //     }
        // } else {
        //     query.geometry = readGeometry.geometry
        // }

        query.geometry = readGeometry.geometry
    }
    if (geometryType) {
        query.geometryType = geometryType
    }
    if (where == "") {
        query.where = "1=1"
    } else {
        query.where = where
    }
    await featureService.queryFeatures(query).then(function (results) {
        res = results
    })
    return res
}