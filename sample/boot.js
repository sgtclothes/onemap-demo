function boot(GIS) {
  let config = new GIS.Config(); //Define Config class
  let map = new GIS.Map(config.CenterPoint); //Define Map class
  map.setBasemap("topo-vector"); //Set basemap to Topo Vector
  map.addPrintWidget(config.PrintServiceUrl, config.Position[5]); //Adding print widget
  map.addMeasurementWidget(); //Adding measurement widget
  map.addLocateWidget(config.Position[5]); //Adding locate widget
  map.addSearchWidget(config.Position[6]); //Adding task search to map
  map.addBasemapGalleryWidget(
    //Adding basemap gallery widget
    {
      portal: {
        url: "https://www.arcgis.com",
        useVectorBasemaps: true
      }
    },
    config.Position[6]
  );
  map.render(); //Map rendering

  //Add Measurement to Map
  let measureBar = document.getElementById("topbar");
  measureBar.style.display = "block";
  map.ObjMapView.ui.add("topbar", config.Position[1]);
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

  // Create a site
  map.ObjMapView.when(function() {
    let createSiteDiv = document.getElementById("create-site-div");
    createSiteDiv.style.display = "inline-block";

    let createSiteExpand = new ESRI.Expand({
      expandIconClass: "esri-icon-organization",
      view: map.ObjMapView,
      content: createSiteDiv,
      expanded: false
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

      document
        .getElementById("create-site-div")
        .setAttribute(
          "style",
          "background: rgba(255, 255, 255, 0.8) none repeat scroll 0% 0%; display:none; width: 500px;"
        );

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
      }).latitude.toFixed(7);

      let longitude = map.ObjMapView.toMap({
        x: event.x,
        y: event.y
      }).longitude.toFixed(7);

      document.getElementById("lat-site").value = latitude;
      document.getElementById("lon-site").value = longitude;
      document
        .getElementById("create-site-div")
        .setAttribute(
          "style",
          "background: rgba(255, 255, 255, 0.8) none repeat scroll 0% 0%; display:inline-block; width: 500px;"
        );
    }
    if (pointTheSiteEnabled == false) {
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:default;");
    }
  });
  // END of create a site

  // create instant analysis
  let pointEnabled = false;
  $(document).ready(function() {
    $("#pointing-btn").click(function() {
      pointEnabled = true;
      $("#mapDiv").attr("style", "cursor:pointer;");
      map.ObjMapView.on("click", function(event) {
        if (pointEnabled) {
          pointEnabled = !pointEnabled;
          let latitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
          }).latitude.toFixed(7);

          let longitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
          }).longitude.toFixed(7);

          let pointing = new GIS.Buffer.Pointing(
            map.ObjMapView,
            latitude,
            longitude
          );
          pointing.render();

          $.addRows();
          $.each(window.counterArr, function(index, value) {
            if ($(".latitude-form-" + value).val() === "") {
              $(".latitude-form-" + value).val(latitude);
              $(".longitude-form-" + value).val(longitude);
              $("#form-list").delegate(
                ".selectbuffer-" + value,
                "click",
                function() {
                  $.get(
                    "content/template/instant_analysis/buffer.php",
                    function(data) {
                      $(".form-buffer-" + value).append(data);
                    }
                  );
                }
              );
              $("#form-list").delegate(
                ".selectdrive-" + value,
                "click",
                function() {
                  $.get(
                    "content/template/instant_analysis/driving.php",
                    function(data) {
                      $(".form-drive-" + value).append(data);
                    }
                  );
                }
              );
              $("#form-list").delegate(
                ".selectdrive-distance-" + value,
                "click",
                function() {
                  $.get(
                    "content/template/instant_analysis/driving_distance.php",
                    function(data) {
                      $(".form-drive-distance-" + value).append(data);
                    }
                  );
                }
              );
            }
          });
        }
        if (pointEnabled == false) {
          $("#mapDiv").attr("style", "cursor:default;");
        }
      });
    });
  });
  createMarker(GIS, map);
  createMarkerFromSite(GIS, map);
  createMarkerFromCSV(GIS, map);
  analysispoi(GIS, map);
  // end of create instant analysis

  //Define Buffers
  bufferRadius(GIS, map, config);
  driveTime(GIS, map);
  driveTimeDistance(GIS, map);

  // sidebar/sidenav
  function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
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
          document.getElementById("form-filter").style.display = "none";
        } else {
          openNav();
        }
      }
    });

  function open_viewer() {
    setTimeout(function() {
      map.addWidget(dragCSVButton(), config.Position[6]);
    }, 1000);
    document.getElementById("myViewer").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
  }

  function close_viewer() {
    document.getElementById("myViewer").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  document.getElementById("closeviewer").addEventListener("click", function() {
    document.getElementById("form-filter").style.display = "none";
    document.getElementById("myViewer").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    $(".esri-ui-top-right")
      .children("#drag-csv")
      .remove();
  });

  function dragCSVButton() {
    let button = document.createElement("BUTTON");
    button.setAttribute("id", "drag-csv");
    button.setAttribute("class", "btn btn-primary");
    button.innerHTML = "Drag CSV";
    return button;
  }

  document.getElementById("viewer-nav").addEventListener("click", function() {
    if (document.getElementById("myViewer").style.width > "0px") {
      $(".esri-ui-top-right")
        .children("#drag-csv")
        .remove();
      close_viewer();
      document.getElementById("form-filter").style.display = "none";
    } else if (document.getElementById("mySiteAnalysis").style.width > "0px") {
      document.getElementById("mySiteAnalysis").style.width = "0";
      open_viewer();
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

  var siteAnalysis = document.getElementById("mySiteAnalysis");
  function open_site_analysis() {
    siteAnalysis.style.width = "320px";
    document.getElementById("main").style.marginLeft = "320px";
  }

  function close_site_analysis() {
    siteAnalysis.style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  document
    .getElementById("closeSiteAnalysis")
    .addEventListener("click", function() {
      document.getElementById("mySiteAnalysis").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    });

  document
    .getElementById("site-analysis")
    .addEventListener("click", function() {
      let viewer = document.getElementById("myViewer");
      if (viewer.style.width > "0px") {
        $(".esri-ui-top-right")
          .children("#drag-csv")
          .remove();
        close_viewer();
        open_site_analysis();
      } else if (siteAnalysis.style.width > "0px") {
        close_site_analysis();
      } else {
        open_site_analysis();
      }
      if ($("#mySidenav").hasClass("panel-left")) {
        $("#mySidenav").removeClass("panel-left");
        $("#mySidenav").addClass("panel-right");
        $("#main").css("margin-right", "320px");
        $("#mySidenav").css("width", "320px");
      }
    });

  //end of sidebar/sidenav

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
  var pointColors = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let convertCSV = new GIS.Buffer.ConvertCSV(
    map.ObjMap,
    map.ObjMapView,
    pointColors
  );
  convertCSV.setupDropZone();
  var pointThisAction = {
    title: "Pointing",
    id: "point-this",
    className: "esri-icon-map-pin"
  };
  delete map.ObjMapView.popup.actions.items[0];
  map.ObjMapView.popup.actions.push(pointThisAction);
  map.ObjMapView.popup.on("trigger-action", ({ action }) => {
    if (action.id === "point-this") {
      var S = map.ObjMapView.popup.title;
      if (S.includes("Buffer") === false || S.includes("Driving") === false) {
        function isFloat(n) {
          return Number(n) === n && n % 1 !== 0;
        }
        let attr = map.ObjMapView.popup.selectedFeature.attributes;
        var lat;
        var lon;
        for (let key in attr) {
          if (isFloat(attr[key])) {
            if (
              typeof attr[key] === "number" &&
              attr[key] >= -90 &&
              attr[key] <= 90
            ) {
              lat = attr[key];
            } else if (
              typeof attr[key] === "number" &&
              attr[key] >= -180 &&
              attr[key] <= 180
            ) {
              lon = attr[key];
            }
          }
        }
        $.addRows();
        $.each(window.counterArr, function(index, value) {
          if ($(".latitude-form-" + value).val() === "") {
            $(".latitude-form-" + value).val(lat);
            $(".longitude-form-" + value).val(lon);
            $("#form-list").delegate(
              ".selectbuffer-" + value,
              "click",
              function() {
                $.get("content/template/instant_analysis/buffer.php", function(
                  data
                ) {
                  $(".form-buffer-" + value).append(data);
                });
              }
            );
            $("#form-list").delegate(
              ".selectdrive-" + value,
              "click",
              function() {
                $.get("content/template/instant_analysis/driving.php", function(
                  data
                ) {
                  $(".form-drive-" + value).append(data);
                });
              }
            );
          }
        });
      }
    }
  });
  //end of drag and drop

  // widget color picker and render poi
  // let colorsDiv = document.getElementById("colors-div");
  // let colorsExpand = new ESRI.Expand({
  //   expandIconClass: "esri-icon-experimental",
  //   view: map.ObjMapView,
  //   content: colorsDiv
  // });

  // document.getElementById("color-picker").addEventListener("click", function() {
  //   if (colorsDiv.style.display == "none") {
  //     map.ObjMapView.ui.add(colorsExpand, config.Position[6]);
  //     colorsDiv.style.display = "inline-block";
  //   } else {
  //     colorsDiv.style.display = "none";
  //     map.ObjMapView.ui.remove(colorsExpand);
  //   }
  // });

  $(document).delegate("#drag-csv", "click", function() {
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

  console.log(localStorage.getItem("namefile-database"));

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
  viewer.filterData();

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
      console.log(userIds)
      console.log(usernames)
      console.log(departments)
      localStorage.setItem("userIds", JSON.stringify(userIds));
      localStorage.setItem("usernames", JSON.stringify(usernames));
      localStorage.setItem("departments", JSON.stringify(departments));
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
                    map.ObjMapView.graphics.items = [];
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

  ServiceLayerPOI(GIS, map, config);
  ServiceLayerInfrastructure(GIS, map, config);
  ServiceLayerDemographic(GIS, map, config);
  submitFilter(storeLocalStorage,map.ObjMapView,convertCSV);

  $(document).delegate("#operator-ba", "click", function() {
    if ($("#operator-ba").val() == "between") {
      $("#building-area-filter-between").show();
    } else {
      $("#building-area-filter-between").hide();
    }
  });

  $(document).delegate("#operator-la", "click", function() {
    if ($("#operator-la").val() == "between") {
      $("#land-area-filter-between").show();
    } else {
      $("#land-area-filter-between").hide();
    }
  });

  $(document).delegate("#operator-price", "click", function() {
    if ($("#operator-price").val() == "between") {
      $("#price-filter-between").show();
    } else {
      $("#price-filter-between").hide();
    }
  });

  $(document).delegate(".i-tree", "click", function() {
    $(this)
      .siblings("ul")
      .find("li")
      .toggle();
    $(this)
      .siblings("div")
      .children()
      .find("li")
      .toggle();
  });

  $(document).delegate(".i-tree-layers", "click", function() {
    $(this)
      .siblings("ul")
      .toggle();
  });

  $(document).delegate("#button-form-filter", "click", function() {
    $("#form-filter").toggle();
  });

  $(function() {
    let dateFormat = "mm/dd/yy",
      from = $("#input-date-from")
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          changeYear: true
        })
        .on("change", function() {
          to.datepicker("option", "minDate", getDate(this));
        }),
      to = $("#input-date-to")
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          changeYear: true
        })
        .on("change", function() {
          from.datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
      var date;
      try {
        date = $.datepicker.parseDate(dateFormat, element.value);
      } catch (error) {
        date = null;
      }
      return date;
    }
  });

  console.log(JSON.parse(localStorage.getItem("usernames")))
  console.log(JSON.parse(localStorage.getItem("departments")))

  document.getElementById("logout").addEventListener("click", function() {
    localStorage.clear();
  });
}
