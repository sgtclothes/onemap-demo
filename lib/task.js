export class Search {
  constructor(mapView) {
    this.ObjMapView = mapView;
  }

  create() {
    return new ESRI.Search({
      view: this.ObjMapView
    });
  }
}

export class Route {
  constructor(mapView, routeTaskUrl) {
    this.RouteTaskUrl = routeTaskUrl;
    this.MapView = mapView;
  }

  createRouteTask() {
    let routeTask = new ESRI.RouteTask({
      url: this.RouteTaskUrl
    });

    return routeTask;
  }

  create() {
    const self = this;
    this.MapView.on("click", function(event) {
      if (self.MapView.graphics.length === 0) {
        self.addGraphic("start", event.mapPoint);
      } else if (self.MapView.graphics.length === 1) {
        self.addGraphic("finish", event.mapPoint);
        // Call the route service
        self.getRoute();
      } else {
        self.MapView.graphics.removeAll();
        self.addGraphic("start", event.mapPoint);
      }
    });
  }

  addGraphic(type, point) {
    var graphic = new ESRI.Graphic({
      symbol: {
        type: "simple-marker",
        color: type === "start" ? "white" : "black",
        size: "8px"
      },
      geometry: point
    });
    this.MapView.graphics.add(graphic);
  }

  getRoute() {
    // Setup the route parameters
    const self = this;
    let routeParams = new ESRI.RouteParameters({
      stops: new ESRI.FeatureSet({
        features: this.MapView.graphics.toArray()
      }),
      returnDirections: true
    });
    // Get the route
    this.createRouteTask()
      .solve(routeParams)
      .then(function(data) {
        data.routeResults.forEach(function(result) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
          };
          self.MapView.graphics.add(result.route);
        });
      });
  }
}

export class GeoProcessing {
  constructor() {
    this.Construct = "this is geoprocessing";
  }

  create() {
    return this.Construct;
  }
}

export class Query {
  constructor(place, outFields = ["*"], serviceUrl = "") {
      this.Place = place
      this.OutFields = outFields
      this.ServiceUrl = serviceUrl
      this.ReturnGeometry = true;
      this.WhereStr = ''
      this.Field = ''
      this.OperatorOneStr = ''
      this.OperatorTwoStr = ''
  }

  create() {
      return new ESRI.Query({
          where: this.WhereStr,
          outFields: this.OutFields,
          returnGeometry: this.ReturnGeometry
      });
  }

  setField(field) {
      this.Field = field
  }

  setPlace(place) {
      this.Place = place
  }

  setOperatorOne(operatorOne, value, valueTwo) {
      this.OperatorOne = operatorOne
      this.Value = value
      this.ValueTwo = valueTwo
      if (this.OperatorOne==="LIKE") {
          this.OperatorOneStr = this.OperatorOne + " '%" + this.Value + " %'"
      } 
      else if (this.OperatorOne==="OR") {
          this.OperatorOneStr = "= '" + this.Value + "' " + this.OperatorOne + " " + this.Field + " = '" + this.ValueTwo + "'"
      }
      else {
          this.OperatorOneStr = this.OperatorOne + " '" + this.Value + "'"
      }
  }

  setOperatorTwo(operatorTwo, value) {
      this.OperatorTwo = operatorTwo
      this.Value = value
      this.OperatorTwoStr = this.OperatorTwo + " " + this.Value
  }

  setWhereStr() {
      this.WhereStr = this.Field + " " + this.OperatorOneStr + " AND " + this.Place + " " + this.OperatorTwoStr
  }

  setOutFields(outFields) {
      this.OutFields = outFields
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