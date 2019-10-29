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