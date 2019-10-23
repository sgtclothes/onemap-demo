async function getAreaAndLengthPolygons(rings) {
    var results = []
    var url = "https://gis.locatorlogic.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/areasAndLengths"
    var layersRequest = {
        query: {
            f: "json",
            sr: "3857",
            areaUnit: '{"areaUnit":"esriSquareMeters"}',
            polygons: '[{"rings":[' + rings + ']}]'
        },
        responseType: "json",
        usePost: true
    };
    await EsriRequest(
        url,
        layersRequest
    ).then(function (response) {
        console.log(response)
        results.push([response.data.areas, response.data.lengths])
    });
    return results
}