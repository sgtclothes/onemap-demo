async function getDistanceBetweenPoint(point1, point2) {
    var results = []
    var url = "https://gis.locatorlogic.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/distance"
    var layersRequest = {
        query: {
            f: "json",
            sr: "3857",
            geometry1: '{"geometryType":"esriGeometryPoint","geometry":{"x":' + point1.x + ',"y":' + point1.y + '}}',
            geometry2: '{"geometryType":"esriGeometryPoint","geometry":{"x":' + point2.x + ',"y":' + point2.y + '}}'
        },
        responseType: "json",
        usePost: true
    };
    await EsriRequest(
        url,
        layersRequest
    ).then(function (response) {
        console.log(response)
        // results.push([response.data.areas, response.data.lengths])
    });
    return results
}