import * as GIS from "./namespaces.js";

require([
  "esri/identity/IdentityManager",
  "esri/layers/support/LabelClass",
  "esri/geometry/projection",
  "esri/geometry/SpatialReference",
  "esri/config",
  "esri/core/urlUtils",
  "esri/layers/CSVLayer",
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/support/Query",
  "esri/tasks/QueryTask",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/SceneLayer",
  "esri/layers/GroupLayer",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/FillSymbol",
  "esri/geometry/Polygon",
  "esri/geometry/Point",
  "esri/geometry/Multipoint",
  "esri/geometry/Polyline",
  "esri/geometry/geometryEngine",
  "esri/layers/MapImageLayer",
  "esri/layers/ImageryLayer",
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
  "esri/views/draw/Draw",
  "esri/widgets/Sketch",
  "esri/widgets/DistanceMeasurement2D/DistanceMeasurement2DViewModel",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/tasks/IdentifyTask",
  "esri/tasks/support/IdentifyParameters",
  "esri/tasks/RouteTask",
  "esri/tasks/support/RouteParameters",
  "esri/tasks/support/LinearUnit",
  "esri/tasks/Geoprocessor",
  "esri/geometry/support/webMercatorUtils",
  "esri/geometry/support/jsonUtils",
  "esri/core/watchUtils",
  "dijit/Menu",
  "dijit/MenuItem",
  "dijit/MenuSeparator",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/json",
  "dojo/parser",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojox/data/CsvStore",
  "dojox/encoding/base64",
  "dojo/domReady!"
], function (
  IdentityManager,
  LabelClass,
  Projection,
  SpatialReference,
  config,
  urlUtils,
  CSVLayer,
  Map,
  MapView,
  Query,
  QueryTask,
  Graphic,
  GraphicsLayer,
  FeatureLayer,
  SceneLayer,
  GroupLayer,
  SimpleLineSymbol,
  SimpleFillSymbol,
  FillSymbol,
  Polygon,
  Point,
  Multipoint,
  Polyline,
  geometryEngine,
  MapImageLayer,
  ImageryLayer,
  TextSymbol,
  PictureMarkerSymbol,
  SimpleMarkerSymbol,
  PopupTemplate,
  Directions,
  Print,
  Search,
  Home,
  Locate,
  BasemapGallery,
  Legend,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  Circle,
  SimpleRenderer,
  ServiceAreaTask,
  ServiceAreaParameters,
  FeatureSet,
  Track,
  Expand,
  Locator,
  EsriRequest,
  Draw,
  Sketch,
  DistanceMeasurement2DViewModel,
  SketchViewModel,
  IdentifyTask,
  IdentifyParameters,
  RouteTask,
  RouteParameters,
  LinearUnit,
  Geoprocessor,
  webMercatorUtils,
  geometryJsonUtils,
  watchUtils,
  Menu,
  MenuItem,
  MenuSeparator,
  dom,
  domConstruct,
  on,
  JSON,
  parser,
  arrayUtils,
  lang,
  CsvStore,
  base64
) {
  load(
    IdentityManager,
    LabelClass,
    Projection,
    SpatialReference,
    config,
    urlUtils,
    CSVLayer,
    Map,
    MapView,
    Query,
    QueryTask,
    Graphic,
    GraphicsLayer,
    FeatureLayer,
    SceneLayer,
    GroupLayer,
    SimpleLineSymbol,
    SimpleFillSymbol,
    FillSymbol,
    Polygon,
    Point,
    Multipoint,
    Polyline,
    geometryEngine,
    MapImageLayer,
    ImageryLayer,
    TextSymbol,
    PictureMarkerSymbol,
    SimpleMarkerSymbol,
    PopupTemplate,
    Directions,
    Print,
    Search,
    Home,
    Locate,
    BasemapGallery,
    Legend,
    DistanceMeasurement2D,
    AreaMeasurement2D,
    Circle,
    SimpleRenderer,
    ServiceAreaTask,
    ServiceAreaParameters,
    FeatureSet,
    Track,
    Expand,
    Locator,
    EsriRequest,
    Draw,
    Sketch,
    DistanceMeasurement2DViewModel,
    SketchViewModel,
    IdentifyTask,
    IdentifyParameters,
    RouteTask,
    RouteParameters,
    LinearUnit,
    Geoprocessor,
    webMercatorUtils,
    geometryJsonUtils,
    watchUtils,
    Menu,
    MenuItem,
    MenuSeparator,
    dom,
    domConstruct,
    on,
    JSON,
    parser,
    arrayUtils,
    lang,
    CsvStore,
    base64
  );
});

