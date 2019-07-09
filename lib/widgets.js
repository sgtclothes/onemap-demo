export class Measurement {
    constructor(mapView) {
        this.MapView = mapView
        this.ActiveWidget = {}
        this.Elements = undefined
    }

    setActiveWidget(type) {
        let mapView = this.MapView
        switch (type) {
            case "distance":
                this.ActiveWidget = null;
                this.ActiveWidget = new ESRI.DistanceMeasurement2D({
                    view: this.MapView
                })
                this.ActiveWidget.viewModel.newMeasurement()
                this.MapView.ui.add(this.ActiveWidget, "bottom-left")
                this.MapView.focus();
                this.Elements = document.getElementsByClassName("active")
                for (let i = 0; i < this.Elements.length; i++) {
                    this.Elements[i].classList.remove("active");
                }
                if (document.getElementById("distanceButton")) {
                    document.getElementById("distanceButton").classList.add("active");
                }
                break;
            case "area":
                this.ActiveWidget = null;
                this.ActiveWidget = new ESRI.AreaMeasurement2D({
                    view: this.MapView
                })
                this.ActiveWidget.viewModel.newMeasurement()
                this.MapView.ui.add(this.ActiveWidget, "bottom-left")
                this.MapView.focus();
                this.Elements = document.getElementsByClassName("active")
                for (let i = 0; i < this.Elements.length; i++) {
                    this.Elements[i].classList.remove("active");
                }
                if (document.getElementById("areaButton")) {
                    document.getElementById("areaButton").classList.add("active");
                }
                break;
            case "radius":
                this.ActiveWidget = null;
                let graphicsArray = []
                let circleSymb = new ESRI.SimpleFillSymbol({
                    style: "solid",
                    outline: {
                        style: "solid",
                        color: "red",
                        width: 2
                    },
                    color: [255, 0, 0, 0.1]
                })

                mapView.on("click", function (evt) {
                    var point = new ESRI.Point(evt.mapPoint.longitude, evt.mapPoint.latitude)
                    var pointSymbol = new ESRI.SimpleMarkerSymbol();
                    var pointGraphic = new ESRI.Graphic(point, pointSymbol)
                    graphicsArray.push(pointGraphic)

                    let circle = new ESRI.Circle({
                        center: evt.mapPoint,
                        geodesic: true,
                        radius: 100,
                        radiusUnit: "kilometers"
                    })

                    mapView.graphics.removeAll()
                    let circleGraphic = new ESRI.Graphic(circle, circleSymb)
                    graphicsArray.push(circleGraphic)

                    let line = new ESRI.Polyline({
                        paths: [[[circle.center.x, circle.center.y], circle.rings[0][45]]]
                    })
                    let lineSymbol = new ESRI.SimpleLineSymbol()
                    let lineGraphic = new ESRI.Graphic(line, lineSymbol)
                    graphicsArray.push(lineGraphic)

                    let textPoint = new ESRI.Point((circle.rings[0][45][0] + circle.center.x) / 2, (circle.rings[0][45][1] + circle.center.y) / 2);

                    let textSymbol = new ESRI.TextSymbol("Radius: " + circle.radius + " Miles");
                    let textPointGraphic = new ESRI.Graphic(textPoint, textSymbol);
                    mapView.graphics.add(textPointGraphic)
                    graphicsArray.push(textPointGraphic)

                    for (let i = 0; i < graphicsArray.length; ++i) {
                        mapView.graphics.add(graphicsArray[i])
                    }
                    mapView.goTo({
                        target: evt.mapPoint,
                        zoom: 8
                    })
                })

                this.Elements = document.getElementsByClassName("active")
                for (let i = 0; i < this.Elements.length; i++) {
                    this.Elements[i].classList.remove("active");
                }
                if (document.getElementById("radiusButton")) {
                    document.getElementById("radiusButton").classList.add("active");
                }

                break;
            case null:
                if (this.ActiveWidget) {
                    this.MapView.ui.remove(this.ActiveWidget);
                    this.ActiveWidget = null;
                }
                break;
        }
    }

}

export class Directions {
    constructor(mapView) {
        this.RouteServiceUrl = {}
        this.ObjMapView = mapView
    }

    create() {
        return new ESRI.Directions({
            view: this.ObjMapView
        })
    }
}

export class TrackingGeolocation {
    constructor(mapView) {
        this.MapView = mapView
    }

    create() {
        return new ESRI.Track({
            view: this.MapView,
        })
    }
}

export class Legend {
    constructor(mapView, layer) {
        this.MapView = mapView
        this.LayerInfos = layer
    }

    create() {
        return new ESRI.Legend({
            view: this.MapView,
            layerInfos: this.LayerInfos,
            style: this.Style,
            layout: this.Layout
        })
    }

    setStyle(style, layout) {
        this.Style = style
        this.Layout = layout
    }
}

export class ScreenPrintOut {

    constructor(mapView, printServiceUrl) {
        this.ObjMapView = mapView
        this.PrintServiceUrl = printServiceUrl
    }

    create() {
        return new ESRI.Print({
            view: this.ObjMapView,
            printServiceUrl: this.PrintServiceUrl
        })
    }
}

export class BasemapGallery {
    constructor(mapView, source) {
        this.ObjMapView = mapView
        this.Source = source
    }

    create() {
        return new ESRI.BasemapGallery({
            view: this.ObjMapView,
            source: this.Source
        })
    }
}

export class Home {
    constructor(mapView) {
        this.ObjMapView = mapView
    }

    create() {
        return new ESRI.Home({
            view: this.ObjMapView
        })
    }
}

export class Locate {
    constructor(mapView) {
        this.ObjMapView = mapView
    }

    create() {
        return new ESRI.Locate({
            view: this.ObjMapView
        })
    }
}

export class Toolbar {
    constructor() {
        this.Construct = "this is toolbar"
    }

    create() {
        return this.Construct
    }
}