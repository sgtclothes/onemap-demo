import * as Widgets from './widgets.js'
import * as Task from './task.js'
import * as Layout from './layout.js'

export default class MapClass {
    constructor(centerPoint, mapType = 'gray', container = 'mapDiv') {
        this.CenterPoint = centerPoint
        this.MapType = mapType
        this.Container = container
        this.AllLayers = {}
        this.Ground = {}
        this.Layers = []
        this.Widgets = []
        this.WidgetObjects = []
        this.LayerObjects = []
        this.ObjMap = {}
        this.ObjMapView = {}
        this.MeasurementActiveWidget = ""
    }

    loadMap() {

        let map = new ESRI.Map({
            basemap: this.MapType
        })

        this.ObjMap = map

        let view = new Layout.MapView(map, this.CenterPoint, this.Container, 5)
        let mapView = view.create()

        this.ObjMapView = mapView

        return mapView
    }

    render() {

        this.loadMap()

        for (let key in this.Widgets) {
            let widget = null
            if (key === 'home') {
                widget = new Widgets.Home(this.ObjMapView)
            }
            else if (key === 'directions') {
                widget = new Widgets.Directions(this.ObjMapView)
            }
            else if (key === 'search') {
                widget = new Task.Search(this.ObjMapView)
            }
            else if (key === 'print') {
                widget = new Widgets.ScreenPrintOut(this.ObjMapView, this.Widgets[key].printServiceUrl)
            }
            else if (key === 'locate') {
                widget = new Widgets.Locate(this.ObjMapView)
            }
            else if (key === 'basemapgallery') {
                widget = new Widgets.BasemapGallery(this.ObjMapView, this.Widgets[key].source)
            }
            else if (key === 'track') {
                widget = new Widgets.TrackingGeolocation(this.ObjMapView)
            }
            else if (key === 'measurement') {
                widget = new Widgets.Measurement(this.ObjMapView)
            }
            else if (key === 'legend') {
                widget = new Widgets.Legend(this.ObjMapView,
                    {
                        layer: this.LayerObjects["minimarket"],
                        title: "Legend"
                    }
                )
            }
            if (widget !== null) {

                if (key === 'measurement') {
                    this.WidgetObjects[key] = widget
                }
                else if (key === 'basemapgallery') {
                    this.WidgetObjects[key] = widget.create()
                    let bgExpand = new ESRI.Expand({
                        view: this.ObjMapView,
                        content: widget.create(),
                        collapseIconClass: "esri-icon-close"
                    });
                    this.addWidget(bgExpand, this.Widgets[key].position)
                }
                else if (key === 'print') {
                    this.WidgetObjects[key] = widget.create()
                    let bgExpand = new ESRI.Expand({
                        view: this.ObjMapView,
                        content: widget.create(),
                        collapseIconClass: "esri-icon-close"
                    });
                    this.addWidget(bgExpand, this.Widgets[key].position)
                }
                else if (key === 'search') {
                    this.WidgetObjects[key] = widget.create()
                    let bgExpand = new ESRI.Expand({
                        view: this.ObjMapView,
                        content: widget.create(),
                        collapseIconClass: "esri-icon-close"
                    });
                    this.addWidget(bgExpand, this.Widgets[key].position)
                }
                else if (key === 'directions') {
                    this.WidgetObjects[key] = widget.create()
                    let bgExpand = new ESRI.Expand({
                        view: this.ObjMapView,
                        content: widget.create(),
                        collapseIconClass: "esri-icon-close"
                    });
                    this.addWidget(bgExpand, this.Widgets[key].position)
                }
                else {
                    this.WidgetObjects[key] = widget.create()
                    this.addWidget(widget.create(), this.Widgets[key].position)
                }
            }

        }

        this.ObjMapView.when(function () {
            document.getElementsByClassName('esri-search__container')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-directions esri-widget esri-widget--panel esri-directions__scroller')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-legend esri-widget--panel esri-widget')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-track esri-widget--button esri-widget')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-print esri-widget esri-widget--panel')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-basemap-gallery esri-widget esri-widget--panel-height-only')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-home esri-widget--button esri-widget')[0].style.display = "none"
            document.getElementsByClassName('esri-component esri-locate esri-widget--button esri-widget')[0].style.display = "none"
        })

    }

    addWidget(widgetObj, position) {
        this.ObjMapView.ui.add(widgetObj, position)
    }

    removeWidget(widgetType) {

        if (widgetType === "search") {
            let searchDomNode = document.getElementsByClassName('esri-search__container')[0]
            searchDomNode.style.display = "none"
        }
        else if (widgetType === "directions") {
            let directionsDomNode = document.getElementsByClassName('esri-component esri-directions esri-widget esri-widget--panel esri-directions__scroller')[0]
            directionsDomNode.style.display = "none"
        }
        else if (widgetType === "legend") {
            let legendDomNode = document.getElementsByClassName('esri-component esri-legend esri-widget--panel esri-widget')[0]
            legendDomNode.style.display = "none"
        }
        else if (widgetType === "track") {
            let trackDomNode = document.getElementsByClassName('esri-component esri-track esri-widget--button esri-widget')[0]
            trackDomNode.style.display = "none"
        }

        else if (widgetType === "print") {
            let printDomNode = document.getElementsByClassName('esri-component esri-print esri-widget esri-widget--panel')[0]
            printDomNode.style.display = "none"
        }

        else if (widgetType === "basemapgallery") {
            let basemapgalleryDomNode = document.getElementsByClassName('esri-component esri-basemap-gallery esri-widget esri-widget--panel-height-only')[0]
            basemapgalleryDomNode.style.display = "none"
        }

        else if (widgetType === "home") {
            let homeDomNode = document.getElementsByClassName('esri-component esri-home esri-widget--button esri-widget')[0]
            homeDomNode.style.display = "none"
        }

        else if (widgetType === "locate") {
            let locateDomNode = document.getElementsByClassName('esri-component esri-locate esri-widget--button esri-widget')[0]
            locateDomNode.style.display = "none"
        }

        delete this.Widgets[widgetType];
        delete this.WidgetObjects[widgetType];
    }

    addPrintWidget(printServiceUrl, position) {
        this.Widgets["print"] = {
            printServiceUrl: printServiceUrl,
            position: position
        }
    }

    addDirectionsWidget(position) {
        this.Widgets["directions"] = {
            position: position
        }
    }

    addSearchWidget(position) {
        this.Widgets["search"] = {
            position: position
        }
    }

    addHomeWidget(position) {
        this.Widgets["home"] = {
            position: position
        }
    }

    addLocateWidget(position) {
        this.Widgets["locate"] = {
            position: position
        }
    }

    addLegendWidget(position) {
        this.Widgets["legend"] = {
            position: position
        }
    }

    addBasemapGalleryWidget(source, position) {
        this.Widgets["basemapgallery"] = {
            position: position,
            source: source
        }
    }

    addFeatureLayer(nameLayer, renderer, popuptemplate) {
        this.Layers[nameLayer] = {
            renderer: renderer,
            popuptemplate: popuptemplate
        }
    }

    addMeasurementWidget(position) {
        this.Widgets["measurement"] = {
            position: position
        }
    }

    addTrackingGeolocationWidget(position) {
        this.Widgets["track"] = {
            position: position
        }
    }

    setMeasurementActiveWidget(measurementactivewidget) {
        this.WidgetObjects["measurement"].setActiveWidget(measurementactivewidget)
    }

    setBasemap(mapType) {
        this.MapType = mapType
    }
}