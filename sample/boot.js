function boot(GIS) {
  //Set highlight pointing to disable as started state
  localStorage.setItem("pointingHighlight", null);

  let config = new GIS.Config(); //Define Config class
  let map = new GIS.Map(config.CenterPoint); //Define Map class
  map.setBasemap(config.Basemap); //Set basemap to Topo Vector
  map.addPrintWidget(config.PrintServiceUrl, config.Position[5]); //Adding print widget
  map.addMeasurementWidget(); //Adding measurement widget
  map.addLocateWidget(config.Position[5]); //Adding locate widget
  // map.addSearchWidget(config.Position[6]); //Adding task search to map
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
  var search = new ESRI.Search( //Add search widget in sidenav layers
    {
      view: map.ObjMapView
    },
    "search-widget-property"
  );

  search.on("search-complete", function (res) {
    setTimeout(function () {
      console.log("OK")
      map.ObjMapView.goTo({
        target: [res.results[0].results[0].extent.center.longitude, res.results[0].results[0].extent.center.latitude],
        zoom: 17
      });
    }, 500)
  })

  // Create a site
  map.ObjMapView.when(function () {
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
    .addEventListener("click", function () {
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

  map.ObjMapView.on("click", function (event) {
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
  $(document).ready(function () {
    $("#pointing-btn").click(function () {
      pointEnabled = true;
      $("#mapDiv").attr("style", "cursor:crosshair;");
      map.ObjMapView.on("click", function (event) {
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
          $.each(window.counterArr, function (index, value) {
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
                function () {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
                  $.get(
                    "content/template/instant_analysis/buffer.php",
                    function (data) {
                      $(".form-buffer-" + value).append(data);
                    }
                  );
                }
              );
              $("#form-list").delegate(
                ".selectdrive-" + value,
                "click",
                function () {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
                  $.get(
                    "content/template/instant_analysis/driving.php",
                    function (data) {
                      $(".form-drive-" + value).append(data);
                    }
                  );
                }
              );
              $("#form-list").delegate(
                ".selectdrive-distance-" + value,
                "click",
                function () {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
                  $.get(
                    "content/template/instant_analysis/driving_distance.php",
                    function (data) {
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

  document.getElementById("closebtn").addEventListener("click", function () {
    document.getElementById("mySidenav").style.width = "0";
    if (document.getElementById("mySidenav").classList.contains("panel-left")) {
      document.getElementById("main").style.marginLeft = "0";
    } else {
      document.getElementById("main").style.marginRight = "0";
    }
  });

  document
    .getElementById("instant-analysis")
    .addEventListener("click", function () {
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

  document.getElementById("viewer-nav").addEventListener("click", function () {
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
    .addEventListener("click", function () {
      document.getElementById("mySiteAnalysis").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    });

  document
    .getElementById("site-analysis")
    .addEventListener("click", function () {
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

  document.getElementById("myModal").addEventListener("click", function () {
    let x = document.getElementById("dragdrop-modal");
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });

  document.getElementById("closeMyModal").addEventListener("click", function () {
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

        if (attr.attributes.hasOwnProperty("id") === false) {
          let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
          pointing.setPointingPopupMarker();
          pointing.render();
          $("#error-input-points").hide();
          $("#error-down-service").hide();

          $.addRows();
          $.each(window.counterArr, function (index, value) {
            if ($(".latitude-form-" + value).val() === "") {
              $(".latitude-form-" + value).val(lat);
              $(".longitude-form-" + value).val(lon);
              $(".latitude-form-" + value).attr("title", "Latitude " + lat);
              $(".longitude-form-" + value).attr("title", "Longitude " + lon);
              $("#form-list").delegate(
                ".selectbuffer-" + value,
                "click",
                function () {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
                  $.get(
                    "content/template/instant_analysis/buffer.php",
                    function (data) {
                      $(".form-buffer-" + value).append(data);
                    }
                  );
                }
              );
              $("#form-list").delegate(
                ".selectdrive-" + value,
                "click",
                function () {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
                  $.get(
                    "content/template/instant_analysis/driving.php",
                    function (data) {
                      $(".form-drive-" + value).append(data);
                    }
                  );
                }
              );
              $("#form-list").delegate(
                ".selectdrive-distance-" + value,
                "click",
                function () {
                  $("#error-input-buffer").hide();
                  $("#error-down-service").hide();
                  $.get(
                    "content/template/instant_analysis/driving_distance.php",
                    function (data) {
                      $(".form-drive-distance-" + value).append(data);
                    }
                  );
                }
              );
            }
          });
        }
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
        function () {
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

  $(document).delegate("#drag-csv", "click", function () {
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
    .then(function (result) {
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
    .then(function () {
      showCurrentDepartment(
        JSON.parse(localStorage.getItem("groupUserDepartment"))
      );
      storeDatabase.read().then(function (result) {
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

  $("input[name='popup-input-min']").click(function () {
    $("#popup-alert").toggleClass("show");
  });

  //Toggle i-tree child
  $(document).delegate(".i-tree", "click", function () {
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
  $(document).delegate(".i-tree-layers", "click", function () {
    $(this)
      .siblings("ul")
      .toggle();
  });

  //Date Picker function to generating calendar and choose a date (Used for 'from' and 'to')
  $(function () {
    let dateFormat = "mm/dd/yy",
      from = $("#time-period-from-value")
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          changeYear: true
        })
        .on("change", function () {
          to.datepicker("option", "minDate", getDate(this));
        }),
      to = $("#time-period-to-value")
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          changeYear: true
        })
        .on("change", function () {
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
  map.ObjMapView.when(function () {
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
    map.ObjMapView.hitTest(screenPoint).then(function (response) {
      // console.log(response)
      if (response.results.length) {
        var graphic = response.results.filter(function (result) {
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
      if (lastHeight < "970px" && lastHeight > "600px") {
        $("#table-popup-colliers").css("display", "block");
        $(".font-popup").css("font-size", "8px");
      } else if (lastHeight >= "970px") {
        $("#table-popup-colliers").css("display", "block");
        $(".font-popup").css("font-size", "11px");
      } else if (lastHeight < "600px") {
        $("#table-popup-colliers").css("display", "none");
      }
    }
    setTimeout(checkForChanges, 500);
  }

  $(document).click(function () {
    checkForChanges();
  });

  //---Make a parent grouplayer of buffers---//
  let groupLayer = new ESRI.GroupLayer({
    id: "buffers"
  })
  //Sketch to query features
  let groupLayer2 = new ESRI.GraphicsLayer({
    id: "polygons"
  });
  map.ObjMap.addMany([groupLayer, groupLayer2]);
  //--- End of Make a parent grouplayer of buffers---//

  //---Declare global counter for adding grouplayer id---//
  window.layerCounter = 0
  //---End of Declare global counter for adding grouplayer id---//

  var ctrlPressed = false;
  $(window).keydown(function (evt) {
    if (evt.which == 17) { // ctrl
      ctrlPressed = true;
    }
  }).keyup(function (evt) {
    if (evt.which == 17) { // ctrl
      ctrlPressed = false;
    }
  });

  function selectMe(mouseButton, response, groupLayer) {
    if (ctrlPressed) {
      if (mouseButton == 0) {
        var selectedLayer
        if (JSON.parse(localStorage.getItem("selectedLayer") == null)) {
          selectedLayer = []
        } else {
          selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
        }
        if (response.results[0].graphic.attributes == "buffer-graphics") {
          if (selectedLayer.includes(response.results[0].graphic.layer.id)) {
            response.results[0].graphic.symbol = {
              type: "simple-fill",
              color: [150, 150, 150, 0.2],
              outline: {
                color: "#7a7c80",
                width: 2
              }
            }
            //Splice results from selected layer
            let index = selectedLayer.indexOf(response.results[0].graphic.layer.id)
            selectedLayer.splice(index, 1)
            localStorage.setItem("selectedLayer", JSON.stringify(selectedLayer))
            console.log(JSON.parse(localStorage.getItem("selectedLayer")))
          } else {
            selectLayer(response)
          }
        } else {
          console.log("Not a buffer")
        }
      }
    } else {
      resetSelectedGraphics(groupLayer)
      selectLayer(response)
    }
  }

  //---Check global mapview click---//
  map.ObjMapView.on("click", function (event) {
    $(".image-wrapper-a").remove() //Remove contextmenu
    let point = new ESRI.Point(event.x, event.y) //Create point
    if (event.button == 0) {
      map.ObjMapView.hitTest(point).then(getGraphics);
    } else if (event.button == 2) {
      //---Recall selected Layer---//
      var selectedLayer
      if (JSON.parse(localStorage.getItem("selectedLayer") == null)) {
        selectedLayer = []
      } else {
        selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
      }
      //---End of Recall selected Layer---//
      map.ObjMapView.hitTest(point).then(function (response) {
        if (response.results.length > 0 && response.results[0].graphic.attributes == "buffer-graphics") {
          selectLayer(response)
          createContextMenu(map, event, condition = ["analyze", "remove"])
        } else {
          if (selectedLayer.length > 0) {
            createContextMenu(map, event, condition = ["analyze", "remove"])
          } else {
            createContextMenu(map, event, condition = ["radius", "drivingtime"])
          }
        }
      })
    }
  })
  //---End of Check global mapview click---//

  //--Create dynamic buffer when user click buffer in contextmenu---//
  $(document).delegate("#contextmenu-radius", "click", function () {
    $(".image-wrapper-a").remove() //Remove context menu
    let latitude = Number(localStorage.getItem("livePointingLatitude"))
    let longitude = Number(localStorage.getItem("livePointingLongitude"))
    let point = new ESRI.Point();
    point.longitude = longitude;
    point.latitude = latitude;
    createDynamicCircle(layerCounter, map, groupLayer, map.ObjMapView.toScreen(point).x, map.ObjMapView.toScreen(point).y)
  })
  //--End of Create dynamic buffer when user click buffer in contextmenu---//

  //---Analyze selected buffer---//
  $(document).delegate("#contextmenu-analyze", "click", function () {
    $(".image-wrapper-a").remove() //Remove context menu
    let geometry = []
    for (let i = 0; i < groupLayer.layers.items.length; i++) {
      for (let j = 0; j < groupLayer.layers.items[i].graphics.items.length; j++) {
        if (groupLayer.layers.items[i].graphics.items[j].attributes == "buffer-graphics") {
          geometry.push(groupLayer.layers.items[i].graphics.items[j].geometry)
        }
      }
    }

    //---Setting featureLayer url for service---//
    let featureLayer = new ESRI.FeatureLayer(
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
    );
    //---End of Setting featureLayer url for service---//

    //---Loop collected geometry---//
    for (let i = 0; i < geometry.length; i++) {
      let query = new ESRI.Query();
      query.returnGeometry = true;
      query.geometry = geometry[i];
      query.outFields = ["*"];
      featureLayer.queryFeatures(query).then(function (results) {
        console.log(results)
      })
    }
    //---End of Loop collected geometry---//
  })
  //---End of Analyze selected buffer---//

  $(document).delegate("#contextmenu-remove", "click", function () {
    $('.image-wrapper-a').remove() //Remove context menu
    let selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
    for (let i = 0; i < selectedLayer.length; i++) {
      for (let j = 0; j < groupLayer.layers.items.length; j++) {
        if (groupLayer.layers.items[j].id == selectedLayer[i]) {
          groupLayer.layers.items[j].visible = false
          groupLayer.layers.items.splice(i, 1)
        }
      }
    }
  })

  function resetSelectedGraphics(groupLayer) {
    //Reset all selected layer to empty array
    localStorage.setItem("selectedLayer", "[]")
    //Reset all selected layer to normal color buffer
    for (let i = 0; i < groupLayer.layers.items.length; i++) {
      for (let j = 0; j < groupLayer.layers.items[i].graphics.items.length; j++) {
        if (groupLayer.layers.items[i].graphics.items[j].attributes == "buffer-graphics") {
          groupLayer.layers.items[i].graphics.items[j].symbol = {
            type: "simple-fill",
            color: [150, 150, 150, 0.2],
            outline: {
              color: "#7a7c80",
              width: 2
            }
          }
        }
      }
    }
  }

  function selectLayer(response) {
    var selectedLayer
    if (JSON.parse(localStorage.getItem("selectedLayer") == null)) {
      selectedLayer = []
    } else {
      selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
    }
    if (!selectedLayer.includes(response.results[0].graphic.layer.id)) {
      selectedLayer.push(response.results[0].graphic.layer.id)
    }
    localStorage.setItem("selectedLayer", JSON.stringify(selectedLayer))
    console.log(JSON.parse(localStorage.getItem("selectedLayer")))
    let symbol = {
      type: "simple-fill",
      color: [255, 0, 0, 0.2],
      outline: {
        color: "#7a7c80",
        width: 2
      }
    }
    if (response.results[0].graphic.attributes == "buffer-graphics") {
      response.results[0].graphic.symbol = symbol
    } else {
      console.log("Not a buffer")
    }
  }

  //Check if layer for drawing a sketch available or not
  function getGraphics(response) {
    if (response.results.length > 0) {
      let val = response.results[0].graphic.layer.id.split("-")
      if (val[0] == "dynamic" && val[1] == "buffer") {
        //Reset all color graphicslayer when selecting
        selectMe(0, response, groupLayer)
        // resetSelectedGraphics(groupLayer)
        //Fill selected layer with red color, get layer selected and save to localstorage
      } else {
        console.log(response)
        localStorage.setItem(
          "selectedFeatureFilterLatitude",
          JSON.stringify(response.results[0].graphic.geometry.latitude)
        );
        localStorage.setItem(
          "selectedFeatureFilterLongitude",
          JSON.stringify(response.results[0].graphic.geometry.longitude)
        );

        //Land Rows
        let landSizeSqmGrossIDR = 0
        let landSizeSqmGrossUSD = 0
        if (response.results[0].graphic.attributes.total_idr !== null && response.results[0].graphic.attributes.price_per_sqm_gross_idr !== null) {
          landSizeSqmGrossIDR = response.results[0].graphic.attributes.total_idr / response.results[0].graphic.attributes.price_per_sqm_gross_idr;
        }
        if (response.results[0].graphic.attributes.total_usd !== null && response.results[0].graphic.attributes.price_per_sqm_gross_usd !== null) {
          landSizeSqmGrossUSD = response.results[0].graphic.attributes.total_usd / response.results[0].graphic.attributes.price_per_sqm_gross_usd;
        }
        if (landSizeSqmGrossIDR !== null) {
          landSizeSqmGrossUSD = landSizeSqmGrossIDR / 14266.4;
          $("#landSizeSqmGrossIDR").css("font-weight", "bold");
        } else if (landSizeSqmGrossUSD !== null) {
          landSizeSqmGrossIDR = landSizeSqmGrossUSD * 14266.4;
          $("#landSizeSqmGrossUSD").css("font-weight", "bold");
        } else if (landSizeSqmGrossIDR == null && landSizeSqmGrossUSD == null) {
          landSizeSqmGrossIDR = 0
          landSizeSqmGrossUSD = 0
        }
        let landSizeSqmSGAIDR = 0;
        let landSizeSqmSGAUSD = 0;
        if (landSizeSqmSGAIDR !== null) {
          landSizeSqmSGAUSD = landSizeSqmSGAIDR / 14266.4;
          $("#landSizeSqmSGAIDR").css("font-weight", "bold");
        } else if (landSizeSqmSGAUSD !== null) {
          landSizeSqmSGAIDR = landSizeSqmSGAUSD * 14266.4;
          $("#landSizeSqmSGAUSD").css("font-weight", "bold");
        } else if (landSizeSqmSGAIDR == null && landSizeSqmSGAUSD == null) {
          landSizeSqmSGAIDR = 0
          landSizeSqmSGAUSD = 0
        }
        let landSizeUnitKeysIDR = response.results[0].graphic.attributes.units_keys;
        let landSizeUnitKeysUSD = response.results[0].graphic.attributes.units_keys;
        if (landSizeUnitKeysIDR !== null) {
          landSizeUnitKeysUSD = landSizeUnitKeysIDR / 14266.4;
          $("#landSizeUnitKeysIDR").css("font-weight", "bold");
        } else if (landSizeUnitKeysUSD !== null) {
          landSizeUnitKeysIDR = landSizeUnitKeysUSD * 14266.4;
          $("#landSizeUnitKeysUSD").css("font-weight", "bold");
        } else if (landSizeUnitKeysIDR == null && landSizeUnitKeysUSD == null) {
          landSizeUnitKeysIDR = 0
          landSizeUnitKeysUSD = 0
        }
        let landPricePerSqmGrossIDR = response.results[0].graphic.attributes.price_per_sqm_gross_idr;
        let landPricePerSqmGrossUSD = response.results[0].graphic.attributes.price_per_sqm_gross_usd;
        if (landPricePerSqmGrossIDR !== null) {
          landPricePerSqmGrossUSD = landPricePerSqmGrossIDR / 14266.4;
          $("#landPricePerSqmGrossIDR").css("font-weight", "bold");
        } else if (landPricePerSqmGrossUSD !== null) {
          landPricePerSqmGrossIDR = landPricePerSqmGrossUSD * 14266.4;
          $("#landPricePerSqmGrossUSD").css("font-weight", "bold");
        } else if (landPricePerSqmGrossIDR == null && landPricePerSqmGrossUSD == null) {
          landPricePerSqmGrossIDR = 0
          landPricePerSqmGrossUSD = 0
        }
        let landPricePerSqmSGAIDR = response.results[0].graphic.attributes.price_per_sqm_sganett_idr;
        let landPricePerSqmSGAUSD = response.results[0].graphic.attributes.price_per_sqm_sganett_usd;
        if (landPricePerSqmSGAIDR !== null) {
          landPricePerSqmSGAUSD = landPricePerSqmSGAIDR / 14266.4;
          $("#landPricePerSqmSGAIDR").css("font-weight", "bold");
        } else if (landPricePerSqmSGAUSD !== null) {
          landPricePerSqmSGAIDR = landPricePerSqmSGAUSD * 14266.4;
          $("#landPricePerSqmSGAUSD").css("font-weight", "bold");
        } else if (landPricePerSqmSGAIDR == null && landPricePerSqmSGAUSD == null) {
          landPricePerSqmSGAIDR = 0
          landPricePerSqmSGAUSD = 0
        }
        let landPricePerUnitKeyIDR = 0;
        let landPricePerUnitKeyUSD = 0;
        if (landPricePerUnitKeyIDR !== null) {
          landPricePerUnitKeyUSD = landPricePerUnitKeyIDR / 14266.4;
          $("#landPricePerUnitKeyIDR").css("font-weight", "bold");
        } else if (landPricePerUnitKeyUSD !== null) {
          landPricePerUnitKeyIDR = landPricePerUnitKeyUSD * 14266.4;
          $("#landPricePerUnitKeyUSD").css("font-weight", "bold");
        } else if (landPricePerUnitKeyIDR == null && landPricePerUnitKeyUSD == null) {
          landPricePerUnitKeyIDR = 0
          landPricePerUnitKeyUSD = 0
        }
        let landNJOPPriceTotalIDR = 0;
        if (response.results[0].graphic.attributes.njop !== null) {
          landNJOPPriceTotalIDR = response.results[0].graphic.attributes.njop
        }
        let landNJOPPriceTotalUSD = 0
        if (response.results[0].graphic.attributes.njop !== null) {
          landNJOPPriceTotalUSD = response.results[0].graphic.attributes.njop / 14266.4;
        }
        let landNJOPPricePerSqmIDR = 0
        if (response.results[0].graphic.attributes.price_per_sqm_gross_idr !== null) {
          landNJOPPricePerSqmIDR = landNJOPPriceTotalIDR / response.results[0].graphic.attributes.price_per_sqm_gross_idr;
        }
        let landNJOPPricePerSqmUSD = 0
        if (response.results[0].graphic.attributes.price_per_sqm_gross_usd !== null) {
          landNJOPPricePerSqmUSD = landNJOPPriceTotalUSD / response.results[0].graphic.attributes.price_per_sqm_gross_usd;
        }
        let landNJOPPercentIDR = 0;
        let landNJOPPercentUSD = 0;
        let landTotalIDR = response.results[0].graphic.attributes.total_idr;
        let landTotalUSD = response.results[0].graphic.attributes.total_usd;
        if (landTotalIDR !== null) {
          landTotalUSD = landTotalIDR / 14266.4;
          $("#landTotalIDR").css("font-weight", "bold");
        } else if (landTotalUSD !== null) {
          landTotalIDR = landTotalUSD * 14266.4;
          $("#landTotalUSD").css("font-weight", "bold");
        } else if (landTotalIDR == null && landTotalUSD == null) {
          landTotalIDR = 0
          landTotalUSD = 0
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
        let buildingNJOPPriceTotalIDR = 0;
        let buildingNJOPPriceTotalUSD = 0;
        let buildingNJOPPricePerSqmIDR = 0;
        let buildingNJOPPricePerSqmUSD = 0;
        let buildingNJOPPercentIDR = 0;
        let buildingNJOPPercentUSD = 0;
        let buildingTotalIDR = null;
        let buildingTotalUSD = null;
        if (buildingTotalIDR !== null) {
          buildingTotalUSD = buildingTotalIDR / 14266.4;
          $("#buildingTotalIDR").css("font-weight", "bold");
        } else if (buildingTotalUSD !== null) {
          buildingTotalIDR = buildingTotalUSD * 14266.4;
          $("#buildingTotalUSD").css("font-weight", "bold");
        } else if (buildingTotalUSD == null && buildingTotalIDR == null) {
          buildingTotalIDR = 0
          buildingTotalUSD = 0
        }

        //Total Rows
        let totalSizeSqmGrossIDR = landSizeSqmGrossIDR + buildingSizeSqmGrossIDR;
        let totalSizeSqmGrossUSD = landSizeSqmGrossUSD + buildingSizeSqmGrossUSD;
        if (totalSizeSqmGrossIDR !== null) {
          totalSizeSqmGrossUSD = totalSizeSqmGrossIDR / 14266.4;
          $("#totalSizeSqmGrossIDR").css("font-weight", "bold");
        } else if (totalSizeSqmGrossUSD !== null) {
          totalSizeSqmGrossIDR = totalSizeSqmGrossUSD * 14266.4;
          $("#totalSizeSqmGrossUSD").css("font-weight", "bold");
        } else if (totalSizeSqmGrossUSD == null && totalSizeSqmGrossIDR == null) {
          totalSizeSqmGrossIDR = 0
          totalSizeSqmGrossUSD = 0
        }
        let totalSizeSqmSGAIDR = landSizeSqmSGAIDR + buildingSizeSqmSGAIDR;
        let totalSizeSqmSGAUSD = landSizeSqmSGAUSD + buildingSizeSqmSGAUSD;
        if (totalSizeSqmSGAIDR !== null) {
          totalSizeSqmSGAUSD = totalSizeSqmSGAIDR / 14266.4;
          $("#totalSizeSqmSGAIDR").css("font-weight", "bold");
        } else if (totalSizeSqmSGAUSD !== null) {
          totalSizeSqmSGAIDR = totalSizeSqmSGAUSD * 14266.4;
          $("#totalSizeSqmSGAUSD").css("font-weight", "bold");
        } else if (totalSizeSqmSGAUSD == null && totalSizeSqmSGAIDR == null) {
          totalSizeSqmSGAIDR = 0
          totalSizeSqmSGAUSD = 0
        }
        let totalSizeUnitKeysIDR = landSizeUnitKeysIDR + buildingSizeUnitKeysIDR;
        let totalSizeUnitKeysUSD = landSizeUnitKeysUSD + buildingSizeUnitKeysUSD;
        if (totalSizeUnitKeysIDR !== null) {
          totalSizeUnitKeysUSD = totalSizeUnitKeysIDR / 14266.4;
          $("#totalSizeUnitKeysIDR").css("font-weight", "bold");
        } else if (totalSizeUnitKeysUSD !== null) {
          totalSizeUnitKeysIDR = totalSizeUnitKeysUSD * 14266.4;
          $("#totalSizeUnitKeysUSD").css("font-weight", "bold");
        } else if (totalSizeUnitKeysIDR == null && totalSizeUnitKeysUSD == null) {
          totalSizeUnitKeysIDR = 0
          totalSizeUnitKeysUSD = 0
        }
        let totalPricePerSqmGrossIDR = landPricePerSqmGrossIDR + buildingPricePerSqmGrossIDR;
        let totalPricePerSqmGrossUSD = landPricePerSqmGrossUSD + buildingPricePerSqmGrossUSD;
        if (totalPricePerSqmGrossIDR !== null) {
          totalPricePerSqmGrossUSD = totalPricePerSqmGrossIDR / 14266.4;
          $("#totalPricePerSqmGrossIDR").css("font-weight", "bold");
        } else if (totalPricePerSqmGrossUSD !== null) {
          totalPricePerSqmGrossIDR = totalPricePerSqmGrossUSD * 14266.4;
          $("#totalPricePerSqmGrossUSD").css("font-weight", "bold");
        } else if (totalPricePerSqmGrossIDR == null && totalPricePerSqmGrossUSD == null) {
          totalPricePerSqmGrossIDR = 0
          totalPricePerSqmGrossUSD = 0
        }
        let totalPricePerSqmSGAIDR = landPricePerSqmSGAIDR + buildingPricePerSqmSGAIDR;
        let totalPricePerSqmSGAUSD = landPricePerSqmSGAUSD + buildingPricePerSqmSGAUSD;
        if (totalPricePerSqmSGAIDR !== null) {
          totalPricePerSqmSGAUSD = totalPricePerSqmSGAIDR / 14266.4;
          $("#totalPricePerSqmSGAIDR").css("font-weight", "bold");
        } else if (totalPricePerSqmSGAUSD !== null) {
          totalPricePerSqmSGAIDR = totalPricePerSqmSGAUSD * 14266.4;
          $("#totalPricePerSqmSGAUSD").css("font-weight", "bold");
        } else if (totalPricePerSqmSGAIDR == null && totalPricePerSqmSGAUSD == null) {
          totalPricePerSqmSGAIDR = 0
          totalPricePerSqmSGAUSD = 0
        }
        let totalPricePerUnitKeyIDR = landPricePerUnitKeyIDR + buildingPricePerUnitKeyIDR;
        let totalPricePerUnitKeyUSD = landPricePerUnitKeyUSD + buildingPricePerUnitKeyUSD;
        if (totalPricePerUnitKeyIDR !== null) {
          totalPricePerUnitKeyUSD = totalPricePerUnitKeyIDR / 14266.4;
          $("#totalPricePerUnitKeyIDR").css("font-weight", "bold");
        } else if (totalPricePerUnitKeyUSD !== null) {
          totalPricePerUnitKeyIDR = totalPricePerUnitKeyUSD * 14266.4;
          $("#totalPricePerUnitKeyUSD").css("font-weight", "bold");
        } else if (totalPricePerUnitKeyIDR == null && totalPricePerUnitKeyUSD == null) {
          totalPricePerUnitKeyIDR = 0
          totalPricePerUnitKeyUSD = 0
        }
        let totalNJOPPriceTotalIDR = landNJOPPriceTotalIDR + buildingNJOPPriceTotalIDR;
        let totalNJOPPriceTotalUSD = landNJOPPriceTotalUSD + buildingNJOPPriceTotalUSD;
        if (totalNJOPPriceTotalIDR !== null) {
          totalNJOPPriceTotalUSD = totalNJOPPriceTotalIDR / 14266.4;
          $("#totalNJOPPriceTotalIDR").css("font-weight", "bold");
        } else if (totalNJOPPriceTotalUSD !== null) {
          totalNJOPPriceTotalIDR = totalNJOPPriceTotalUSD * 14266.4;
          $("#totalNJOPPriceTotalUSD").css("font-weight", "bold");
        } else if (totalNJOPPriceTotalIDR == null && totalNJOPPriceTotalUSD == null) {
          totalNJOPPriceTotalIDR = 0
          totalNJOPPriceTotalUSD = 0
        }
        let totalNJOPPricePerSqmIDR = landNJOPPricePerSqmIDR + buildingNJOPPricePerSqmIDR;
        let totalNJOPPricePerSqmUSD = landNJOPPricePerSqmUSD + buildingNJOPPricePerSqmUSD;
        if (totalNJOPPricePerSqmIDR !== null) {
          totalNJOPPricePerSqmUSD = totalNJOPPricePerSqmIDR / 14266.4;
          $("#totalNJOPPricePerSqmIDR").css("font-weight", "bold");
        } else if (totalNJOPPricePerSqmUSD !== null) {
          totalNJOPPricePerSqmIDR = totalNJOPPricePerSqmUSD * 14266.4;
          $("#totalNJOPPricePerSqmUSD").css("font-weight", "bold");
        } else if (totalNJOPPricePerSqmIDR == null && totalNJOPPricePerSqmUSD == null) {
          totalNJOPPricePerSqmIDR = 0
          totalNJOPPricePerSqmUSD = 0
        }
        let totalNJOPPercentIDR = landNJOPPercentIDR + buildingNJOPPercentIDR;
        let totalNJOPPercentUSD = landNJOPPercentUSD + buildingNJOPPercentUSD;
        if (totalNJOPPercentIDR !== null) {
          totalNJOPPercentUSD = totalNJOPPercentIDR / 14266.4;
          $("#totalNJOPPercentIDR").css("font-weight", "bold");
        } else if (totalNJOPPercentUSD !== null) {
          totalNJOPPercentIDR = totalNJOPPercentUSD * 14266.4;
          $("#totalNJOPPercentUSD").css("font-weight", "bold");
        } else if (totalNJOPPercentIDR == null && totalNJOPPercentUSD == null) {
          totalNJOPPercentIDR = 0
          totalNJOPPercentUSD = 0
        }
        let totalTotalIDR = landTotalIDR + buildingTotalIDR;
        let totalTotalUSD = landTotalUSD + buildingTotalUSD;
        if (totalTotalIDR !== null) {
          totalTotalUSD = totalTotalIDR / 14266.4;
          $("#totalTotalIDR").css("font-weight", "bold");
        } else if (totalTotalUSD !== null) {
          totalTotalIDR = totalTotalUSD * 14266.4;
          $("#totalTotalUSD").css("font-weight", "bold");
        }

        //KLB Rows
        let KLBTotalIDR = landTotalIDR
        let KLBTotalUSD = landTotalUSD
        if (KLBTotalIDR !== null) {
          KLBTotalUSD = KLBTotalIDR / 14266.4;
          $("#KLBTotalIDR").css("font-weight", "bold");
        } else if (KLBTotalUSD !== null) {
          KLBTotalIDR = KLBTotalUSD * 14266.4;
          $("#KLBTotalUSD").css("font-weight", "bold");
        } else if (KLBTotalUSD == null && KLBTotalIDR == null) {
          KLBTotalIDR = 0
          KLBTotalUSD = 0
        }
        let KLBKLBIDR = 0;
        let KLBKLBUSD = 0;
        if (response.results[0].graphic.attributes.klb !== null) {
          KLBKLBIDR = response.results[0].graphic.attributes.klb
          KLBKLBUSD = response.results[0].graphic.attributes.klb
        }
        let KLBLandSqmIDR = 0;
        let KLBLandSqmUSD = 0;
        if (landSizeSqmGrossIDR !== null) {
          KLBLandSqmIDR = landSizeSqmGrossIDR
          KLBLandSqmUSD = KLBLandSqmIDR / 14266.4;
          $("#KLBLandSqmIDR").css("font-weight", "bold");
        } else if (landSizeSqmGrossUSD !== null) {
          KLBLandSqmUSD = landSizeSqmGrossUSD
          KLBLandSqmIDR = KLBLandSqmUSD * 14266.4;
          $("#KLBLandSqmUSD").css("font-weight", "bold");
        }

        let KLBBuildableSqmIDR = KLBTotalIDR / (KLBKLBIDR * KLBLandSqmIDR);
        let KLBBuildableSqmUSD = KLBTotalUSD / (KLBKLBUSD * KLBLandSqmUSD);

        let attr = Object.keys(response.results[0].graphic.attributes);
        let priceType = response.results[0].graphic.attributes.price_type;
        let actionDate = response.results[0].graphic.attributes.action_date;
        let imageUrl = response.results[0].graphic.attributes.property_photo;
        let propertyType = response.results[0].graphic.attributes.property_type;
        let buildingName = response.results[0].graphic.attributes.property_name;
        let address = response.results[0].graphic.attributes.property_address;
        let lastupdate = response.results[0].graphic.attributes.last_update;
        let colliersContact = response.results[0].graphic.attributes.property_colliers_contact;
        let d = new Date(lastupdate);
        let a = new Date(actionDate);
        lastupdate =
          d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        if (lastupdate === "NaN-NaN-NaN") {
          lastupdate = "-";
        }
        actionDate =
          a.getDate() + "-" + (a.getMonth() + 1) + "-" + a.getFullYear();
        if (actionDate === "NaN-NaN-NaN") {
          actionDate = "-";
        }
        if (attr.includes("propertytype") || attr.includes("property_type") || attr.includes("property_t")) {
          $(".popupFilter").show();
          $(".image-property").css("background-image", "url(" + imageUrl + ")");
          $(".image-property").css("background-size", "100% 100%");
          $("#propertytype-popup").text(
            "PROPERTY TYPE : " + propertyType.toUpperCase()
          );
          $("#colliers-contact-popup").text("Colliers Contact : " + colliersContact);
          if (priceType == "asking price") {
            $("#action-date-popup").text("Asking on " + actionDate);
          }
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
          $("#landNJOPPriceTotalIDR").text(
            landNJOPPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#landNJOPPriceTotalUSD").text(
            landNJOPPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#landNJOPPricePerSqmIDR").text(
            landNJOPPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#landNJOPPricePerSqmUSD").text(
            landNJOPPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
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
          $("#buildingNJOPPriceTotalIDR").text(
            buildingNJOPPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#buildingNJOPPriceTotalUSD").text(
            buildingNJOPPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#buildingNJOPPricePerSqmIDR").text(
            buildingNJOPPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#buildingNJOPPricePerSqmUSD").text(
            buildingNJOPPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
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
          $("#totalNJOPPriceTotalIDR").text(
            totalNJOPPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#totalNJOPPriceTotalUSD").text(
            totalNJOPPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#totalNJOPPricePerSqmIDR").text(
            totalNJOPPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
          );
          $("#totalNJOPPricePerSqmUSD").text(
            totalNJOPPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
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
            KLBKLBIDR
          );
          $("#KLBKLBUSD").text(
            KLBKLBUSD
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

          $(".image-property").error(function () {
            $(this).attr("src", "assets/images/no-photo.png");
          });
        }

        //Highlight pointing
        let lat = response.results[0].graphic.geometry.latitude;
        let lon = response.results[0].graphic.geometry.longitude;
        let posLat = lat + 0.04;
        let posLon = lon;
        for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {

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

        if (response.results[0].graphic.symbol === null) {
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
        } else if (
          response.results[0].graphic.symbol.url !==
          "assets/images/icons/map-marker.png"
        ) {
          localStorage.setItem(
            "pointingHighlight",
            lat.toString() + lon.toString()
          );
          let pointing = new GIS.Buffer.Pointing(map.ObjMapView, lat, lon);
          pointing.setPointingPopupMarker();
          if (attr.includes("propertytype") || attr.includes("property_type") || attr.includes("property_t")) {
            pointing.positionFixing(posLat, posLon);
          }
          pointing.render();
        }
        //End of Highlight pointing
      }
    } else {
      localStorage.setItem("selectedLayer", "[]")
      console.log(localStorage.getItem("selectedLayer"))
      resetSelectedGraphics(groupLayer)
      // Get latitude and longitude
      let latitude = map.ObjMapView.toMap({
        x: response.screenPoint.x,
        y: response.screenPoint.y
      }).latitude.toFixed(7);
      let longitude = map.ObjMapView.toMap({
        x: response.screenPoint.x,
        y: response.screenPoint.y
      }).longitude.toFixed(7);

      let point = new ESRI.Point();
      point.longitude = longitude;
      point.latitude = latitude;
      //Save to LocalStorage
      localStorage.setItem("livePointingLatitude", latitude);
      localStorage.setItem("livePointingLongitude", longitude);
      localStorage.setItem("livePointingX", map.ObjMapView.toScreen(point).x);
      localStorage.setItem("livePointingY", map.ObjMapView.toScreen(point).y);
      //check if previous pointing is enable
      for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {
        if ("livePointing" in map.ObjMapView.graphics.items[i].attributes) {
          map.ObjMapView.graphics.items[i].visible = false;
          map.ObjMapView.graphics.items.splice(i, 1);
        }
      }
      let pointing = new GIS.Buffer.livePointing(
        map.ObjMapView,
        latitude,
        longitude
      );
      pointing.setPictureMarker();
      pointing.render();

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

  // var slider = document.getElementById("buffer-radius");
  // slider.oninput = function () {
  //   $("#buffer-radius-value").text(this.value + " km");
  //   for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
  //     if ("anly" in map.ObjMap.layers.items[i]) {
  //       map.ObjMap.layers.items[i].visible = false;
  //       map.ObjMap.layers.items.splice(i, 1);
  //     }
  //   }
  //   let latitude = localStorage.getItem("livePointingLatitude");
  //   let longitude = localStorage.getItem("livePointingLongitude");
  //   let radius = new GIS.Buffer.Radius(
  //     map.ObjMap,
  //     map.ObjMapView,
  //     latitude,
  //     longitude
  //   );
  //   radius.setRadius(this.value);
  //   radius.setUnit("kilometers");
  //   radius.create();
  // };

  $(document).ready(function () {
    let divButton = $("<div></div>");
    let button = $("<button></button>").text("OK");
    $(button).attr("id", "button-ok-property");
    $(button).attr("class", "btn btn-primary button-ok-property");
    $(divButton).append(button);
    $(".ms-options").append(divButton);
  });

  $("#checkbox-colliers-property").click(function () {
    if ($(this).prop("checked") == true) {
      map.ObjMap.add(colliersService);
    } else if ($(this).prop("checked") == false) {
      map.ObjMap.remove(colliersService);
    }
  });

  $(document).delegate("#button-ok-property", "click", function () {
    $(".ms-options-wrap").removeClass("ms-active");
  });

  $("html").click(function () {
    let property = $(".dropdown-content-property");
    let department = $(".dropdown-content-department");
    $(property).hide();
    $(department).hide();
  });

  $(".dropdown-content-property").click(function (event) {
    event.stopPropagation();
  });
  $(".dropdown-content-department").click(function (event) {
    event.stopPropagation();
  });
  $("#dropdown-property-div").click(function (event) {
    event.stopPropagation();
    $(".dropdown-content-property").toggle();
  });
  $("#dropdown-department-div").click(function (event) {
    event.stopPropagation();
    $(".dropdown-content-department").toggle();
  });

  $.get("popupLayout.html", function (data) {
    localStorage.setItem("popupLayout", JSON.stringify(data));
  });

  $("input:radio").on("click", function (e) {
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

  $("#close-popup-property").click(function () {
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

  $("#pointer-popup").click(function () {
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
    $.each(window.counterArr, function (index, value) {
      if ($(".latitude-form-" + value).val() === "") {
        $(".latitude-form-" + value).val(lat);
        $(".longitude-form-" + value).val(lon);
        $(".latitude-form-" + value).attr("title", "Latitude " + lat);
        $(".longitude-form-" + value).attr("title", "Longitude " + lon);
        $("#form-list").delegate(".selectbuffer-" + value, "click", function () {
          $("#error-input-buffer").hide();
          $("#error-down-service").hide();
          $.get("content/template/instant_analysis/buffer.php", function (data) {
            $(".form-buffer-" + value).append(data);
          });
        });
        $("#form-list").delegate(".selectdrive-" + value, "click", function () {
          $("#error-input-buffer").hide();
          $("#error-down-service").hide();
          $.get("content/template/instant_analysis/driving.php", function (
            data
          ) {
            $(".form-drive-" + value).append(data);
          });
        });
        $("#form-list").delegate(
          ".selectdrive-distance-" + value,
          "click",
          function () {
            $("#error-input-buffer").hide();
            $("#error-down-service").hide();
            $.get(
              "content/template/instant_analysis/driving_distance.php",
              function (data) {
                $(".form-drive-distance-" + value).append(data);
              }
            );
          }
        );
      }
    });
  });

  $(document).delegate("#create-polygon", "click", function () {
    $(".esri-icon-pan").removeClass("esri-sketch__button--selected");
    $(".esri-icon-polygon").addClass("esri-sketch__button--selected");
    // document.body.style.cursor = "crosshair";
  });

  //---Set all external function here---//
  submitFilterServices(storeLocalStorage, map, convertCSV);
  inputFilter();
  multiSelect();
  inputCheckboxPropertyStatus();
  inputCheckboxServices(GIS, map);
  inputCheckboxQueryShape(GIS, map);
  saveDataServiceToLocalStorage();
  removeFilterResults(map, groupLayer, groupLayer2);
  createOverlap(GIS, map);
  viewTableServices(map);
  zoomToLayer(map);
  expandCheckboxServices();
  createQueryShape(GIS, map, groupLayer2, convertCSV);
  generateToken()
  //---End of Set all external function here---//

  //Clear the localstorage when user logout
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
  });
}