export class LivePointing {
    constructor(map, mapView, latitude, longitude) {
        this.Map = map
        this.MapView = mapView;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.PosLatitude = null;
        this.PosLongitude = null;
        this.MarkerSymbol = null;
    }

    setPictureMarker() {
        let markerSymbol = {
            type: "picture-marker",
            url: "assets/images/icons/map-marker.png",
            width: "24px",
            height: "24px"
        };
        this.MarkerSymbol = markerSymbol;
    }

    setPointingPopupMarker() {
        let markerSymbol = {
            type: "simple-marker",
            style: "circle",
            size: "17px",
            outline: {
                color: "#6496e8",
                width: 3
            }
        };
        this.MarkerSymbol = markerSymbol;
    }

    render() {
        let point = new ESRI.Point({
            longitude: this.Longitude,
            latitude: this.Latitude
        });

        let id = this.Latitude.toString() + this.Longitude.toString();
        let pointGraphic = new ESRI.Graphic({
            geometry: point,
            symbol: this.MarkerSymbol,
            attributes: "livePointing",
            obj: {
                id: id
            }
        });
        let graphicsLayer = new ESRI.GraphicsLayer({
            id: "pointer"
        })
        graphicsLayer.add(pointGraphic)
        this.Map.add(graphicsLayer);
    }
}