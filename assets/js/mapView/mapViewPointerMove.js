var mapViewPointerMove = function (map, key) {
    if (key == true) {
        map.ObjMapView.on("pointer-move", function (event) {
            let latitude = map.ObjMapView.toMap({
                x: event.x,
                y: event.y
            }).latitude.toFixed(2)
            let longitude = map.ObjMapView.toMap({
                x: event.x,
                y: event.y
            }).longitude.toFixed(2)
            console.log(latitude, longitude)
        })
    }
}