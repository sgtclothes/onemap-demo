var makeEsriRequest = async function (url, layersRequest) {
    let results = undefined
    if (layersRequest == undefined) {
        layersRequest = {
            query: {
                f: "json",
            },
            responseType: "json",
        };
    }
    await EsriRequest(
        url,
        layersRequest
    ).then(function (response) {
        results = response
    });
    return results
}

var makeEsriRequestPOST = async function (url, layersRequest) {
    let results = undefined
    if (layersRequest == undefined) {
        layersRequest = {
            query: {
                f: "json",
                geometries: '{"rings":[' + points + ']}',
                geometryType: "esriGeometryPolygon"
            },
            responseType: "json",
            usePost: true
        };
    }
    await EsriRequest(
        url,
        layersRequest
    ).then(function (response) {
        console.log(response)
        results = response
    });
    return results
}