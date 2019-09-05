function boot(GIS) {
  //Set highlight pointing to disable as started state
  localStorage.setItem("pointingHighlight", null);

  let config = new GIS.Config(); //Define Config class
  let map = new GIS.Map(config.CenterPoint); //Define Map class
  map.setBasemap(config.Basemap); //Set basemap to Topo Vector
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
        let _this = this;
        map.setMeasurementActiveWidget("distance");
        setTimeout(function() {
          let esriDirectLineClass = document.getElementsByClassName(
            "esri-direct-line-measurement-3d"
          )[0];
          esriDirectLineClass.style.display = "none";
        }, 800);
        map.ObjMapView.on("double-click", function(event) {
          document
            .getElementById("mapDiv")
            .setAttribute("style", "cursor:default;");
          _this.classList.remove("active");
        });
      } else {
        map.setMeasurementActiveWidget(null);
      }
    });

  document.getElementById("areaButton").addEventListener("click", function() {
    map.setMeasurementActiveWidget(null);
    if (!this.classList.contains("active")) {
      let _this = this;
      map.setMeasurementActiveWidget("area");
      setTimeout(function() {
        let esriAreaClass = document.getElementsByClassName(
          "esri-area-measurement-3d"
        )[0];
        esriAreaClass.style.display = "none";
      }, 800);
      map.ObjMapView.on("double-click", function(event) {
        document
          .getElementById("mapDiv")
          .setAttribute("style", "cursor:default;");
        _this.classList.remove("active");
      });
    } else {
      map.setMeasurementActiveWidget(null);
    }
  });

  // document
  //   .getElementById("deleteGraphics")
  //   .addEventListener("click", function() {
  //     map.setMeasurementActiveWidget(null);
  // })
  // Create a site
  map.ObjMapView.when(function() {
    let createSiteDiv = document.getElementById("create-site-div");
    createSiteDiv.style.display = "inline-block";

    let createSiteExpand = new ESRI.Expand({
      expandIconClass: "esri-icon-organization",
      view: map.ObjMapView,
      content: createSiteDiv,
      expanded: false,
      collapseIconClass: "esri-icon-close"
    });

    createSite(createSiteExpand, GIS, map);
    map.ObjMapView.ui.add(createSiteExpand, config.Position[6]);
  });

  let pointTheSiteEnabled = false;
  document
    .getElementById("point-the-site")
    .addEventListener("click", function() {
      pointTheSiteEnabled = true;
      document
        .getElementById("mapDiv")
        .setAttribute("style", "cursor:crosshair;");

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
        .setAttribute("style", "cursor:crosshair;");
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

  map.ObjMapView.popup.actionsMenuEnabled = false;
  // map.ObjMapView.popup.featureNavigationEnabled = false;

  // create instant analysis
  let pointEnabled = false;
  $(document).ready(function() {
    $("#pointing-btn").click(function() {
      pointEnabled = true;
      $("#mapDiv").attr("style", "cursor:crosshair;");
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
          pointing.setPictureMarker();
          pointing.render();
          $("#error-input-points").hide();
          $("#error-down-service").hide();

          $.addRows();
          $.each(window.counterArr, function(index, value) {
            if ($(".latitude-form-" + value).val() === "") {
              $(".latitude-form-" + value).val(latitude);
              $(".longitude-form-" + value).val(longitude);
              $(".latitude-form-" + value).attr(
                "title",
                "Latitude " + latitude
              );
              $(".longitude-form-" + value).attr(
                "title",
                "Longitude " + longitude
              );
              $("#form-list").delegate(
                ".selectbuffer-" + value,
                "click",
                function() {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
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
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
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
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
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
  analysisPoi(GIS, map);
  editAnalysis(GIS, map);
  // end of create instant analysis

  //Define Buffers
  bufferRadius(GIS, map);
  driveTime(GIS, map);
  driveTimeDistance(GIS, map);
  saveAnalysis(map);

  // sidebar/sidenav
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
      if (
        document.getElementById("myViewer").style.width > "0px" ||
        document.getElementById("mySiteAnalysis").style.width > "0px" ||
        document.getElementById("myAnalysisPOI").style.width > "0px"
      ) {
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
    } else if (
      document.getElementById("mySiteAnalysis").style.width > "0px" ||
      document.getElementById("myAnalysisPOI").style.width > "0px"
    ) {
      document.getElementById("mySiteAnalysis").style.width = "0";
      document.getElementById("myAnalysisPOI").style.width = "0";
      open_viewer();
    } else {
      open_viewer();
    }

    if (document.getElementById("mySidenav").style.width > "0px") {
      if (
        document.getElementById("mySidenav").classList.contains("panel-left")
      ) {
        document.getElementById("mySidenav").classList.remove("panel-left");
        document.getElementById("mySidenav").classList.add("panel-right");
        document.getElementById("main").style.marginRight = "320px";
        document
          .getElementById("mySidenav")
          .setAttribute("style", "width:320px;");
      }
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
      if (document.getElementById("mySidenav").style.width > "0px") {
        if ($("#mySidenav").hasClass("panel-left")) {
          $("#mySidenav").removeClass("panel-left");
          $("#mySidenav").addClass("panel-right");
          $("#main").css("margin-right", "320px");
          $("#mySidenav").css("width", "320px");
        }
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
    title: "Point this Site",
    id: "point-this",
    className: "esri-icon-map-pin onemap-pointing"
  };
  var editThisAction = {
    title: "Edit Site",
    id: "edit-this",
    className: "esri-icon-edit onemap-edit"
  };
  var removeThisPoint = {
    title: "Remove Site",
    id: "remove-this",
    className: "esri-icon-trash onemap-remove"
  };
  delete map.ObjMapView.popup.actions.items[0];
  map.ObjMapView.popup.actions.push(pointThisAction);
  map.ObjMapView.popup.actions.push(editThisAction);
  map.ObjMapView.popup.actions.push(removeThisPoint);
  map.ObjMapView.popup.on("trigger-action", ({ action }) => {
    if (action.id === "point-this") {
      let mySidenav = document.getElementById("mySidenav");
      if (
        document.getElementById("myViewer").style.width > "0px" ||
        document.getElementById("mySiteAnalysis").style.width > "0px"
      ) {
        mySidenav.classList.add("panel-right");
        document.getElementById("main").style.marginRight = "320px";
        mySidenav.setAttribute("style", "width:320px;");
        if (mySidenav.classList.contains("panel-left")) {
          mySidenav.classList.remove("panel-left");
        }
      } else {
        openNav();
      }

      var S = map.ObjMapView.popup.title;
      if (S.includes("Buffer") === false && S.includes("Driving") === false) {
        let attr = map.ObjMapView.popup.selectedFeature;
        let lat = attr.geometry.latitude;
        let lon = attr.geometry.longitude;

        let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
        pointing.setPointingPopupMarker();
        pointing.render();
        $("#error-input-points").hide();
        $("#error-down-service").hide();

        $.addRows();
        $.each(window.counterArr, function(index, value) {
          if ($(".latitude-form-" + value).val() === "") {
            $(".latitude-form-" + value).val(lat);
            $(".longitude-form-" + value).val(lon);
            $(".latitude-form-" + value).attr("title", "Latitude " + lat);
            $(".longitude-form-" + value).attr("title", "Longitude " + lon);
            $("#form-list").delegate(
              ".selectbuffer-" + value,
              "click",
              function() {
                $("#error-input-buffer").hide();
                $("#error-down-service").hide();
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
                $("#error-input-buffer").hide();
                $("#error-down-service").hide();
                $.get("content/template/instant_analysis/driving.php", function(
                  data
                ) {
                  $(".form-drive-" + value).append(data);
                });
              }
            );
            $("#form-list").delegate(
              ".selectdrive-distance-" + value,
              "click",
              function() {
                $("#error-input-buffer").hide();
                $("#error-down-service").hide();
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
    }
  });

  map.ObjMapView.popup.on("trigger-action", ({ action }) => {
    if (action.id === "edit-this") {
      alert("EDIT");
    }
  });

  map.ObjMapView.popup.on("trigger-action", ({ action }) => {
    if (action.id === "remove-this") {
      let confirmBox = new GIS.Buffer.ConfirmBox(
        "Remove this point?",
        "Yes",
        "No",
        "remove-point-yes",
        "remove-point-no",
        function() {
          console.log(map.ObjMapView.popup.selectedFeature);
          console.log(map.ObjMap.layers);
          // map.ObjMap.remove(map.ObjMapView.popup.selectedFeature);
        }
      );
      confirmBox.show();
    }
  });
  // end of drag and drop

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

  let poi = new GIS.Buffer.POI(map.ObjMapView, fields);
  // poi.run();
  // end of widget color picker and render poi

  // Show & Hide POI from GIS Services
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
      localStorage.setItem(
        "groupUserDepartment",
        JSON.stringify(groupUserDepartment)
      );
      localStorage.setItem("userIds", JSON.stringify(userIds));
      localStorage.setItem("usernames", JSON.stringify(usernames));
      localStorage.setItem("departments", JSON.stringify(departments));
    })
    .then(function() {
      showCurrentDepartment(
        JSON.parse(localStorage.getItem("groupUserDepartment"))
      );
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

  submitFilterServices(storeLocalStorage, map, convertCSV);
  inputFilter(); //inputFilter to handle keyboard input specifications
  multiSelect();
  inputCheckboxPropertyStatus();
  inputCheckboxServices(GIS, map);
  saveDataServiceToLocalStorage();
  removeFilterResults(map);
  createOverlap(GIS, map);
  viewTableServices(map);
  zoomToLayer(map);
  expandCheckboxServices();
  createQueryShape(GIS, map, convertCSV);
  // selectUnitSize();

  $("input[name='popup-input-min']").click(function() {
    $("#popup-alert").toggleClass("show");
  });

  //Toggle i-tree child
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

  //Toggle i-tree-layers child
  $(document).delegate(".i-tree-layers", "click", function() {
    $(this)
      .siblings("ul")
      .toggle();
  });

  //Date Picker function to generating calendar and choose a date (Used for 'from' and 'to')
  $(function() {
    let dateFormat = "mm/dd/yy",
      from = $("#time-period-from-value")
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          changeYear: true
        })
        .on("change", function() {
          to.datepicker("option", "minDate", getDate(this));
        }),
      to = $("#time-period-to-value")
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
        console.log(dateFormat);
        date = $.datepicker.parseDate(dateFormat, element.value);
      } catch (error) {
        date = null;
      }
      return date;
    }
  });

  // Generate link to Census tract details
  map.ObjMapView.when(function() {
    on(map.ObjMapView, "click", displayTractID);
  });

  var measureThisAction = {
    title: "Measure Length",
    id: "measure-this",
    image:
      "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png",
    label: "OK"
  };

  let colliersServicePopupTemplate = {
    title: "Colliers Property",
    content: "{*}",
    id: "collierspopup"
  };

  let colliersRenderer = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "assets/images/icons/OB-blue.png",
      width: "20px",
      height: "20px"
    }
  };

  let colliersService = new ESRI.FeatureLayer({
    url:
      "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: colliersServicePopupTemplate,
    renderer: colliersRenderer
  });

  function displayTractID(event) {
    var screenPoint = {
      x: event.x,
      y: event.y
    };

    // Search for graphics at the clicked location
    map.ObjMapView.hitTest(screenPoint).then(function(response) {
      // console.log(response)
      if (response.results.length) {
        var graphic = response.results.filter(function(result) {
          // check if the graphic belongs to the layer of interest
          return result.graphic.layer === colliersService;
        })[0].graphic;
        // do something with the result graphic
        console.log(graphic);
      }
    });
  }

  //Auto change size popup
  var $element = $("#popupFilter");
  var lastHeight = $("#popupFilter").css("width");
  function checkForChanges() {
    if ($element.css("width") != lastHeight) {
      lastHeight = $element.css("width");
      if (lastHeight < "800px" && lastHeight > "600px") {
        $("#table-popup-colliers").css("display", "block");
        $(".font-popup").css("font-size", "8px");
      } else if (lastHeight >= "800px") {
        $("#table-popup-colliers").css("display", "block");
        $(".font-popup").css("font-size", "11px");
      } else if (lastHeight < "600px") {
        $("#table-popup-colliers").css("display", "none");
      }
    }
    setTimeout(checkForChanges, 500);
  }

  $(document).click(function() {
    checkForChanges();
  });

  // Set up a click event handler and retrieve the screen point
  map.ObjMapView.on("click", function(evt) {
    var screenPoint = evt.screenPoint;

    // the hitTest() checks to see if any graphics in the view
    // intersect the given screen point
    map.ObjMapView.hitTest(screenPoint).then(getGraphics);
  });

  function getGraphics(response) {
    if (response.results.length > 0) {
      //Make temporary data dummy for popup
      console.log(response.results);
      //console.log(response.results);
      localStorage.setItem(
        "selectedFeatureFilterLatitude",
        JSON.stringify(response.results[0].graphic.geometry.latitude)
      );
      localStorage.setItem(
        "selectedFeatureFilterLongitude",
        JSON.stringify(response.results[0].graphic.geometry.longitude)
      );

      //Land Rows
      let landSizeSqmGrossIDR = 5300;
      let landSizeSqmGrossUSD = 0;
      let landSizeSqmSGAIDR = 0;
      let landSizeSqmSGAUSD = 0;
      let landSizeUnitKeysIDR = 0;
      let landSizeUnitKeysUSD = 0;
      let landPricePerSqmGrossIDR = 2500;
      let landPricePerSqmGrossUSD = 0;
      let landPricePerSqmSGAIDR = 0;
      let landPricePerSqmSGAUSD = 0;
      let landPricePerUnitKeyIDR = 0;
      let landPricePerUnitKeyUSD = 0;
      let landPriceTotalIDR = 0;
      let landPriceTotalUSD = 0;
      let landPricePerSqmIDR = 0;
      let landPricePerSqmUSD = 0;
      let landNJOPPercentIDR = 0;
      let landNJOPPercentUSD = 0;
      let landTotalIDR = landSizeSqmGrossIDR * landPricePerSqmGrossIDR;
      let landTotalUSD = null;
      if (landTotalIDR !== null) {
        landTotalUSD = landTotalIDR / 14266.4;
        $("#landTotalIDR").css("font-weight", "bold");
      } else if (landTotalUSD !== null) {
        landTotalIDR = landTotalUSD * 14266.4;
      }

      //Building Rows
      let buildingSizeSqmGrossIDR = 0;
      let buildingSizeSqmGrossUSD = 0;
      let buildingSizeSqmSGAIDR = 0;
      let buildingSizeSqmSGAUSD = 0;
      let buildingSizeUnitKeysIDR = 0;
      let buildingSizeUnitKeysUSD = 0;
      let buildingPricePerSqmGrossIDR = 0;
      let buildingPricePerSqmGrossUSD = 0;
      let buildingPricePerSqmSGAIDR = 0;
      let buildingPricePerSqmSGAUSD = 0;
      let buildingPricePerUnitKeyIDR = 0;
      let buildingPricePerUnitKeyUSD = 0;
      let buildingPriceTotalIDR = 0;
      let buildingPriceTotalUSD = 0;
      let buildingPricePerSqmIDR = 0;
      let buildingPricePerSqmUSD = 0;
      let buildingNJOPPercentIDR = 0;
      let buildingNJOPPercentUSD = 0;
      let buildingTotalIDR = null;
      let buildingTotalUSD = 500;
      if (buildingTotalIDR !== null) {
        buildingTotalUSD = buildingTotalIDR / 14266.4;
        $("#buildingTotalIDR").css("font-weight", "bold");
      } else if (buildingTotalUSD !== null) {
        buildingTotalIDR = buildingTotalUSD * 14266.4;
      }

      //Total Rows
      let totalSizeSqmGrossIDR = 0;
      let totalSizeSqmGrossUSD = 0;
      let totalSizeSqmSGAIDR = 0;
      let totalSizeSqmSGAUSD = 0;
      let totalSizeUnitKeysIDR = 0;
      let totalSizeUnitKeysUSD = 0;
      let totalPricePerSqmGrossIDR = 0;
      let totalPricePerSqmGrossUSD = 0;
      let totalPricePerSqmSGAIDR = 0;
      let totalPricePerSqmSGAUSD = 0;
      let totalPricePerUnitKeyIDR = 0;
      let totalPricePerUnitKeyUSD = 0;
      let totalPriceTotalIDR = 0;
      let totalPriceTotalUSD = 0;
      let totalPricePerSqmIDR = 0;
      let totalPricePerSqmUSD = 0;
      let totalNJOPPercentIDR = 0;
      let totalNJOPPercentUSD = 0;
      let totalTotalIDR = null;
      let totalTotalUSD = 500;
      if (totalTotalIDR !== null) {
        totalTotalUSD = totalTotalIDR / 14266.4;
        $("#totalTotalIDR").css("font-weight", "bold");
      } else if (totalTotalUSD !== null) {
        totalTotalIDR = totalTotalUSD * 14266.4;
        $("#totalTotalUSD").css("font-weight", "bold");
      }

      //KLB Rows
      let KLBTotalIDR = 50000000;
      let KLBTotalUSD = null;
      if (KLBTotalIDR !== null) {
        KLBTotalUSD = KLBTotalIDR / 14266.4;
        $("#KLBTotalIDR").css("font-weight", "bold");
      } else if (KLBTotalUSD !== null) {
        KLBTotalIDR = KLBTotalUSD * 14266.4;
        $("#KLBTotalUSD").css("font-weight", "bold");
      }
      let KLBKLBIDR = 120000;
      let KLBKLBUSD = null;
      if (KLBKLBIDR !== null) {
        KLBKLBUSD = KLBKLBIDR / 14266.4;
        $("#KLBKLBIDR").css("font-weight", "bold");
      } else if (KLBKLBUSD !== null) {
        KLBKLBIDR = KLBKLBUSD * 14266.4;
        $("#KLBKLBUSD").css("font-weight", "bold");
      }
      let KLBLandSqmIDR = 5000;
      let KLBLandSqmUSD = null;
      if (KLBLandSqmIDR !== null) {
        KLBLandSqmUSD = KLBLandSqmIDR / 14266.4;
        $("#KLBLandSqmIDR").css("font-weight", "bold");
      } else if (KLBLandSqmUSD !== null) {
        KLBLandSqmIDR = KLBLandSqmUSD * 14266.4;
        $("#KLBLandSqmUSD").css("font-weight", "bold");
      }
      let KLBBuildableSqmIDR = KLBTotalIDR / (KLBKLBIDR * KLBLandSqmIDR);
      let KLBBuildableSqmUSD = KLBTotalUSD / (KLBKLBUSD * KLBLandSqmUSD);

      let attr = Object.keys(response.results[0].graphic.attributes);
      let imageUrl = response.results[0].graphic.attributes.photo;
      let propertytype = response.results[0].graphic.attributes.propertytype;
      let buildingName = response.results[0].graphic.attributes.buildingname;
      let address = response.results[0].graphic.attributes.address;
      let lastupdate = response.results[0].graphic.attributes.lastupdate;
      let d = new Date(lastupdate);
      lastupdate =
        d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      if (lastupdate === "NaN-NaN-NaN") {
        lastupdate = "-";
      }
      if (attr.includes("propertytype")) {
        $(".popupFilter").show();
        $(".image-property").css("background-image", "url(" + imageUrl + ")");
        $(".image-property").css("background-size", "100% 100%");
        $("#propertytype-popup").text(
          "PROPERTY TYPE : " + propertytype.toUpperCase()
        );
        $("#lastupdate-popup").text("Last updated : " + lastupdate);
        $("#buildingName-popup").text("Land at " + buildingName);
        $("#address-popup").text(address);

        //Land views
        $("#landTotalIDR").text(
          landTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landTotalUSD").text(
          landTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmGrossIDR").text(
          landSizeSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmGrossUSD").text(
          landSizeSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmSGAIDR").text(
          landSizeSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmSGAUSD").text(
          landSizeSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeUnitKeysIDR").text(
          landSizeUnitKeysIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeUnitKeysUSD").text(
          landSizeUnitKeysUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmGrossIDR").text(
          landPricePerSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmGrossUSD").text(
          landPricePerSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmSGAIDR").text(
          landPricePerSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmSGAUSD").text(
          landPricePerSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerUnitKeyIDR").text(
          landPricePerUnitKeyIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerUnitKeyUSD").text(
          landPricePerUnitKeyUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPriceTotalIDR").text(
          landPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPriceTotalUSD").text(
          landPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmIDR").text(
          landPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmUSD").text(
          landPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPercentIDR").text(
          landNJOPPercentIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPercentUSD").text(
          landNJOPPercentUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        //building views
        $("#buildingTotalIDR").text(
          buildingTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingTotalUSD").text(
          buildingTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmGrossIDR").text(
          buildingSizeSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmGrossUSD").text(
          buildingSizeSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmSGAIDR").text(
          buildingSizeSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmSGAUSD").text(
          buildingSizeSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeUnitKeysIDR").text(
          buildingSizeUnitKeysIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeUnitKeysUSD").text(
          buildingSizeUnitKeysUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmGrossIDR").text(
          buildingPricePerSqmGrossIDR
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmGrossUSD").text(
          buildingPricePerSqmGrossUSD
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmSGAIDR").text(
          buildingPricePerSqmSGAIDR
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmSGAUSD").text(
          buildingPricePerSqmSGAUSD
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerUnitKeyIDR").text(
          buildingPricePerUnitKeyIDR
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerUnitKeyUSD").text(
          buildingPricePerUnitKeyUSD
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPriceTotalIDR").text(
          buildingPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPriceTotalUSD").text(
          buildingPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmIDR").text(
          buildingPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmUSD").text(
          buildingPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPercentIDR").text(
          buildingNJOPPercentIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPercentUSD").text(
          buildingNJOPPercentUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        //total views
        $("#totalTotalIDR").text(
          totalTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalTotalUSD").text(
          totalTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmGrossIDR").text(
          totalSizeSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmGrossUSD").text(
          totalSizeSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmSGAIDR").text(
          totalSizeSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmSGAUSD").text(
          totalSizeSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeUnitKeysIDR").text(
          totalSizeUnitKeysIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeUnitKeysUSD").text(
          totalSizeUnitKeysUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmGrossIDR").text(
          totalPricePerSqmGrossIDR
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmGrossUSD").text(
          totalPricePerSqmGrossUSD
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmSGAIDR").text(
          totalPricePerSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmSGAUSD").text(
          totalPricePerSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerUnitKeyIDR").text(
          totalPricePerUnitKeyIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerUnitKeyUSD").text(
          totalPricePerUnitKeyUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPriceTotalIDR").text(
          totalPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPriceTotalUSD").text(
          totalPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmIDR").text(
          totalPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmUSD").text(
          totalPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPercentIDR").text(
          totalNJOPPercentIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPercentUSD").text(
          totalNJOPPercentUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        //KLB views
        $("#KLBTotalIDR").text(
          KLBTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBTotalUSD").text(
          KLBTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBKLBIDR").text(
          KLBKLBIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBKLBUSD").text(
          KLBKLBUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBLandSqmIDR").text(
          KLBLandSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBLandSqmUSD").text(
          KLBLandSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBBuildableSqmIDR").text(
          KLBBuildableSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBBuildableSqmUSD").text(
          KLBBuildableSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        $(".image-property").error(function() {
          $(this).attr("src", "assets/images/no-photo.png");
        });
      }

      //Highlight pointing
      let lat = response.results[0].graphic.geometry.latitude;
      let lon = response.results[0].graphic.geometry.longitude;
      let posLat = lat + 0.04;
      let posLon = lon;
      console.log(lat);
      console.log(lon);
      for (let i = 0; i <= map.ObjMapView.graphics.items.length - 1; i++) {
        if (map.ObjMapView.graphics.items[i].attributes.hasOwnProperty("id")) {
          if (
            map.ObjMapView.graphics.items[i].attributes.id ==
            localStorage.getItem("pointingHighlight")
          ) {
            map.ObjMapView.graphics.items[i].visible = false;
            map.ObjMapView.graphics.items.splice(i, 1);
          }
        }
      }
      localStorage.setItem(
        "pointingHighlight",
        lat.toString() + lon.toString()
      );
      let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
      pointing.setPointingPopupMarker();
      if (attr.includes("propertytype")) {
        pointing.positionFixing(posLat, posLon);
      }
      pointing.render();
      //End of Highlight pointing
    } else {
      $(".popupFilter").hide();
      for (let i = 0; i <= map.ObjMapView.graphics.items.length - 1; i++) {
        if (map.ObjMapView.graphics.items[i].attributes.hasOwnProperty("id")) {
          if (
            map.ObjMapView.graphics.items[i].attributes.id ==
            localStorage.getItem("pointingHighlight")
          ) {
            map.ObjMapView.graphics.items[i].visible = false;
            map.ObjMapView.graphics.items.splice(i, 1);
          }
        }
      }
      localStorage.setItem("pointingHighlight", null);
    }
  }

  $(document).ready(function() {
    let divButton = $("<div></div>");
    let button = $("<button></button>").text("OK");
    $(button).attr("id", "button-ok-property");
    $(button).attr("class", "btn btn-primary button-ok-property");
    $(divButton).append(button);
    $(".ms-options").append(divButton);
  });

  $("#checkbox-colliers-property").click(function() {
    if ($(this).prop("checked") == true) {
      map.ObjMap.add(colliersService);
    } else if ($(this).prop("checked") == false) {
      map.ObjMap.remove(colliersService);
    }
  });

  $(document).delegate("#button-ok-property", "click", function() {
    $(".ms-options-wrap").removeClass("ms-active");
  });

  $("html").click(function() {
    let property = $(".dropdown-content-property");
    let department = $(".dropdown-content-department");
    $(property).hide();
    $(department).hide();
  });

  $(".dropdown-content-property").click(function(event) {
    event.stopPropagation();
  });
  $(".dropdown-content-department").click(function(event) {
    event.stopPropagation();
  });
  $("#dropdown-property-div").click(function(event) {
    event.stopPropagation();
    $(".dropdown-content-property").toggle();
  });
  $("#dropdown-department-div").click(function(event) {
    event.stopPropagation();
    $(".dropdown-content-department").toggle();
  });

  $.get("popupLayout.html", function(data) {
    localStorage.setItem("popupLayout", JSON.stringify(data));
  });

  $("input:radio").on("click", function(e) {
    var inp = $(this);
    if (inp.is(".theone")) {
      inp.prop("checked", false).removeClass("theone");
    } else {
      $("input:radio[name='" + inp.prop("name") + "'].theone").removeClass(
        "theone"
      );
      inp.addClass("theone");
    }
  });

  $("#close-popup-property").click(function() {
    $(".popupFilter").hide();
    for (let i = 0; i <= map.ObjMapView.graphics.items.length - 1; i++) {
      if (map.ObjMapView.graphics.items[i].attributes.hasOwnProperty("id")) {
        if (
          map.ObjMapView.graphics.items[i].attributes.id ==
          localStorage.getItem("pointingHighlight")
        ) {
          map.ObjMapView.graphics.items[i].visible = false;
          map.ObjMapView.graphics.items.splice(i, 1);
        }
      }
    }
  });

  $("#pointer-popup").click(function() {
    let mySidenav = document.getElementById("mySidenav");
    if (
      document.getElementById("myViewer").style.width > "0px" ||
      document.getElementById("mySiteAnalysis").style.width > "0px"
    ) {
      mySidenav.classList.add("panel-right");
      document.getElementById("main").style.marginRight = "320px";
      mySidenav.setAttribute("style", "width:320px;");
      if (mySidenav.classList.contains("panel-left")) {
        mySidenav.classList.remove("panel-left");
      }
    } else {
      openNav();
    }
    let lat = JSON.parse(localStorage.getItem("selectedFeatureFilterLatitude"));
    let lon = JSON.parse(
      localStorage.getItem("selectedFeatureFilterLongitude")
    );

    let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
    pointing.setPointingPopupMarker();
    pointing.render();

    $("#error-input-points").hide();
    $("#error-down-service").hide();
    $(".popupFilter").hide();
    $.addRows();
    $.each(window.counterArr, function(index, value) {
      if ($(".latitude-form-" + value).val() === "") {
        $(".latitude-form-" + value).val(lat);
        $(".longitude-form-" + value).val(lon);
        $(".latitude-form-" + value).attr("title", "Latitude " + lat);
        $(".longitude-form-" + value).attr("title", "Longitude " + lon);
        $("#form-list").delegate(".selectbuffer-" + value, "click", function() {
          $("#error-input-buffer").hide();
          $("#error-down-service").hide();
          $.get("content/template/instant_analysis/buffer.php", function(data) {
            $(".form-buffer-" + value).append(data);
          });
        });
        $("#form-list").delegate(".selectdrive-" + value, "click", function() {
          $("#error-input-buffer").hide();
          $("#error-down-service").hide();
          $.get("content/template/instant_analysis/driving.php", function(
            data
          ) {
            $(".form-drive-" + value).append(data);
          });
        });
        $("#form-list").delegate(
          ".selectdrive-distance-" + value,
          "click",
          function() {
            $("#error-input-buffer").hide();
            $("#error-down-service").hide();
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
  });

  //Clear the localstorage when user logout
  document.getElementById("logout").addEventListener("click", function() {
    localStorage.clear();
  });
}
