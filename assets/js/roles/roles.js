var getRoles = async function () {
    var res = []
    var layersRequest = {
        query: {
            f: "json",
            where: "1=1",
            outFields: "name",
            token: token
        },
        responseType: "json",
        usePost: true
    };
    await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/5/query", layersRequest).then(function (results) {
        for (let i = 0; i < results.data.features.length; i++) {
            res.push(results.data.features[i].attributes.name)
        }
    })
    return res
}