function load(
  IdentityManager,
  LabelClass,
  Projection,
  SpatialReference,
  config,
  urlUtils,
  CSVLayer,
  Map,
  MapView,
  Query,
  QueryTask,
  Graphic,
  GraphicsLayer,
  FeatureLayer,
  SceneLayer,
  GroupLayer,
  SimpleLineSymbol,
  SimpleFillSymbol,
  FillSymbol,
  Polygon,
  Point,
  Multipoint,
  Polyline,
  geometryEngine,
  MapImageLayer,
  ImageryLayer,
  TextSymbol,
  PictureMarkerSymbol,
  SimpleMarkerSymbol,
  PopupTemplate,
  Directions,
  Print,
  Search,
  Home,
  Locate,
  BasemapGallery,
  Legend,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  Circle,
  SimpleRenderer,
  ServiceAreaTask,
  ServiceAreaParameters,
  FeatureSet,
  Track,
  Expand,
  Locator,
  EsriRequest,
  Draw,
  Sketch,
  DistanceMeasurement2DViewModel,
  SketchViewModel,
  IdentifyTask,
  IdentifyParameters,
  RouteTask,
  RouteParameters,
  LinearUnit,
  Geoprocessor,
  webMercatorUtils,
  geometryJsonUtils,
  watchUtils,
  Menu,
  MenuItem,
  MenuSeparator,
  dom,
  domConstruct,
  on,
  JSON,
  parser,
  arrayUtils,
  lang,
  CsvStore,
  base64
) {
  window.ESRI = {};
  window.IdentityManager = IdentityManager;
  window.ESRI.LabelClass = LabelClass;
  window.Projection = Projection;
  window.ESRI.SpatialReference = SpatialReference;
  window.ESRI.config = config;
  window.ESRI.urlUtils = urlUtils;
  window.ESRI.CSVLayer = CSVLayer;
  window.ESRI.Map = Map;
  window.ESRI.MapView = MapView;
  window.ESRI.Query = Query;
  window.ESRI.QueryTask = QueryTask;
  window.ESRI.Graphic = Graphic;
  window.ESRI.GraphicsLayer = GraphicsLayer;
  window.ESRI.FeatureLayer = FeatureLayer;
  window.ESRI.SceneLayer = SceneLayer;
  window.ESRI.GroupLayer = GroupLayer;
  window.ESRI.SimpleLineSymbol = SimpleLineSymbol;
  window.ESRI.SimpleFillSymbol = SimpleFillSymbol;
  window.ESRI.FillSymbol = FillSymbol;
  window.ESRI.Polygon = Polygon;
  window.ESRI.Point = Point;
  window.ESRI.Multipoint = Multipoint;
  window.ESRI.Polyline = Polyline;
  window.ESRI.geometryEngine = geometryEngine;
  window.ESRI.MapImageLayer = MapImageLayer;
  window.ESRI.ImageryLayer = ImageryLayer;
  window.ESRI.TextSymbol = TextSymbol;
  window.ESRI.PictureMarkerSymbol = PictureMarkerSymbol;
  window.ESRI.SimpleMarkerSymbol = SimpleMarkerSymbol;
  window.ESRI.Directions = Directions;
  window.ESRI.PopupTemplate = PopupTemplate;
  window.ESRI.Print = Print;
  window.ESRI.Search = Search;
  window.ESRI.Home = Home;
  window.ESRI.Locate = Locate;
  window.ESRI.BasemapGallery = BasemapGallery;
  window.ESRI.Legend = Legend;
  window.ESRI.AreaMeasurement2D = AreaMeasurement2D;
  window.ESRI.DistanceMeasurement2D = DistanceMeasurement2D;
  window.ESRI.Circle = Circle;
  window.ESRI.SimpleRenderer = SimpleRenderer;
  window.ESRI.ServiceAreaTask = ServiceAreaTask;
  window.ESRI.ServiceAreaParameters = ServiceAreaParameters;
  window.ESRI.FeatureSet = FeatureSet;
  window.ESRI.Track = Track;
  window.ESRI.Expand = Expand;
  window.ESRI.Locator = Locator;
  window.EsriRequest = EsriRequest;
  window.ESRI.Draw = Draw;
  window.ESRI.Sketch = Sketch;
  window.ESRI.DistanceMeasurement2DViewModel = DistanceMeasurement2DViewModel
  window.ESRI.SketchViewModel = SketchViewModel;
  window.ESRI.IdentifyTask = IdentifyTask;
  window.ESRI.IdentifyParameters = IdentifyParameters;
  window.ESRI.RouteTask = RouteTask;
  window.ESRI.RouteParameters = RouteParameters;
  window.ESRI.LinearUnit = LinearUnit;
  window.ESRI.Geoprocessor = Geoprocessor;
  window.ESRI.webMercatorUtils = webMercatorUtils;
  window.ESRI.geometryJsonUtils = geometryJsonUtils;
  window.ESRI.watchUtils = watchUtils;
  window.Menu = Menu;
  window.MenuItem = MenuItem;
  window.MenuSeparator = MenuSeparator;
  window.dom = dom;
  window.domConstruct = domConstruct;
  window.on = on;
  window.JSON = JSON;
  window.parser = parser;
  window.arrayUtils = arrayUtils;
  window.lang = lang;
  window.CsvStore = CsvStore;
  window.base64 = base64;
  if (typeof boot === 'function') {
    boot(GIS);
  }
  if (typeof loginBoot === 'function') {
    loginBoot(GIS);
  }
}
