function boot(GIS) {
  //Define Config class
  let config = new GIS.Config();
  //Define Map class
  let map = new GIS.Map(config.CenterPoint);
  map.setBasemap("topo-vector");
  map.addPrintWidget(config.PrintServiceUrl, config.Position[5]);
  //Setting Proxy
  //let esriConfig = new GIS.Proxy.esriConfig();
  //esriConfig.setUrlUtils();
  //Adding Widgets to MapView
  //map.addDirectionsWidget(config.Position[5]);
  //map.addLegendWidget(config.Position[2]);
  map.addLocateWidget(config.Position[5]);
  //map.addTrackingGeolocationWidget(config.Position[5]);
  map.addBasemapGalleryWidget(
    {
      portal: {
        url: "https://www.arcgis.com",
        useVectorBasemaps: true
      }
    },
    config.Position[6]
  );
  //Adding Tasks to MapView
  map.addSearchWidget(config.Position[6]);
  //Map Rendering
  map.render();

  // Create a site
  map.ObjMapView.when(function() {
    let createSiteDiv = document.getElementById("create-site-div");
    createSiteDiv.style.display = "inline-block";

    let createSiteExpand = new ESRI.Expand({
      expandIconClass: "esri-icon-organization",
      view: map.ObjMapView,
      content: createSiteDiv
    });

    map.ObjMapView.ui.add(createSiteExpand, config.Position[6]);
  });

  let pointTheSiteEnabled = false;
  document
    .getElementById("point-the-site")
    .addEventListener("click", function() {
      pointTheSiteEnabled = true;
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:pointer;");
      console.log(pointTheSiteEnabled);
      if (pointTheSiteEnabled == false) {
        document
          .getElementById("mapDiv")
          .setAttribute("style", "cursor:default;");
      }
    });

  map.ObjMapView.on("click", function(event) {
    if (pointTheSiteEnabled) {
      pointTheSiteEnabled = !pointTheSiteEnabled;
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:pointer;");
      let latitude = map.ObjMapView.toMap({
        x: event.x,
        y: event.y
      }).latitude.toFixed(3);

      let longitude = map.ObjMapView.toMap({
        x: event.x,
        y: event.y
      }).longitude.toFixed(3);

      document.getElementById("lat-site").value = latitude;
      document.getElementById("lon-site").value = longitude;
    }
    if (pointTheSiteEnabled == false) {
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:default;");
    }
  });
  // END of create a site

  // create site analysis
  $(document).ready(function() {
    var counter = 1;

    $("#adding-btn").on("click", function() {
      let newRow = $("<div class=cols>");
      let cols = "<hr style='margin-right: 2px'>";

      cols +=
        '<div class="form-group row" style="margin-left:10px; margin-top:15px;">';
      cols +=
        '<label class="col-form-label" style="margin-right:5px;">Latitude</label>';
      cols +=
        '<input name="latitude" type="text" value="0" class="form-control latitude-form" required readonly style="width:60px; margin-right:5px;">';
      cols +=
        '<label class="col-form-label" style="margin-right:5px;">Longitude</label>';
      cols +=
        '<input name="longitude" type="text" value="0" class="form-control longitude-form" required readonly style="width:60px;">';
      cols +=
        '<button type="button" class="btn btn-sm alpha-pink border-pink-400 text-pink-800 btn-icon btn-delete ml-2"><i class="icon-cross2"></i></button></div>';
      cols += '<div style="padding-left: 90px; padding-bottom: 10px;">';
      cols += '<div class="btn-group ml-1">';
      cols +=
        '<button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon dropdown-toggle" data-toggle="dropdown">';
      cols += '<i class="icon-stack3"></i></button>';
      cols += '<div class="dropdown-menu dropdown-menu-right">';
      cols += '<a href="#" class="dropdown-item selectbuffer">Buffer</a>';
      cols +=
        '<a href="#" class="dropdown-item selectdrive">Driving Time</a></div></div>';
      cols +=
        '<button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon ml-2"><i class="icon-info3"></i></button></div>';
      cols += '<div class="collapsible">';
      cols += '<div class="resultBuffer">';
      cols += '<div class="collapse-container">';
      cols += '<div class="collapse-head"><h2>Buffer</h2></div>';
      cols += '<div class="collapse-content">';
      cols += '<p style="margin-left:10px; margin-top:10px;">Result Type</p>';
      cols +=
        '<select class="select-buffer"><option value="aggregation">Aggregation</option><option value="segmentation">Segmentation</option></select>';
      cols +=
        '<p style="margin-left:10px; margin-top:10px;">Distance</p><div id="input-distance-div"><input class="input-distance" type="number" value="1" /></div>';
      cols +=
        '<div id="input-distance-div"><input class="input-distance" type="number" value="1" /></div><p style="margin-left:10px;margin-top:10px;">Unit</p>';
      cols +=
        '<select class="select-unit"><option value="meters">Meters</option><option value="kilometers">Kilometers</option></select>';
      cols +=
        '<div class="button-buffer"><button class="pointingBuffer" style="margin-right: 10px;">Pointing</button><button style="margin-right: 10px;">Save</button><button id="remove" style="margin-right: 10px;">Clear</button></div>';
      cols += "</div></div></div>";
      cols += '<div class="resultDriving">';
      cols += '<div class="collapse-container">';
      cols += '<div class="collapse-head"><h2>Driving Time</h2></div>';
      cols += '<div class="collapse-content">';
      cols += '<p style="margin-left:10px; margin-top:10px;">Driving Data</p>';
      cols +=
        '<select class="select-driving"><option>Please Select</option><option value="live">Live</option><option value="typical">Typical</option><option value="historical">Historical</option></select>';
      cols += '<p style="margin-left:10px; margin-top:10px;">Result Type</p>';
      cols +=
        '<select class="select-buffer"><option value="aggregation">Aggregation</option><option value="segmentation">Segmentation</option></select>';
      cols +=
        '<div id="driving-live"><p style="margin-left:10px; margin-top:10px;">Distance</p>';
      cols +=
        '<div id="input-distance-div"><input class="input-distance" type="number" /></div><p style="margin-left:10px; margin-top:10px;">Unit</p>';
      cols +=
        '<select class="select-unit"><option value="minutes">Minutes</option><option value="hours">Hours</option></select>';
      cols +=
        '<p style="margin-left:10px; margin-top:10px;">Driving Direction</p>';
      cols += '<select class="select-driving-direction">';
      cols += '<option value="toward">Towards Site</option>';
      cols += '<option value="away">Away from Site</option>';
      cols += "</select></div>";
      cols +=
        '<div class="button-driving"><button class="pointingDrive" style="margin-right: 10px;">Pointing</button>';
      cols += '<button style="margin-right: 10px;">Save</button>';
      cols +=
        '<button id="remove" style="margin-right: 10px;">Clear</button></div></div></div>';
      cols += "</div>";
      cols += "</div>";
      cols += "</div>";

      newRow.append(cols);
      $("div.form-list").append(newRow);
      counter++;
    });

    $("div.form-list").on("click", ".btn-delete", function(event) {
      $(this)
        .closest("div.cols")
        .remove();
      counter -= 1;
    });
  });

  const para = document.querySelector(".form-list");

  para.addEventListener("pointermove", event => {
    let selectDrive = document.getElementsByClassName("selectdrive");
    let j;

    for (j = 0; j < selectDrive.length; j++) {
      selectDrive[j].addEventListener("click", function() {
        let resDrive = document.getElementsByClassName("resultDriving");
        for (let a = 0; a < resDrive.length; a++) {
          if ((resDrive[a].style.display = "none")) {
            resDrive[a].style.display = "block";
          }
        }
      });
    }

    let selectBuffer = document.getElementsByClassName("selectbuffer");
    let i;
    for (i = 0; i < selectBuffer.length; i++) {
      selectBuffer[i].addEventListener("click", function() {
        let resBuff = document.getElementsByClassName("resultBuffer");
        for (let a = 0; a < resBuff.length; a++) {
          if ((resBuff[a].style.display = "none")) {
            resBuff[a].style.display = "block";
          }
        }
      });
    }
  });

  let pointEnabled = false;
  document.getElementById("pointing-btn").addEventListener("click", function() {
    pointEnabled = true;
    document.getElementById("mapDiv").setAttribute("style", "cursor:pointer;");
    if (pointEnabled == false) {
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:default;");
    }
  });

  map.ObjMapView.on("click", function(event) {
    if (pointEnabled) {
      pointEnabled = !pointEnabled;
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:pointer;");
      let latitude = map.ObjMapView.toMap({
        x: event.x,
        y: event.y
      }).latitude.toFixed(3);

      let longitude = map.ObjMapView.toMap({
        x: event.x,
        y: event.y
      }).longitude.toFixed(3);

      let latForm = document.getElementsByClassName("latitude-form");
      let lonForm = document.getElementsByClassName("longitude-form");
      let current = parseInt(latForm.length - 1);
      latForm[current].value = latitude;
      let currentt = parseInt(lonForm.length - 1);
      lonForm[currentt].value = longitude;
    }
    if (pointEnabled == false) {
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:default;");
    }
  });

  let btnEmptySelection = document.getElementById("remove");
  btnEmptySelection.onclick = function() {
    map.ObjMapView.graphics.removeAll();
  };
  // end of create site analysis

  //Define Buffers
  let radius = new GIS.Buffer.Radius(
    map.ObjMap,
    map.ObjMapView,
    "http://tig.co.id/ags/rest/services/POI/POI_CRP/MapServer/2",
    config.BufferPolySym,
    config.BufferPointSym
  );

  let drivingTimeMode = false;

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
    document.getElementById("mySidenav").style.width = "320px";
    document.getElementById("main").style.marginLeft = "320px";
    document.getElementById("mySidenav").classList.add("panel-left");
    document.getElementById("main").style.marginRight = "0";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidenav").classList.add("panel-left");
    document.getElementById("main").style.marginRight = "0";
  }

  document.getElementById("closebtn").addEventListener("click", function() {
    document.getElementById("mySidenav").style.width = "0";
    if (document.getElementById("mySidenav").classList.contains("panel-left")) {
      document.getElementById("main").style.marginLeft = "0";
    } else {
      document.getElementById("main").style.marginRight = "0";
    }
  });

  document
    .getElementById("instant-analysis")
    .addEventListener("click", function() {
      let mySidenav = document.getElementById("mySidenav");
      if (document.getElementById("myViewer").style.width > "0px") {
        if (mySidenav.style.width > "0px") {
          mySidenav.classList.add("panel-right");
          document.getElementById("main").style.marginRight = "0";
          mySidenav.setAttribute("style", "width:0px;");
        } else {
          mySidenav.classList.add("panel-right");
          document.getElementById("main").style.marginRight = "320px";
          mySidenav.setAttribute("style", "width:320px;");
        }
        if (mySidenav.classList.contains("panel-left")) {
          mySidenav.classList.remove("panel-left");
        }
      } else {
        if (mySidenav.style.width > "0px") {
          closeNav();
        } else {
          openNav();
        }
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

  document.getElementById("viewer-nav").addEventListener("click", function() {
    if (document.getElementById("myViewer").style.width > "0px") {
      close_viewer();
    } else {
      open_viewer();
    }
    if (document.getElementById("mySidenav").classList.contains("panel-left")) {
      document.getElementById("mySidenav").classList.remove("panel-left");
      document.getElementById("mySidenav").classList.add("panel-right");
      document.getElementById("main").style.marginRight = "320px";
      document
        .getElementById("mySidenav")
        .setAttribute("style", "width:320px;");
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

  //drag and drop
  let pointColors = $("#colors").val();
  let convertCSV = new GIS.Buffer.ConvertCSV(map.ObjMap, map.ObjMapView);
  convertCSV.setupDropZone();
  //end of drag and drop

  // widget color picker and render poi
  let colorsDiv = document.getElementById("colors-div");
  let colorsExpand = new ESRI.Expand({
    expandIconClass: "esri-icon-experimental",
    view: map.ObjMapView,
    content: colorsDiv
  });

  document.getElementById("color-picker").addEventListener("click", function() {
    if (colorsDiv.style.display == "none") {
      map.ObjMapView.ui.add(colorsExpand, config.Position[6]);
      colorsDiv.style.display = "inline-block";
    } else {
      colorsDiv.style.display = "none";
      map.ObjMapView.ui.remove(colorsExpand);
    }
  });

  document.getElementById("drag-csv").addEventListener("click", function() {
    let x = document.getElementById("dragdrop-modal");
    let infocsv = document.getElementById("info-csv");
    if (x.style.display == "none") {
      x.style.display = "block";
      infocsv.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });

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
  ];

  let poi = new GIS.Buffer.POI(map.ObjMapView, fields);
  // poi.run();
  // end of widget color picker and render poi

  // Show & Hide POI from GIS Services
  let layerServiceArr = JSON.parse(layerDataArr);
  let storeDatabase = new GIS.Buffer.Database(
    "localhost",
    "root",
    "",
    "user_data"
  );

  let storeLocalStorage = new GIS.Buffer.LocalStorage(
    map.ObjMapView,
    convertCSV
  );
  let viewer = new GIS.Buffer.Viewer(map.ObjMapView, convertCSV);
  viewer.renderTreeview();
  viewer.selectItem();

  function setLayerInfos(layer) {
    let layerInfo = arrayUtils.map(layer, function(item) {
      for (let j = 0; j < layerServiceArr.length; j++) {
        if (item.layerId == layerServiceArr[j].id) {
          return {
            layer: item,
            title: layerServiceArr[j].name
          };
        }
      }
    });
    return layerInfo;
  }

  function distinct(layerInfo) {
    let layerInfos = [];
    const map_layer = new Map();
    for (const item of layerInfo) {
      if (!map_layer.has(item.title)) {
        map_layer.set(item.title, true);
        layerInfos.push({
          layer: item.layer,
          title: item.title
        });
      }
    }
    return layerInfos;
  }

  function renderPOI(idform) {
    let form = idform.querySelectorAll('input[type="checkbox"]');
    let layerArr = [];
    let i;
    for (i = 0; i < form.length; i++) {
      if (form[i].checked) {
        layerArr.push(
          new GIS.Layer.ServiceLayer(
            map.ObjMap,
            "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/" +
              form[i].value
          )
        );
      }
    }
    return layerArr;
  }

  function setStyleLegendClass() {
    setTimeout(function() {
      let legendClass = document.getElementsByClassName(
        "esri-legend--stacked"
      )[0];
      legendClass.setAttribute(
        "style",
        "background: rgba(255,255,255,0.7); height:130px; overflow-y:hidden"
      );
      legendClass.setAttribute("id", "legendId");
    }, 800);
  }

  function renderLegend(layerInfos) {
    console.log(layerInfos);
    let legend = new GIS.Map.Widgets.Legend(map.ObjMapView, layerInfos);
    legend.setStyle("card", "side-by-side");
    map.ObjMapView.ui.add(legend.create(), config.Position[2]);
    window.legend = legend;
    return window.legend;
  }

  function getAllPOI(id) {
    document.getElementById(id).addEventListener("change", function() {
      if (this.checked) {
        let layer = map.ObjMap.layers.items;
        if (Object.keys(layer).length > 0) {
          for (let key in layer) {
            map.ObjMap.remove(layer[key]);
          }
        }
        let idform = document.getElementById("atm");
        let layerArr = renderPOI(idform);
        for (let k = 0; k < layerArr.length; k++) {
          layerArr[k].render();
        }
        let layerInfo = setLayerInfos(layer);
        let layerInfos = distinct(layerInfo);
        if (
          document.getElementsByClassName("esri-legend--stacked")[0] ===
          undefined
        ) {
          renderLegend(layerInfos);
          setStyleLegendClass();
        } else {
          legend.LayerInfos.length = 0;
          for (let l = 0; l < layerInfos.length; l++) {
            legend.LayerInfos.push(layerInfos[l]);
          }
          legend.create();
        }
      } else {
        let layer = map.ObjMap.layers.items;
        let i;
        let idform = document.getElementById("atm");
        let poiForm = idform.querySelectorAll('input[type="checkbox"]');
        for (i = 0; i < poiForm.length; i++) {
          if (poiForm[i].checked == false) {
            for (let key in layer) {
              map.ObjMap.remove(layer[key]);
            }
          }
        }
        document.getElementById("legendId").remove();
      }
    });
  }

  function getPerPOI(id) {
    document.getElementById(id).addEventListener("change", function() {
      if (this.checked) {
        let idform = document.getElementById("atm");
        let layerArr = renderPOI(idform);
        for (let k = 0; k < layerArr.length; k++) {
          layerArr[k].render();
        }
        let layer = map.ObjMap.layers.items;
        let layerInfo = setLayerInfos(layer);
        let layerInfos = distinct(layerInfo);
        if (
          document.getElementsByClassName("esri-legend--stacked")[0] ===
          undefined
        ) {
          renderLegend(layerInfos);
          setStyleLegendClass();
        } else {
          let currentIndex = parseInt(layerInfos.length - 1);
          legend.LayerInfos.push(layerInfos[currentIndex]);
          legend.create();
        }
      } else {
        let layer = map.ObjMap.layers.items;
        let i;
        let idform = document.getElementById("atm");
        let poiForm = idform.querySelectorAll('input[type="checkbox"]');
        for (i = 0; i < poiForm.length; i++) {
          if (poiForm[i].checked == false) {
            for (let key in layer) {
              if (poiForm[i].value == layer[key].layerId) {
                map.ObjMap.remove(layer[key]);
              }
            }
          }
        }
        if (Object.keys(layer).length === 0) {
          document.getElementById("legendId").remove();
        }
      }
    });
  }

  storeDatabase
    .readUserAndDepartment()
    .then(function(result) {
      let data = JSON.parse(result);
      let arrData = [];
      let groupUserDepartment = [];
      let userIds = [];
      let usernames = [];
      let departments = [];
      let count = 1;
      for (var i = 0; i < data.length; i++) {
        if (count % 3 == 0) {
          arrData.push(data[i]);
          groupUserDepartment.push(arrData);
          arrData = [];
        } else {
          arrData.push(data[i]);
        }
        count++;
      }
      for (let i in groupUserDepartment) {
        if (userIds.includes(groupUserDepartment[i][0]) == false) {
          userIds.push(groupUserDepartment[i][0]);
        }
        if (usernames.includes(groupUserDepartment[i][1]) == false) {
          usernames.push(groupUserDepartment[i][1]);
        }
        if (departments.includes(groupUserDepartment[i][2]) == false) {
          departments.push(groupUserDepartment[i][2]);
        }
      }
      localStorage.setItem("userIds", JSON.stringify(userIds));
      localStorage.setItem("usernames", JSON.stringify(usernames));
    })
    .then(function() {
      storeDatabase.read().then(function(result) {
        console.log(result);
        if (result !== "[]" && localStorage.length < 3) {
          let data = JSON.parse(result);
          console.log(data);
          for (let i in data) {
            let tempCreatedBy = [];
            let tempColor = [];
            let tempLength = [];
            let tempData = [];
            if (data[i] instanceof Array) {
              for (let j in data[i]) {
                tempColor.push(data[i][j].color);
                tempCreatedBy.push(data[i][j].created_by);
                delete data[i][j].id;
                delete data[i][j].color;
                delete data[i][j].created_by;
              }
              tempLength = storeDatabase.countMultipleElements(tempCreatedBy);
              tempCreatedBy = [...new Set(tempCreatedBy)];
              tempColor = [...new Set(tempColor)];
              let length = data[i].length;
              let count = 0;
              for (let k = 0; k < length; k++) {
                for (let j = 0; j < tempLength.length; j++) {
                  if (count == tempLength[j] - 1) {
                    convertCSV.setColor(JSON.parse(tempColor[j]));
                    convertCSV.setCreatedBy(tempCreatedBy[j]);
                    tempColor.splice(0, 1);
                    tempCreatedBy.splice(0, 1);
                    tempData.push(data[i][k]);
                    convertCSV.processCSVData(
                      storeLocalStorage.getRowofTextArray(tempData),
                      false
                    );
                    tempData = [];
                    count = 0;
                    k = k + 1;
                  }
                }
                tempData.push(data[i][k]);
                count = count + 1;
              }
            } else {
              let s = data[i];
              let removeCreatedBy = s.slice(0, s.lastIndexOf("_"));
              let removeStorage = removeCreatedBy.slice(
                0,
                removeCreatedBy.lastIndexOf("_")
              );
              convertCSV.setNameFile(removeStorage);
            }
          }
        }
        console.log(JSON.parse(localStorage.getItem("data")));
      });
    });

  // getAllPOI("tall");
  // getAllPOI("tall-1");
  // getPerPOI("tall-1-1");
  // getPerPOI("tall-1-2");
  // getPerPOI("tall-1-3");
  // End Of Show & Hide POI from GIS Services

  document.getElementById("logout").addEventListener("click", function() {
    localStorage.clear();
  });
}
