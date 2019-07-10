export class MapView {
    constructor(map, centerPoint, container, zoom) {
        this.CenterPoint = centerPoint
        this.Map = map
        this.Container = container
        this.Zoom = zoom
    }

    create() {

        let view = new ESRI.MapView({
            container: this.Container,
            center: this.CenterPoint,
            map: this.Map,
            zoom: this.Zoom,
            highlightOptions: {
                color: '#ff5000'
            }
        })

        return view
    }
}

export class InfoWindow {
    constructor(mapView, featureLayer) {
        this.MapView = mapView
        this.FeatureLayer = featureLayer
    }

    render() {
        let self = this
        this.MapView.on("click", function (event) {
            let screenPoint = {
                x: event.x,
                y: event.y
            }
            // Search for graphics at the clicked location
            self.MapView.hitTest(screenPoint).then(function (response) {
                if (response.results.length) {
                    var graphic = response.results.filter(function (result) {
                        // check if the graphic belongs to the layer of interest
                        return result.graphic.layer === self.FeatureLayer;
                    })[0].graphic

                    let attr = graphic.attributes
                    let ID_PROV = attr.ID_PROV
                    let MINIMARKET = attr.MINIMARKET
                    let OBJECTID = attr.OBJECTID
                    let PROVINSI = attr.PROVINSI
                    let Shape_Area = attr.Shape_Area
                    let Shape_Length = attr.Shape_Length

                    let info_id = document.getElementsByClassName("id_prov")[0]
                    info_id.innerHTML = JSON.stringify("ID_PROV : " + ID_PROV + " MINIMARKET : " + MINIMARKET + " OBJECTID : " + OBJECTID + " PROVINSI : " + PROVINSI + " Shape Area : " + Shape_Area + " Shape Length : " + Shape_Length)
                    // do something with the result graphic
                    console.log(attr)
                }
            })

            let infoWindow = document.getElementById("info-window")
            self.MapView.ui.add(infoWindow, "top-right")

        })
    }
}

export class ContentTemplate {
    constructor() {
        this.Construct = "this is content template"
    }

    create() {
        return this.Construct
    }
}