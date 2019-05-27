function boot(GIS) {
  //Setting Proxy
  let esriConfig = new GIS.Proxy.esriConfig();
  esriConfig.setUrlUtils();

  //Define Config class
  let config = new GIS.Config();

  //Define Map class
  let map = new GIS.Map(config.CenterPoint);

  //Adding Widgets to MapView
  map.addDirectionsWidget(config.Position[1]);
  map.addMeasurementWidget(config.Position[6]);
  map.addLegendWidget(config.Position[2]);
  map.addPrintWidget(config.PrintServiceUrl, config.Position[2]);

  //Adding Tasks to MapView
  map.addSearchWidget(config.Position[6]);
  map.addTrackingGeolocationWidget(config.Position[5]);

  //Map Rendering
  map.render();

  //Adding Layers to Map
  let miniMarket = new GIS.Layer.FeatureLayer(
    map.ObjMap,
    config.Renderer["minimarket"],
    config.PopupTemplate["minimarket"]
  );
  miniMarket.render();

  //Define Buffers
  let radius = new GIS.Buffer.Radius(
    map.ObjMap,
    map.ObjMapView,
    config.BufferPolySym,
    config.BufferPointSym
  );
  let driveTime = new GIS.Buffer.DriveTime(
    config.DriveTimePoint,
    config.DriveTimeParams,
    "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3",
    config.DriveTimeFillSymbol
  );
  driveTime.createLayer(
    "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
  );

  let driveTimePromise = new Promise(function(resolve, reject) {
    driveTime.run(resolve);
  });

  driveTimePromise.then(function() {
    let extent = driveTime.ArrayParamsCatchment[0].features[0].geometry.extent;
    let xmin = extent.xmin;
    let xmax = extent.xmax;
    let ymin = extent.ymin;
    let ymax = extent.ymax;
    let wkid =
      driveTime.ArrayParamsCatchment[0].features[0].geometry.spatialReference
        .wkid;
    let inputFeatureArr = driveTime.ArrayParamsCatchment;

    let catchmentParams = {
      f: "json",
      "env:outSR": 4326,
      "env:processSR": 4326,
      Input_Feature: JSON.stringify(inputFeatureArr[0])
    };

    let catchment = new GIS.Buffer.Catchment();

    let catchmentPromise = new Promise(function(resolve, reject) {
      catchment.setServiceUrl(
        "http://tig.co.id/ags/rest/services/GP/v2_catchment/GPServer/catchment_select_table"
      );
      catchment.setParams(catchmentParams);
      catchment.run(resolve);
    });

    catchmentPromise.then(function() {
      let query = {
        f: "json",
        where: "OBJECT IN (" + catchment.ObjectIDStr[0] + ")",
        returnGeometry: true,
        spatialRel: "esriSpatialRelIntersects",
        maxAllowableOffset: 76,
        geometry:
          '{"xmin":' +
          xmin +
          ',"ymin":' +
          ymin +
          ',"xmax":' +
          xmax +
          ', "ymax":' +
          ymax +
          ',"spatialReference":{"wkid":' +
          wkid +
          "}}",
        geometryType: driveTime.ArrayParamsCatchment[0].geometryType,
        inSR: 102100,
        outFields: "*",
        outSR: 102100
      };
      catchment.setQuery(query);
    });
  });

  driveTime.render(map.ObjMap, map.ObjMapView, config.DriveTimeMarkerSymbol);

  //Define Route
  // let route = new GIS.Task.Route(map.ObjMapView, config.RouteTaskUrl)
  // let routeTask = route.create()
  // console.log(routeTask)

  //Define Info Window
  // let infoWindow = new GIS.Map.Layout.InfoWindow(map.ObjMapView, featureLayer)
  // infoWindow.render()

  //----------------------Batas Percobaan-------------------------//

  // map.ObjMapView.on("click", function (event) {
  //     let latitude, longitude
  //     latitude = map.ObjMapView.toMap({
  //         x: event.x,
  //         y: event.y
  //     }).latitude.toFixed(3)

  //     longitude = map.ObjMapView.toMap({
  //         x: event.x,
  //         y: event.y
  //     }).longitude.toFixed(3)

  //     let circle = new ESRI.Circle({
  //         center: [longitude, latitude],
  //         geodesic: true,
  //         radius: 100,
  //         radiusUnit: "kilometers"
  //     })

  //     console.log(latitude + longitude)
  //     let circleSymb = new ESRI.SimpleFillSymbol({
  //         style: "solid",
  //         outline: {
  //             style: "solid",
  //             color: [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)],
  //             width: 1
  //         },
  //         color: [Math.floor((Math.random() * 255) + 1), 0, 0, 0.1]
  //     })

  //     var graphic = new ESRI.Graphic(circle, circleSymb);
  //     map.ObjMapView.graphics.add(graphic);

  //     let query = new ESRI.Query()
  //     query.returnGeometry = true
  //     query.geometry = circle
  //     query.outFields = ["*"]

  //     featureLayer.queryFeatures(query).then(function (results) {
  //         console.log(results.features);  // prints the array of features to the console
  //     })
  // })
  //----------------------Batas Percobaan-------------------------//

  //Add Measurement to Map
  let checkBoxMeasurement = document.getElementById("addMeasurement");
  let measureBar = document.getElementById("topbar");
  checkBoxMeasurement.onclick = function() {
    if (checkBoxMeasurement.checked == true) {
      measureBar.style.display = "block";
      map.ObjMapView.ui.add("topbar", "top-right");
    } else {
      measureBar.style.display = "none";
    }
  };

  //Add Directions to Map
  let checkBoxDirections = document.getElementById("addDirections");
  checkBoxDirections.onclick = function() {
    if (checkBoxDirections.checked == true) {
      let directionsDomNode = document.getElementsByClassName(
        "esri-component esri-directions esri-widget esri-widget--panel esri-directions__scroller"
      )[0];
      directionsDomNode.style.display = "inline-block";
    } else {
      map.removeWidget("directions");
    }
  };

  //Add Legend to Map
  let checkBoxLegend = document.getElementById("addLegend");
  checkBoxLegend.onclick = function() {
    if (checkBoxLegend.checked == true) {
      let legendDomNode = document.getElementsByClassName(
        "esri-component esri-legend esri-widget--panel esri-widget"
      )[0];
      legendDomNode.style.display = "inline-block";
    } else {
      map.removeWidget("legend");
    }
  };

  //Add Track to Map
  let checkBoxTrack = document.getElementById("addTrack");
  checkBoxTrack.onclick = function() {
    if (checkBoxTrack.checked == true) {
      let TrackDomNode = document.getElementsByClassName(
        "esri-component esri-track esri-widget--button esri-widget"
      )[0];
      TrackDomNode.style.display = "block";
    } else {
      map.removeWidget("track");
    }
  };

  //Add Print to Map
  let checkBoxPrint = document.getElementById("addPrint");
  checkBoxPrint.onclick = function() {
    if (checkBoxPrint.checked == true) {
      let PrintDomNode = document.getElementsByClassName(
        "esri-component esri-print esri-widget esri-widget--panel"
      )[0];
      PrintDomNode.style.display = "block";
    } else {
      map.removeWidget("print");
    }
  };

  document
    .getElementById("select-travel-mode")
    .addEventListener("click", function() {
      if (this.value == "walking-time") {
        map.WidgetObjects["directions"].viewModel.selectedTravelMode =
          config.travelModes[0];
      } else if (this.value == "walking-distance") {
        map.WidgetObjects["directions"].viewModel.selectedTravelMode =
          config.travelModes[4];
      } else if (this.value == "driving-time") {
        map.WidgetObjects["directions"].viewModel.selectedTravelMode =
          config.travelModes[2];
      } else if (this.value == "driving-distance") {
        map.WidgetObjects["directions"].viewModel.selectedTravelMode =
          config.travelModes[3];
      }
    });

  document
    .getElementById("distanceButton")
    .addEventListener("click", function() {
      map.setMeasurementActiveWidget(null);
      if (!this.classList.contains("active")) {
        map.setMeasurementActiveWidget("distance");
      } else {
        map.setMeasurementActiveWidget(null);
      }
    });

  document.getElementById("areaButton").addEventListener("click", function() {
    map.setMeasurementActiveWidget(null);
    if (!this.classList.contains("active")) {
      map.setMeasurementActiveWidget("area");
    } else {
      map.setMeasurementActiveWidget(null);
    }
  });

  document.getElementById("radiusButton").addEventListener("click", function() {
    map.setMeasurementActiveWidget(null);
    if (!this.classList.contains("active")) {
      map.setMeasurementActiveWidget("radius");
    } else {
      map.setMeasurementActiveWidget(null);
    }
  });

  document
    .querySelector(".pointingBuffer")
    .addEventListener("click", function() {
      let info = document.getElementById("info");
      info.style.display = "inline-block";
      map.ObjMapView.ui.add(info, "top-right");
      let inputDistanceLength = document.getElementsByClassName(
        "input-distance"
      ).length;
      let unit = document.getElementsByClassName("select-unit")[0].value;
      let a = [];
      console.log(inputDistanceLength);
      for (let i = 0; i < inputDistanceLength; i++) {
        a.push(document.getElementsByClassName("input-distance")[i].value);
      }
      radius.setUnit(unit);
      radius.setRadius(a);
      radius.BufferEnabled = true;
      radius.create();
    });

  document.querySelector("#basemap").addEventListener("click", function() {
    console.log(radius.Results);
  });

  document
    .querySelector(".pointingDrive")
    .addEventListener("click", function() {
      let info = document.getElementById("info");
      info.style.display = "inline-block";
      map.ObjMapView.ui.add(info, "top-right");
      driveTime.BufferEnabled = true;
      driveTime.create();
    });

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    // document.getElementById("myModal").style.marginLeft = "250px"
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("myModal").style.marginLeft = "0"
  }

  document.getElementById("closebtn").addEventListener("click", function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("myModal").style.marginLeft = "0"
  });

  document
    .getElementById("instant-analysis")
    .addEventListener("click", function() {
      if (document.getElementById("mySidenav").style.width > "0px") {
        closeNav();
      } else {
        openNav();
      }
    });

  document
    .getElementById("select-analysis")
    .addEventListener("click", function() {
      let x = document.getElementById("resultBuffer");
      let z = document.getElementById("resultDriving");
      let y = document.getElementById("select-analysis");
      if (y.value == "none") {
        x.style.display = "none";
        z.style.display = "none";
      } else if (y.value == "buffer") {
        x.style.display = "block";
        z.style.display = "none";
      } else if (y.value == "driving") {
        x.style.display = "none";
        z.style.display = "block";
      }
    });

  document
    .querySelector(".select-driving")
    .addEventListener("click", function() {
      let x = document.getElementById("driving-live");
      if (this.value == "live") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    });
}
