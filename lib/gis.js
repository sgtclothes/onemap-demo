// GIS Library

export class Map {
    constructor(centerPoint, mapType = 'topo-vector', container = 'mapDiv') {
        this.CenterPoint = centerPoint
        this.MapType = mapType
        this.Container = container
        this.AllLayers = {}
        this.Ground = {}
        this.Layers = {}
        this.Widgets = []
        this.WidgetObjects = []
    }

    render() {
        let map = new ESRI.Map({
            basemap: this.MapType
        });

        this.ObjMap = map

        let view = new ESRI.MapView({
            container: this.Container,
            map: map,
            center: this.CenterPoint,
            zoom: 5
        });
        this.ObjMapView = view

        for (let key in this.Widgets) {
            let widget = null
            if (key === 'print') {
                widget = new Print(this.ObjMapView, this.Widgets[key].printServiceUrl)
            }
            else if (key === 'directions') {
                widget = new Directions(this.ObjMapView, this.Widgets[key].routeServiceUrl)
            }
            else if (key === 'search') {
                widget = new Search(this.ObjMapView)
            }
            else if (key === 'home') {
                widget = new Home(this.ObjMapView)
            }
            else if (key === 'locate') {
                widget = new Locate(this.ObjMapView)
            }
            else if (key === 'basemapgallery') {
                widget = new BasemapGallery(this.ObjMapView, this.Widgets[key].source)
            }
            if (widget !== null) {
                this.WidgetObjects[key] = widget.create()
                this.addWidget(widget.create(), this.Widgets[key].position)
            }

        }
    }

    addWidget(widgetObj, position) {
        this.ObjMapView.ui.add(widgetObj, position)
    }

