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
    //map.addDirectionsWidget(config.Position[5]);
    //map.addLegendWidget(config.Position[2]);
    map.addPrintWidget(config.PrintServiceUrl, config.Position[5]);
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
    
    //Define Buffers
    let radius = new GIS.Buffer.Radius(
      map.ObjMap,
      map.ObjMapView,
      "http://tig.co.id/ags/rest/services/POI/POI_CRP/MapServer/2",
      config.BufferPolySym,
      config.BufferPointSym
    );
  
    let drivingTimeMode = false;

    // window.pointColors = ""

    map.ObjMapView.on("pointer-move", function() {
      let pointColors = ($('#colors').val())
      let convertCSV = new GIS.Buffer.ConvertCSV(map.ObjMap, map.ObjMapView, pointColors);
      convertCSV.setupDropZone();
    });

    // map.ObjMapView.when(function() {
    //   let conv = new Promise(function(resolve, reject) {
    //     move(resolve)
    //   });
    //   conv.then(function() {
    //     let convertCSV = new GIS.Buffer.ConvertCSV(map.ObjMap, map.ObjMapView, pointColors);
    //     convertCSV.setupDropZone();
    //   })
    // })

    let fields = [
      {
        name: "__OBJECTID",
        alias: "__OBJECTID",
        type: "esriFieldTypeOID",
        editable: true,
        domain: null
      },
      {
        name: "type",
        type: "esriFieldTypeString",
        alias: "Type",
        editable: true,
        domain: null
      },
      {
        name: "name",
        type: "esriFieldTypeString",
        alias: "Name",
        editable: true,
        domain: null
      },
      {
        name: "lat",
        type: "esriFieldTypeDouble",
        alias: "Latitude",
        editable: true,
        domain: null
      },
      {
        name: "lon",
        type: "esriFieldTypeDouble",
        alias: "Longitude",
        editable: true,
        domain: null
      },
      {
        name: "region",
        type: "esriFieldTypeString",
        alias: "Region",
        editable: true,
        domain: null
      },
      {
        name: "shape",
        type: "esriFieldTypeDouble",
        alias: "Shape",
        editable: true,
        domain: null
      },
      {
        name: "created_by",
        type: "esriFieldTypeString",
        alias: "Created by",
        editable: true,
        domain: null
      }
    ]

    let poi = new GIS.Buffer.POI(map.ObjMapView, fields);
    poi.run()

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
  
    map.ObjMapView.when(function() {
      let colorsDiv = document.getElementById("colors-div");
      colorsDiv.style.display = "inline-block";

      let colorsExpand = new ESRI.Expand({
        expandIconClass: "esri-icon-experimental",
        view: map.ObjMapView,
        content: colorsDiv
      });
      
      map.ObjMapView.ui.add(colorsExpand, config.Position[6])
    });

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

    function open_viewer() {
      document.getElementById("myViewer").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }
  
    function close_viewer() {
      document.getElementById("myViewer").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  
    document.getElementById("closeviewer").addEventListener("click", function() {
      document.getElementById("myViewer").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    });

    document
      .getElementById("viewer-nav")
      .addEventListener("click", function() {
        if (document.getElementById("myViewer").style.width > "0px") {
          close_viewer();
        } else {
          open_viewer();
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

      document.getElementById("closeMyModal").addEventListener("click", function() {
        let x = document.getElementById("dragdrop-modal");
        if (x.style.display == "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      });

      // Show & Hide POI from GIS Services
      let dkiLayer = new GIS.Layer.ServiceLayer(map.ObjMap)
      dkiLayer.setUrl("http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/16")

      let mandiriLayer = new GIS.Layer.ServiceLayer(map.ObjMap)
      mandiriLayer.setUrl("http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/27")

      function setStyleLegendClass() {
        setTimeout(function() {
          let legendClass = document.getElementsByClassName("esri-legend--stacked")[0]
          legendClass.setAttribute('style', 'height:130px; overflow-y:hidden')
          legendClass.setAttribute('id', 'legendId')
        }, 800);
       }

      document
        .getElementById("short")
        .addEventListener("change", function(){
          if(this.checked) {
            dkiLayer.render()
            mandiriLayer.render()
            let poiArr = []
            let i;
            let poiForm = document.forms.poi
            for (i = 0; i < poiForm.length; i++) {
              if (poiForm[i].checked) {
                poiArr.push(poiForm[i].value);
              }
            }
            let layerInfo = arrayUtils.map(map.ObjMap.layers.items, function(item,index) {
              return {
                layer: item,
                title: poiArr[index]
              }
            })
            let legend = new GIS.Map.Widgets.Legend(map.ObjMapView,layerInfo)
            legend.setStyle("card", "side-by-side")
            map.ObjMapView.ui.add(legend.create(), config.Position[2])
            setStyleLegendClass()
            window.legend = legend
          }
          else {
            let layer = map.ObjMap.layers.items
            let i;
            let poiForm = document.forms.poi
            for (i = 0; i < poiForm.length; i++) {
              if (poiForm[i].checked==false) {
                for (let key in layer) {
                  map.ObjMap.remove(layer[key])
                }
              }
            }
            document.getElementById("legendId").remove();
          }
      })
      // End Of Show & Hide POI from GIS Services
      
      localStorage.clear();
    
      if (localStorage.data) {
        console.log(JSON.parse(localStorage.data));
      } else { return };
}