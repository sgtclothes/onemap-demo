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
    }).catch(function (err) {
        if (err) {
            Swal.fire(
                'Error',
                'Request not found!',
                'error'
            )
        }
    })
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
        results = response
    });
    return results
}