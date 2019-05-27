import * as GIS from './namespaces.js'

require([
    "esri/config",
    "esri/core/urlUtils",
    "esri/Map",
    "esri/views/MapView",
    "esri/tasks/support/Query",
    "esri/tasks/QueryTask",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/SceneLayer",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/FillSymbol",
    "esri/geometry/Polygon",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/symbols/TextSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/PopupTemplate",
    "esri/widgets/Directions",
    "esri/widgets/Print",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/widgets/Locate",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Legend",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/AreaMeasurement2D",
    "esri/geometry/Circle",
    "esri/renderers/SimpleRenderer",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/support/ServiceAreaParameters",
    "esri/tasks/support/FeatureSet",
    "esri/widgets/Track",
    "esri/widgets/Expand",
    "esri/tasks/Locator",
    "esri/request",
    "esri/tasks/IdentifyTask",
    "esri/tasks/support/IdentifyParameters",
    "esri/tasks/RouteTask",
    "esri/tasks/support/RouteParameters",
    "esri/tasks/support/LinearUnit",
    "esri/tasks/Geoprocessor",
    "dojo/domReady!"
], function (config, urlUtils, Map, MapView, Query, QueryTask, Graphic, GraphicsLayer, FeatureLayer, SceneLayer, SimpleLineSymbol, SimpleFillSymbol, FillSymbol, Polygon, Point, Polyline, TextSymbol, PictureMarkerSymbol, SimpleMarkerSymbol, PopupTemplate, Directions, Print, Search, Home, Locate, BasemapGallery, Legend, DistanceMeasurement2D, AreaMeasurement2D, Circle, SimpleRenderer, ServiceAreaTask, ServiceAreaParameters, FeatureSet, Track, Expand, Locator, EsriRequest, IdentifyTask, IdentifyParameters, RouteTask, RouteParameters, LinearUnit, Geoprocessor) {
    load(config, urlUtils, Map, MapView, Query, QueryTask, Graphic, GraphicsLayer, FeatureLayer, SceneLayer, SimpleLineSymbol, SimpleFillSymbol, FillSymbol, Polygon, Point, Polyline, TextSymbol, PictureMarkerSymbol, SimpleMarkerSymbol, PopupTemplate, Directions, Print, Search, Home, Locate, BasemapGallery, Legend, DistanceMeasurement2D, AreaMeasurement2D, Circle, SimpleRenderer, ServiceAreaTask, ServiceAreaParameters, FeatureSet, Track, Expand, Locator, EsriRequest, IdentifyTask, IdentifyParameters, RouteTask, RouteParameters, LinearUnit, Geoprocessor)

});

function load(config, urlUtils,Map, MapView, Query, QueryTask, Graphic, GraphicsLayer, FeatureLayer, SceneLayer, SimpleLineSymbol, SimpleFillSymbol, FillSymbol, Polygon, Point, Polyline, TextSymbol, PictureMarkerSymbol, SimpleMarkerSymbol, PopupTemplate, Directions, Print, Search, Home, Locate, BasemapGallery, Legend, DistanceMeasurement2D, AreaMeasurement2D, Circle, SimpleRenderer, ServiceAreaTask, ServiceAreaParameters, FeatureSet, Track, Expand, Locator, EsriRequest, IdentifyTask, IdentifyParameters, RouteTask, RouteParameters, LinearUnit, Geoprocessor) {
    window.ESRI = {};
    window.ESRI.config = config
    window.ESRI.urlUtils = urlUtils
    window.ESRI.Map = Map
    window.ESRI.MapView = MapView
    window.ESRI.Query = Query
    window.ESRI.QueryTask = QueryTask
    window.ESRI.Graphic = Graphic
    window.ESRI.GraphicsLayer = GraphicsLayer
    window.ESRI.FeatureLayer = FeatureLayer
    window.ESRI.SceneLayer = SceneLayer
    window.ESRI.SimpleLineSymbol = SimpleLineSymbol
    window.ESRI.SimpleFillSymbol = SimpleFillSymbol
    window.ESRI.FillSymbol = FillSymbol
    window.ESRI.Polygon = Polygon
    window.ESRI.Point = Point
    window.ESRI.Polyline = Polyline
    window.ESRI.TextSymbol = TextSymbol
    window.ESRI.PictureMarkerSymbol = PictureMarkerSymbol
    window.ESRI.SimpleMarkerSymbol = SimpleMarkerSymbol
    window.ESRI.Directions = Directions
    window.ESRI.PopupTemplate = PopupTemplate
    window.ESRI.Print = Print
    window.ESRI.Search = Search
    window.ESRI.Home = Home
    window.ESRI.Locate = Locate
    window.ESRI.BasemapGallery = BasemapGallery
    window.ESRI.Legend = Legend
    window.ESRI.AreaMeasurement2D = AreaMeasurement2D
    window.ESRI.DistanceMeasurement2D = DistanceMeasurement2D
    window.ESRI.Circle = Circle
    window.ESRI.SimpleRenderer = SimpleRenderer
    window.ESRI.ServiceAreaTask = ServiceAreaTask
    window.ESRI.ServiceAreaParameters = ServiceAreaParameters
    window.ESRI.FeatureSet = FeatureSet
    window.ESRI.Track = Track
    window.ESRI.Expand = Expand
    window.ESRI.Locator = Locator
    window.ESRI.EsriRequest = EsriRequest
    window.ESRI.IdentifyTask = IdentifyTask
    window.ESRI.IdentifyParameters = IdentifyParameters
    window.ESRI.RouteTask = RouteTask
    window.ESRI.RouteParameters = RouteParameters
    window.ESRI.LinearUnit = LinearUnit
    window.ESRI.Geoprocessor = Geoprocessor
    boot(GIS)
}
