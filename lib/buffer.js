export class Radius {
  constructor(map, mapView, pointsym, polysym) {
    this.Map = map;
    this.MapView = mapView;
    this.BufferLayer = new ESRI.GraphicsLayer();
    this.PointLayer = new ESRI.GraphicsLayer();
    this.PointSym = pointsym;
    this.PolySym = polysym;
    this.BufferEnabled = true;
    this.Latitude = 0;
    this.Longitude = 0;
    this.Radius = [];
    this.RadiusUnit = "";
    this.Results = [];
    this.FeatureLayer = new ESRI.FeatureLayer(
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/120"
    );
  }

  create() {
    let self = this;

    self.MapView.on("click", function(event) {
      if (self.BufferEnabled) {
        self.BufferEnabled = !self.BufferEnabled;
        self.Latitude = self.MapView.toMap({
          x: event.x,
          y: event.y
        }).latitude.toFixed(3);

        self.Longitude = self.MapView.toMap({
          x: event.x,
          y: event.y
        }).longitude.toFixed(3);

        let point = new ESRI.Point({
          longitude: self.Longitude,
          latitude: self.Latitude
        });

        let markerSymbol = new ESRI.SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 0.5
          }
        });

        let pointGraphic = new ESRI.Graphic({
          geometry: point,
          symbol: markerSymbol
        });

        document.getElementById("info").style.display = "none";

        for (let key in self.Radius) {
          let circle = new ESRI.Circle({
            center: [self.Longitude, self.Latitude],
            geodesic: true,
            radius: self.Radius[key],
            radiusUnit: self.RadiusUnit
          });

          let circleSymb = new ESRI.SimpleFillSymbol({
            style: "solid",
            outline: {
              style: "solid",
              color: [
                Math.floor(Math.random() * 255 + 1),
                Math.floor(Math.random() * 255 + 1),
                Math.floor(Math.random() * 255 + 1)
              ],
              width: 0.5
            },
            color: [Math.floor(Math.random() * 255 + 1), 0, 0, 0.1]
          });

          let circleGraphic = new ESRI.Graphic(circle, circleSymb);

          self.MapView.graphics.add(circleGraphic);

          let query = new ESRI.Query();
          query.returnGeometry = true;
          query.geometry = circle;
          query.outFields = ["*"];

          self.FeatureLayer.queryFeatures(query).then(function(results) {
            self.Results.push(results.features);
            for (let keys in results.features)
              self.Results[key].push(results.features[keys].attributes);
          });
        }

        self.MapView.graphics.add(pointGraphic);
      } else return;
    });
    // this.Map.addMany([bufferLayer, pointLayer])
  }

  setUnit(unit) {
    this.RadiusUnit = unit;
  }

  setRadius(radius) {
    this.Radius = [];
    this.Radius = radius;
  }
}

// export class DriveTime {
//   constructor(mapView) {
//     this.MapView = mapView;
//     this.UrlServiceArea = "";
//     this.Latitude = "";
//     this.Longitude = "";
//     this.BufferEnabled = true;
//   }

//   create() {
//     let self = this;
//     self.MapView.on("click", function(event) {
//       if (self.BufferEnabled) {
//         self.BufferEnabled = !self.BufferEnabled;
//         console.log(self.BufferEnabled);
//         self.Latitude = self.MapView.toMap({
//           x: event.x,
//           y: event.y
//         }).latitude.toFixed(3);
//         self.Longitude = self.MapView.toMap({
//           x: event.x,
//           y: event.y
//         }).longitude.toFixed(3);
//         document.getElementById("info").style.display = "none";
//         let serviceAreaTask = self.setUrlService(
//           "https://route.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea"
//         );
//         let driveTimeCutoffs = 60;
//         let locationGraphic = self.createGraphic(
//           {
//             type: "point",
//             longitude: self.Longitude,
//             latitude: self.Latitude
//           },
//           {
//             type: "simple-marker",
//             color: "orange",
//             size: 8
//           }
//         );
//         let serviceAreaParams = self.createServiceAreaParams(
//           locationGraphic,
//           driveTimeCutoffs,
//           self.MapView.spatialReference
//         );
//         self.executeServiceAreaTask(serviceAreaParams, serviceAreaTask);
//       } else return;
//     });
//   }

//   setUrlService(url) {
//     this.UrlServiceArea = url;
//     return new ESRI.ServiceAreaTask({
//       url: this.UrlServiceArea
//     });
//   }

