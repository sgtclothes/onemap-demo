function boot(GIS) {
    //Setting Proxy
    let esriConfig = new GIS.Proxy.esriConfig();
    esriConfig.setUrlUtils();
  
    //Define Config class
    let config = new GIS.Config();
  
    //Define Map class
    let map = new GIS.Map(config.CenterPoint);
    map.setBasemap('topo-vector')
    //Adding Widgets to MapView
    map.addDirectionsWidget(config.Position[5]);
    //map.addLegendWidget(config.Position[2]);
    map.addPrintWidget(config.PrintServiceUrl, config.Position[1]);
    map.addLocateWidget(config.Position[6])
    map.addBasemapGalleryWidget({
        portal: {
            url: "https://www.arcgis.com",
            useVectorBasemaps: true
        }
    }, config.Position[6])
    //Adding Tasks to MapView
    map.addSearchWidget(config.Position[6]);
    map.addTrackingGeolocationWidget(config.Position[5]);
  
    //Map Rendering
    map.render();
  
    var btnEmptySelection = document.getElementById('remove');
    btnEmptySelection.onclick = function() {
        map.ObjMapView.graphics.removeAll();
    };

    //Adding Layers to Map
    let bakso = new GIS.Layer.FeatureLayer(
      map.ObjMap,
      config.Renderer["bakso"],
      config.PopupTemplate["bakso"]
    );
    bakso.render();
  
    //Define Buffers
    let radius = new GIS.Buffer.Radius(
      map.ObjMap,
      map.ObjMapView,
      "http://tig.co.id/ags/rest/services/POI/POI_CRP/MapServer/2",
      config.BufferPolySym,
      config.BufferPointSym
    );
  
    let drivingTimeMode = false;
    let convertCSVMode = false;
  
    let convertCSV = new GIS.Buffer.ConvertCSV(map.ObjMap, map.ObjMapView);

    document
      .querySelector(".pointingBuffer")
      .addEventListener("click", function() {
        radius.Results = [];
        let info = document.getElementById("info");
        info.style.display = "inline-block";
        map.ObjMapView.ui.add(info, "top-right");
        let inputDistanceLength = document.getElementsByClassName(
          "input-distance"
        ).length;
        let unit = document.getElementsByClassName("select-unit")[0].value;
        let a = [];
        for (let i = 0; i < inputDistanceLength; i++) {
          a.push(document.getElementsByClassName("input-distance")[i].value);
        }
        radius.setUnit(unit);
        radius.setRadius(a);
        radius.BufferEnabled = true;
        radius.create();
      });
  
    // document.querySelector("#basemap").addEventListener("click", function() {
    //   console.log(radius.Results);
    // });
  
    function driveTime(coordinate) {
      let driveTime = new GIS.Buffer.DriveTime(
        coordinate,
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
        let extent =
          driveTime.ArrayParamsCatchment[0].features[0].geometry.extent;
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
    }
  
    document
      .querySelector(".pointingDrive")
      .addEventListener("click", function() {
        drivingTimeMode = true;
        let info = document.getElementById("info");
        info.style.display = "inline-block";
        map.ObjMapView.ui.add(info, "top-right");
      });
  
    map.ObjMapView.on("click", function(event) {
      if (drivingTimeMode == true) {
        drivingTimeMode = !drivingTimeMode;
        let info = document.getElementById("info");
        info.style.display = "none";
        let latitude = map.ObjMapView.toMap({
          x: event.x,
          y: event.y
        }).latitude.toFixed(3);
  
        let longitude = map.ObjMapView.toMap({
          x: event.x,
          y: event.y
        }).longitude.toFixed(3);
  
        let DriveTimePoint = {
          type: "point",
          longitude: longitude,
          latitude: latitude
        };
  
        driveTime(DriveTimePoint);
      } else {
        return;
      }
    });
  
    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }
  
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  
    document.getElementById("closebtn").addEventListener("click", function() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
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

      document.getElementById("myModal").addEventListener("click", function() {
        let x = document.getElementById("dragdrop-modal");
        if (x.style.display == "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      });
    
      convertCSV.setupDropZone();
}
  