var getAreaAndLengthPolygons = async function (rings) {
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

var getDistanceBetweenPoint = async function (point1, point2) {
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
        results.push(response)
    });
    return results
}

var getIntersectPolygons = async function (rings1, rings2) {
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

var getProjectionPoint = async function (points, inSR, outSR) {
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
