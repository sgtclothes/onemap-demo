async function getProjectionPoint(points, inSR, outSR) {
    var projectedPoints = []
    var url = "https://gis.locatorlogic.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project"
    var layersRequest = {
        query: {
            f: "json",
            inSR: inSR,
            outSR: outSR,
            geometries: '{"geometryType":"esriGeometryPolygon","geometries":[{"rings":[' + points + ']}]}'
        },
        responseType: "json",
        usePost: true
    };
    await EsriRequest(
        url,
        layersRequest
    ).then(function (response) {
        for (let i = 0; i < response.data.geometries[0].rings[0].length; i++) {
            projectedPoints.push(response.data.geometries[0].rings[0][i])
        }
    });
    return projectedPoints
}