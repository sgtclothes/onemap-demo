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