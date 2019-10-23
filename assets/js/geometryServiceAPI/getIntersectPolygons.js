async function getIntersectPolygons(rings1, rings2) {
    var results = []
    var url = "https://gis.locatorlogic.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/intersect"
    var layersRequest = {
        query: {
            f: "json",
            sr: "4326",
            geometries: '{"geometryType":"esriGeometryPolygon","geometries":[{"rings":[' + rings1 + ']}]}',
            geometry: '{"geometryType":"esriGeometryPolygon","geometry":{"rings":[' + rings2 + ']}}'
        },
        responseType: "json",
        usePost: true
    };
    await EsriRequest(
        url,
        layersRequest
    ).then(function (response) {
        results.push(response.data.geometries[0].rings[0])
    });
    return results
}