export default class Coords {
    constructor(mapView) {
        this.MapView = mapView
        this.Latitude = ""
        this.Longitude = ""
    }

    getLatLong() {
        let self = this
        self.MapView.on(["pointer-down", "pointer-move"], function (event) {
            latitude = self.MapView.toMap({
                x: event.x,
                y: event.y
            }).latitude.toFixed(3)
            longitude = self.MapView.toMap({
                x: event.x,
                y: event.y
            }).longitude.toFixed(3)
        })
    }

    setLatLong(latitude, longitude) {
        this.Latitude = latitude
        this.Longitude = longitude
    }

    getLatLongOnClick() {
        let self = this
        self.MapView.on("click", function (event) {
            latitude = self.MapView.toMap({
                x: event.x,
                y: event.y
            }).latitude.toFixed(3)
            longitude = self.MapView.toMap({
                x: event.x,
                y: event.y
            }).longitude.toFixed(3)
        })
    }


}