    removeWidget(widgetType) {
        // if(this.Widgets.find(function(value,index){return index===widgetType}) === undefined){
        //     return;
        // }
        if (widgetType === "print") {
            let printDomNode = document.querySelector('.esri-print');
            printDomNode.parentNode.parentNode.removeChild(printDomNode.parentNode);
        }
        else if (widgetType === "directions") {
            let directionsDomNode = document.querySelector('.esri-directions');
            directionsDomNode.parentNode.parentNode.removeChild(directionsDomNode.parentNode);
        }
        else {
            this.ObjMapView.ui.remove(this.WidgetObjects[widgetType])
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

    addDirectionsWidget(routeServiceUrl, position) {
        this.Widgets["directions"] = {
            routeServiceUrl: routeServiceUrl,
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

    addBasemapGalleryWidget(source, position) {
        this.Widgets["basemapgallery"] = {
            position: position,
            source: source
        }
    }

    setBasemap(mapType) {
        this.MapType = mapType
    }
}

export class SimpleLineSymbol {
    constructor(color, width, style) {
        this.Color = color
        this.Width = width
        this.Style = style
    }

    create() {
        return new ESRI.SimpleLineSymbol({
            color: this.Color,
            width: this.Width,
            style: this.Style
        })
    }
}

export class FillSymbol {
    constructor(color, colorOutline, width) {
        this.Color = color
        this.Width = width
        this.ColorOutline = colorOutline
        this.Width = width
    }

    create() {
        return new ESRI.SimpleLineSymbol({
            color: this.Color,
            outline: {
                color: this.ColorOutline,
                width: this.Width
            }
        })
    }
}

export class PictureMarkerSymbol {
    constructor(urlPictureMarkerSymbol, width, height) {
        this.UrlPictureMarkerSymbol = urlPictureMarkerSymbol
        this.Width = width
        this.Height = height
    }

    create() {
        return new ESRI.PictureMarkerSymbol({
            url: this.UrlPictureMarkerSymbol,
            width: this.Width,
            height: this.Height
        })
    }
}

export class SimpleMarkerSymbol {
    constructor(style, color, size, colorOutline, width) {
        this.Style = style
        this.Color = color
        this.Size = size
        this.colorOutline = colorOutline
        this.Width = width
    }

    create() {
        return new ESRI.SimpleMarkerSymbol({
            style: this.Style,
            color: this.Color,
            size: this.Size,
            outline: {
                color: this.colorOutline,
                width: this.Width
            }
        })
    }
}

export class Polygon {
    constructor(hasZ, hasM, rings, wkid) {
        this.HasZ = hasZ
        this.HasM = hasM
        this.Rings = rings
        this.Wkid = wkid
    }
    create() {
        return new ESRI.Polygon({
            hasZ: this.HasZ,
            hasM: this.HasM,
            rings: this.Rings,
            spatialReference: { wkid: this.Wkid }
        })
    }
}

export class PopupTemplate {
    constructor(title,content) {
        this.Title = title
        this.Content = content
    }

    create() {
        return new ESRI.PopupTemplate({
            title: this.Title,
            content: this.Content,
            actionsMenuEnabled: this.ActionsMenuEnabled
        })
    }

    setActionsMenuEnabled(actionsMenuEnabled) {
        this.ActionsMenuEnabled = actionsMenuEnabled
    }
}

export class FeatureLayer {
    constructor(urlFeatureLayer, map) {
        this.UrlFeatureLayer = urlFeatureLayer
        this.ObjMap = map
    }

    create() {
        let featureLayer = new ESRI.FeatureLayer({
            url: this.UrlFeatureLayer,
            source: this.Source,
            fields: this.Fields,
            renderer: this.RendererFeatureLayer,
            outFields: this.OutFields,
            popupTemplateFeatureLayer: this.PopupTemplateFeatureLayer
        });
        this.ObjMap.add(featureLayer)
    }

    setSource(source) {
        this.Source = source
    }

    setFields(fields) {
        this.Fields = fields
    }

    setRenderer(rendererFeatureLayer) {
        this.RendererFeatureLayer = rendererFeatureLayer
    }

    setOutFields(outFields) {
        this.OutFields = outFields
    }

    setPopupTemplateFeatureLayer(popupTemplateFeatureLayer) {
        this.PopupTemplateFeatureLayer = popupTemplateFeatureLayer
    }
}

export class SceneLayer {
    constructor(urlSceneLayer) {
        this.UrlSceneLayer = urlSceneLayer
    }

    create() {
        return new ESRI.SceneLayer({
            url: this.UrlSceneLayer,
            renderer: this.RendererSceneLayer
        })
    }

    setRenderer(rendererSceneLayer) {
        this.RendererSceneLayer = rendererSceneLayer
    }
}

export class CustomLayer {
    constructor(typeSym,symbol) {
        this.TypeSym=typeSym,
        this.Symbol=symbol
    }

    renderer() {
        return {
            type : this.TypeSym,
            symbol: this.Symbol,
            visualVariables : this.ColorVisVar
        }
    }

    setColorVisVar(type,field,normalizationField,stops) {
        this.Type=type
        this.Field=field
        this.NormalizationField=normalizationField
        this.Stops=stops
        return this.ColorVisVar = {
            type: this.Type,
            field: this.Field,
            normalizationField: this.NormalizationField,
            stops: this.Stops
        }
    }
}

export class Query {
    constructor(where, place, fields = ["*"], serviceUrl = "") {
        this.Where = where
        this.Place = place
        this.Fields = fields
        this.ServiceUrl = serviceUrl
        this.ReturnGeometry = true;
        this.WhereStr = ''
    }

    create() {
        return new ESRI.Query({
            where: this.WhereStr,
            outFields: this.Fields,
            returnGeometry: this.ReturnGeometry
        });
    }

    setPlace(place) {
        this.Place = place
    }

    setWhere(where) {
        this.Where = where
        this.WhereStr = "PROVINSI = '" + where + "' AND " + this.Place + ">0"
    }

    setFields(fields) {
        this.Fields = fields
    }

    setServiceUrl(serviceUrl) {
        this.ServiceUrl = serviceUrl
    }
}

export class Filter {
    constructor(query, mapView, simpleMarkerSymbol, popupTemplate) {
        this.Query = query
        this.ObjMapView = mapView
        this.SimpleMarkerSymbol = simpleMarkerSymbol
        this.PopupTemplate = popupTemplate
    }

    run() {
        let query = this.Query.create()
        // Define the query task
        let querytask = new ESRI.QueryTask({
            url: this.Query.ServiceUrl
        });
        let self = this
        querytask.execute(query)
            .then(function (result) {

                result.features.forEach(function (item) {
                    let g = new ESRI.Graphic({
                        geometry: item.geometry,
                        attributes: item.attributes,
                        symbol: self.SimpleMarkerSymbol.create(),
                        popupTemplate: self.PopupTemplate.create()
                    });
                    self.ObjMapView.graphics.add(g);

                });

                self.ObjMapView.goTo({
                    target: self.ObjMapView.graphics
                });

            })

            .otherwise(function (e) {
                console.log(e);
            });
    }

    remove() {
        this.ObjMapView.graphics.removeAll();
    }
}

export class Directions {
    constructor(mapView, routeServiceUrl) {
        this.ObjMapView = mapView
        this.RouteServiceUrl = routeServiceUrl
    }

    create() {
        return new ESRI.Directions({
            view: this.ObjMapView,
            routeServiceUrl: this.RouteServiceUrl,
        });
    }
}

export class Print {
    constructor(mapView, printServiceUrl) {
        this.ObjMapView = mapView
        this.PrintServiceUrl = printServiceUrl
    }

    create() {
        return new ESRI.Print({
            view: this.ObjMapView,
            printServiceUrl: this.PrintServiceUrl
        });
    }
}

export class Search {
    constructor(mapView) {
        this.ObjMapView = mapView
    }

    create() {
        return new ESRI.Search({
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