function mapViewClick() {
    mapView.on("click", function (event) {
        var longitude = convertScreenToMap(event)["longitude"]
        var latitude = convertScreenToMap(event)["latitude"]
        var point = []
        //Console information
        console.log("Longitude : " + longitude, " Latitude : " + latitude)
        //Create Pointing
        if (event.button == 0) {
            resetContextMenu()
            setPointing(convertScreenToMap(event))
        } else if (event.button == 2) {
            resetContextMenu()
            createContextMenu(event, ["mark", "measurement", "draw"])
            changeModelContextMenu()
        }
    })
}

function convertScreenToMap(event) {

    var point = []

    var latitude = mapView.toMap({
        x: event.x,
        y: event.y
    }).latitude.toFixed(7);

    var longitude = mapView.toMap({
        x: event.x,
        y: event.y
    }).longitude.toFixed(7);

    point["latitude"] = latitude
    point["longitude"] = longitude

    return point
}