//   createGraphic(point, markerSymbol) {
//     this.Point = point;
//     this.MarkerSymbol = markerSymbol;
//     this.MapView.center = this.Point;
//     const self = this;
//     let graphic = new ESRI.Graphic({
//       geometry: this.Point,
//       symbol: this.MarkerSymbol
//     });
//     this.MapView.graphics.add(graphic);
//     return graphic;
//   }

//   createServiceAreaParams(locationGraphic, driveTime, outSpacialReference) {
//     this.LocationGraphic = locationGraphic;
//     this.DriveTime = driveTime;
//     this.OutSpatialReference = outSpacialReference;
//     console.log(this.DriveTime);

//     let featureSet = new ESRI.FeatureSet({
//       features: [this.LocationGraphic]
//     });

//     let taskParameters = new ESRI.ServiceAreaParameters({
//       facilities: featureSet,
//       defaultBreaks: this.DriveTime,
//       outSpatialReference: this.OutSpatialReference
//     });
//     return taskParameters;
//   }

//   executeServiceAreaTask(serviceAreaParams, serviceAreaTask) {
//     this.serviceAreaParams = serviceAreaParams;
//     this.serviceAreaTask = serviceAreaTask;
//     const self = this;

//     return this.serviceAreaTask.solve(this.serviceAreaParams).then(
//       function(result) {
//         if (result.serviceAreaPolygons.length) {
//           // Draw each service area polygon
//           result.serviceAreaPolygons.forEach(function(graphic) {
//             graphic.symbol = {
//               type: "simple-fill",
//               color: "rgba(255,50,50,.25)"
//             };
//             self.MapView.graphics.add(graphic, 0);
//           });
//         }
//       },
//       function(error) {
//         console.log(error);
//       }
//     );
//   }
// }

export class DriveTime { 
  constructor(point, params, url, fillSymbol) {
      this.Point = point
      this.Params = params
      this.UrlGeoprocessor = url
      this.FillSymbol = fillSymbol
      this.ArrayParamsCatchment = [];
      this.Geometry = null;
  }

  run(callback) {
      const self = this
      let gp = new ESRI.Geoprocessor(this.UrlGeoprocessor)
      gp.execute(this.Params).then(drawResult)        
      function drawResult(result) {
          let resultValue = result.results[0].value
          let resultFeatures = resultValue.features;
          self.ArrayParamsCatchment.push(resultValue)
          // Assign each resulting graphic a symbol
          let resultGraphics = resultFeatures.map(function(feature) {
              feature.symbol = self.FillSymbol;
              return feature;
          });
  
          // Add the resulting graphics to the graphics layer
          self.GraphicsLayer.addMany(resultGraphics);
  
          self.ObjMapView.goTo({
              target: resultGraphics,
              zoom: 13
          });
          callback()
      }
  }

  createLayer(url) {
      let featureLayer = new ESRI.FeatureLayer({
          url: url
      });
      this.FeatureLayer = featureLayer
  }

  render(map, mapView, markerSymbol) {
      this.ObjMap = map
      this.ObjMapView = mapView
      this.MarkerSymbol = markerSymbol
      this.ObjMapView.center = this.Point

      let graphicsLayer = new ESRI.GraphicsLayer();
      this.ObjMap.add(graphicsLayer);
      let graphic = new ESRI.Graphic({
          geometry: this.Point,
          symbol: this.MarkerSymbol
      })

      graphicsLayer.add(graphic)
      
      let features = []
      features.push(graphic)
  
      let featureSet = new ESRI.FeatureSet()
      featureSet.features = features
      
      this.GraphicsLayer = graphicsLayer
  }
}

export class Catchment {
  constructor() {
      this.Params = ''
      this.Url = ''
      this.ObjectID = []
      this.ObjectIDStr = [];
  }

  setParams(params) {
      this.Params = params
  }

  setServiceUrl(url) {
      this.Url = url
  }

  run(callback) {
      let self = this 
      let gp = new ESRI.Geoprocessor(this.Url)
      gp.execute(this.Params).then(catchResult)
      function catchResult(result) {
          console.log(result)
          let features = result.results[0].value.features
          features.forEach(element => {
              let objectID = element.attributes.OBJECTID
              self.ObjectID.push(objectID)
          });
          let objID = self.ObjectID
          let Str = objID.toString()
          self.ObjectIDStr.push(Str)
          callback()
      };
  }

  setQuery(query) {

  }
}