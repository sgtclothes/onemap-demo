var convertScreenPoint = function (response, map) {
    let latitude = map.ObjMapView.toMap({
        x: response.screenPoint.x,
        y: response.screenPoint.y
    }).latitude.toFixed(7);
    let longitude = map.ObjMapView.toMap({
        x: response.screenPoint.x,
        y: response.screenPoint.y
    }).longitude.toFixed(7);
    return [longitude, latitude]
}