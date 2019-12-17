async function boot(GIS) {
  window.GIS = GIS
  window.map = new GIS.Map([118, -3.8], 'osm');
  EsriConfig.request.corsEnabledServers
    .push("mts0.google.com", "mts1.google.com", "mts2.google.com",
      "mts3.google.com");
  map.addLocateWidget("top-left");
  map.render();
  window.map2 = new ESRI.Map({
    basemap: 'osm'
  })
  window.mapView2 = new ESRI.MapView({
    map: map2,
    container: 'mapDiv'
  })

  mapView2.when(function () {
    addBasemaps()
    addLocate()
  })

  setStartLocalStorage(map)
  radiusSlider(map)
  widgetCollection(map)
  setWindowVariables(map)

  var googleHybrid = new ESRI.Basemap({
    baseLayers: [
      new ESRI.WebTileLayer({
        urlTemplate: "https://mts{subDomain}.google.com/vt/lyrs=y@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
        subDomains: ["0", "1", "2", "3"],
        copyright: "Google Maps"
      })
    ],
    // portalItem: portalItem,
    title: "Google Hybrid",
    id: "googlehybrid",
    thumbnailUrl:
      "https://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/tempimagery.jpg?f=json"
  });

  map.ObjMap.basemap = googleHybrid

  // var sources = [
  //   {
  //     layer: new ESRI.FeatureLayer({
  //       url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/2",
  //       outFields: ["*"]
  //     }),
  //     searchFields: ["KABKOT", "PROVINSI"],
  //     displayField: "KABKOT",
  //     exactMatch: false,
  //     outFields: ["*"],
  //   }
  // ]

  // var testAutoSearch = new ESRI.Search({
  //   view: map.ObjMapView,
  //   sources: sources
  // })

  // testAutoSearch.search("KOTA JAKARTA BARAT")

  //---- Driving Time and Driving Distance Area --- //

  $(document).delegate("#modal-profile-onemap", "click", async function () {
    await $.get("assets/html/my_profile.html", function (data) {
      $(".page-content").append(data);
    });
  })
  $(document).delegate("#driving-time-div", "click", function () {
    actionElement("#hold-driving-time", "remove")
  })
  $(document).delegate(".select-driving-mini", "change", function () {
    if ($(this).val() == 3) {
      $(".driving-historical-mini").show();
    } else {
      $(".driving-historical-mini").hide();
    }
  });
  $(document).delegate(".btn-create-drive-time-mini", "click", function () {
    let distance = $(".distance-time-mini").val()
    let unit = $(".select-unit-time-mini").val()
    var latitude = 0
    var longitude = 0
    if (getLayerById(map, "pointer")) {
      latitude = Number(getLocalStorage("livePointingLatitude", 0))
      longitude = Number(getLocalStorage("livePointingLongitude", 0))
    } else {
      latitude = map.ObjMapView.center.latitude
      longitude = map.ObjMapView.center.longitude
    }
    processDrivingTime(map, longitude, latitude, unit, distance)
  });

  $(document).delegate("#driving-distance-div", "click", function () {
    actionElement("#hold-driving-distance", "remove")
  })
  $(document).delegate(".select-driving-distance-mini", "change", function () {
    if ($(this).val() == 3) {
      $(".driving-historical-mini").show();
    } else {
      $(".driving-historical-mini").hide();
    }
  });
  $(document).delegate(".btn-create-drive-distance-mini", "click", function () {
    let distance = $(".driving-distance-distance-mini").val()
    let unit = $(".select-unit-distance-mini").val()
    var latitude = 0
    var longitude = 0
    if (getLayerById(map, "pointer")) {
      latitude = Number(getLocalStorage("livePointingLatitude", 0))
      longitude = Number(getLocalStorage("livePointingLongitude", 0))
    } else {
      latitude = map.ObjMapView.center.latitude
      longitude = map.ObjMapView.center.longitude
    }
    processDrivingDistance(map, longitude, latitude, unit, distance)
  });

  //---- End of Driving Time and Driving Distance Area --- //

  createTargetPoint(map)
  inputFeatures(map)

  // $(function () {
  //   $("#popupFilter").draggable();
  // });

  // await $.get("assets/js/contextMenu/action/popup/config/configPopup.html", function (data) {
  //   $(".page-content").append(data);
  // });

  // $.get("assets/js/contextMenu/action/popup/viewPopupAnalyzed.html", function (data) {
  //   $(".page-content").append(data);
  // });

  // $.get("assets/js/data/popup/popupFilter.html", function (data) {
  //   $(".page-content").append(data);
  // });

  mapViewWhenReady(map)

  // document
  //   .getElementById("point-the-site")
  //   .addEventListener("click", function () {
  //     pointTheSiteEnabled = true;
  //     document
  //       .getElementById("mapDiv")
  //       .setAttribute("style", "cursor:crosshair;");

  //     document
  //       .getElementById("create-site-div")
  //       .setAttribute(
  //         "style",
  //         "background: rgba(255, 255, 255, 0.8) none repeat scroll 0% 0%; display:none; width: 500px;"
  //       );

  //     if (pointTheSiteEnabled == false) {
  //       document
  //         .getElementById("mapDiv")
  //         .setAttribute("style", "cursor:default;");
  //     }
  //   });

  map.ObjMapView.popup.actionsMenuEnabled = false;
  // map.ObjMapView.popup.featureNavigationEnabled = false;

  // create instant analysis

  createMarker(GIS, map);
  createMarkerFromSite(GIS, map);
  createMarkerFromCSV(GIS, map);
  // analysisPoi(GIS, map);
  // editAnalysis(GIS, map);
  // end of create instant analysis
  console.log($("#onemap-username").text())

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
          toggleNav("close")
          document.getElementById("form-filter").style.display = "none";
        } else {
          toggleNav("open");
        }
      }
    });

  var toggleNav = function (toggle) {
    if (toggle == "open") {
      document.getElementById("mySidenav").style.width = "320px";
      document.getElementById("main").style.marginLeft = "320px";
      document.getElementById("mySidenav").classList.add("panel-left");
      document.getElementById("main").style.marginRight = "0";
    } else if (toggle == "close") {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.getElementById("mySidenav").classList.add("panel-left");
      document.getElementById("main").style.marginRight = "0";
    }
  }

  var toggleSiteAnalysis = function (toggle) {
    if (toggle == "open") {
      document.getElementById("mySiteAnalysis").style.width = "320px";
      document.getElementById("main").style.marginLeft = "320px";
    } else if (toggle == "close") {
      document.getElementById("mySiteAnalysis").style.width = "0px";
      document.getElementById("main").style.marginLeft = "0px";
    }
  }

  function dragCSVButton() {
    let button = document.createElement("BUTTON");
    button.setAttribute("id", "drag-csv");
    button.setAttribute("class", "btn btn-primary");
    button.innerHTML = "Drag CSV";
    return button;
  }

  var siteAnalysis = document.getElementById("mySiteAnalysis");
  function open_site_analysis() {
    document.getElementById("mySiteAnalysis").style.width = "320px";
    document.getElementById("main").style.marginLeft = "320px";
  }

  function close_site_analysis() {
    document.getElementById("mySiteAnalysis").style.width = "0";
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
        toggleViewer("close");
        toggleSiteAnalysis("open");
      } else if (document.getElementById("mySiteAnalysis").style.width > "0px") {
        toggleSiteAnalysis("close")
      } else {
        toggleSiteAnalysis("open")
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
        toggleNav("open")
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

  // let storeLocalStorage = new GIS.Buffer.LocalStorage(
  //   map.ObjMapView,
  //   convertCSV
  // );
  // let viewer = new GIS.Buffer.Viewer(map.ObjMapView, convertCSV);
  // viewer.renderTreeview();
  // viewer.selectItem();
  // viewer.filterData();

  // storeDatabase
  //   .readUserAndDepartment()
  //   .then(function (result) {
  //     let data = JSON.parse(result);
  //     let arrData = [];
  //     let groupUserDepartment = [];
  //     let userIds = [];
  //     let usernames = [];
  //     let departments = [];
  //     let count = 1;
  //     for (var i = 0; i < data.length; i++) {
  //       if (count % 3 == 0) {
  //         arrData.push(data[i]);
  //         groupUserDepartment.push(arrData);
  //         arrData = [];
  //       } else {
  //         arrData.push(data[i]);
  //       }
  //       count++;
  //     }
  //     for (let i in groupUserDepartment) {
  //       if (userIds.includes(groupUserDepartment[i][0]) == false) {
  //         userIds.push(groupUserDepartment[i][0]);
  //       }
  //       if (usernames.includes(groupUserDepartment[i][1]) == false) {
  //         usernames.push(groupUserDepartment[i][1]);
  //       }
  //       if (departments.includes(groupUserDepartment[i][2]) == false) {
  //         departments.push(groupUserDepartment[i][2]);
  //       }
  //     }
  //     localStorage.setItem(
  //       "groupUserDepartment",
  //       JSON.stringify(groupUserDepartment)
  //     );
  //     localStorage.setItem("userIds", JSON.stringify(userIds));
  //     localStorage.setItem("usernames", JSON.stringify(usernames));
  //     localStorage.setItem("departments", JSON.stringify(departments));
  //   })
  //   .then(function () {
  //     showCurrentDepartment(
  //       JSON.parse(localStorage.getItem("groupUserDepartment"))
  //     );
  //     storeDatabase.read().then(function (result) {
  //       console.log(result);
  //       if (result !== "[]" && localStorage.length < 3) {
  //         let data = JSON.parse(result);
  //         console.log(data);
  //         for (let i in data) {
  //           let tempCreatedBy = [];
  //           let tempColor = [];
  //           let tempLength = [];
  //           let tempData = [];
  //           if (data[i] instanceof Array) {
  //             for (let j in data[i]) {
  //               tempColor.push(data[i][j].color);
  //               tempCreatedBy.push(data[i][j].created_by);
  //               delete data[i][j].id;
  //               delete data[i][j].color;
  //               delete data[i][j].created_by;
  //             }
  //             tempLength = storeDatabase.countMultipleElements(tempCreatedBy);
  //             tempCreatedBy = [...new Set(tempCreatedBy)];
  //             tempColor = [...new Set(tempColor)];
  //             let length = data[i].length;
  //             let count = 0;
  //             for (let k = 0; k < length; k++) {
  //               for (let j = 0; j < tempLength.length; j++) {
  //                 if (count == tempLength[j] - 1) {
  //                   convertCSV.setColor(JSON.parse(tempColor[j]));
  //                   convertCSV.setCreatedBy(tempCreatedBy[j]);
  //                   tempColor.splice(0, 1);
  //                   tempCreatedBy.splice(0, 1);
  //                   tempData.push(data[i][k]);
  //                   convertCSV.processCSVData(
  //                     storeLocalStorage.getRowofTextArray(tempData),
  //                     false
  //                   );
  //                   tempData = [];
  //                   count = 0;
  //                   k = k + 1;
  //                   map.ObjMapView.graphics.items = [];
  //                 }
  //               }
  //               tempData.push(data[i][k]);
  //               count = count + 1;
  //             }
  //           } else {
  //             let s = data[i];
  //             let removeCreatedBy = s.slice(0, s.lastIndexOf("_"));
  //             let removeStorage = removeCreatedBy.slice(
  //               0,
  //               removeCreatedBy.lastIndexOf("_")
  //             );
  //             convertCSV.setNameFile(removeStorage);
  //           }
  //         }
  //       }
  //       console.log(JSON.parse(localStorage.getItem("data")));
  //     });
  //   });

  // $("input[name='popup-input-min']").click(function () {
  //   $("#popup-alert").toggleClass("show");
  // });

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
        date = $.datepicker.parseDate(dateFormat, element.value);
      } catch (error) {
        date = null;
      }
      return date;
    }
  });

  $(function () {
    $("#key-action-date-colliers").datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      changeYear: true
    });
  });

  // ESRI.watchUtils.watch(map.ObjMapView, "zoom", function () {
  //   ESRI.watchUtils.whenFalseOnce(map.ObjMapView, "updating", function (result) {
  //     console.log(result)
  //   });
  // });

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

  // var rendererProvinsi = {
  //   type: "unique-value",
  //   field: "PROVINSI",
  //   uniqueValueInfos: []
  // }

  // var provinsi = new ESRI.FeatureLayer({
  //   url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/3",
  //   outFields: ["PROVINSI"],
  //   visible: false,
  //   maxScale: 0,
  //   minScale: 0
  // })

  // var queryPROVINSI = new ESRI.Query({
  //   where: "1=1",
  //   outFields: "PROVINSI"
  // })

  // await provinsi.queryFeatures(queryPROVINSI).then(function (results) {
  //   for (let i = 0; i < results.features.length; i++) {
  //     var obj = {
  //       value: results.features[i].attributes.PROVINSI,
  //       symbol: {
  //         type: 'text',
  //         color: 'black',
  //         haloColor: 'black',
  //         text: results.features[i].attributes.PROVINSI,
  //         font: {
  //           size: 20,
  //           weight: 'bold',
  //           family: "sans-serif",
  //         }
  //       }
  //     }
  //     rendererProvinsi.uniqueValueInfos.push(obj)
  //   }
  //   provinsi.renderer = rendererProvinsi
  // })

  // var rendererKabupaten = {
  //   type: "unique-value",
  //   field: "KABKOT",
  //   uniqueValueInfos: []
  // }

  // var kabupaten = new ESRI.FeatureLayer({
  //   url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/2",
  //   outFields: ["KABKOT"],
  //   maxScale: 0,
  //   minScale: 0
  // })

  // var queryKABUPATEN = new ESRI.Query({
  //   where: "1=1",
  //   outFields: "KABKOT"
  // })

  // await kabupaten.queryFeatures(queryKABUPATEN).then(function (results) {
  //   for (let i = 0; i < results.features.length; i++) {
  //     var obj = {
  //       value: results.features[i].attributes.KABKOT,
  //       symbol: {
  //         type: 'text',
  //         color: 'blue',
  //         haloColor: 'blue',
  //         text: results.features[i].attributes.KABKOT,
  //         font: {
  //           size: 10,
  //           weight: 'bold',
  //           family: "sans-serif",
  //         }
  //       }
  //     }
  //     rendererKabupaten.uniqueValueInfos.push(obj)
  //   }
  //   kabupaten.renderer = rendererKabupaten
  // })

  // var rendererKecamatan = {
  //   type: "unique-value",
  //   field: "KECAMATAN",
  //   uniqueValueInfos: []
  // }

  // var kecamatan = new ESRI.FeatureLayer({
  //   url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/1",
  //   outFields: ["KECAMATAN"],
  //   maxScale: 0,
  //   minScale: 0
  // })

  // var queryKECAMATAN = new ESRI.Query({
  //   where: "1=1",
  //   outFields: "KECAMATAN"
  // })

  // await kecamatan.queryFeatures(queryKECAMATAN).then(function (results) {
  //   for (let i = 0; i < results.features.length; i++) {
  //     var obj = {
  //       value: results.features[i].attributes.KECAMATAN,
  //       symbol: {
  //         type: 'text',
  //         color: 'red',
  //         haloColor: 'red',
  //         text: results.features[i].attributes.KECAMATAN,
  //         font: {
  //           size: 10,
  //           weight: 'bold',
  //           family: "sans-serif",
  //         }
  //       }
  //     }
  //     rendererKecamatan.uniqueValueInfos.push(obj)
  //   }
  //   kecamatan.renderer = rendererKecamatan
  // })

  // var rendererDesa = {
  //   type: "unique-value",
  //   field: "DESA",
  //   uniqueValueInfos: []
  // }

  // var desa = new ESRI.FeatureLayer({
  //   url: "https://gis.locatorlogic.com/arcgis/rest/services/LLS/LLS_2019/MapServer/0",
  //   outFields: ["DESA"],
  //   maxScale: 0,
  //   minScale: 0
  // })

  // var queryDESA = new ESRI.Query({
  //   where: "1=1",
  //   outFields: "DESA"
  // })

  // await desa.queryFeatures(queryDESA).then(function (results) {
  //   for (let i = 0; i < results.features.length; i++) {
  //     var obj = {
  //       value: results.features[i].attributes.DESA,
  //       symbol: {
  //         type: 'text',
  //         color: 'green',
  //         haloColor: 'green',
  //         text: results.features[i].attributes.DESA,
  //         font: {
  //           size: 10,
  //           weight: 'bold',
  //           family: "sans-serif",
  //         }
  //       }
  //     }
  //     rendererDesa.uniqueValueInfos.push(obj)
  //   }
  //   desa.renderer = rendererDesa
  // })

  // map.ObjMap.addMany([provinsi, kabupaten, kecamatan, desa])

  mapViewClick(map)
  mapViewHover(map)
  // watchZoomLevel(map, provinsi, kabupaten, kecamatan, desa)
  createSketch(map)

  closeContextMenu() // Close context menu

  //---Context Menu Action---//
  radiusClick(map)
  drivingtimeClick(map)
  drivingdistanceClick(map)
  manualClick(map)
  polygonClick(map)
  polylineClick(map)
  analyzeClick(token)
  removeClick(map)

  viewPopupAnalyzedClick(map)

  window.hoveredMeasurement = false
  window.hoveredDraw = false
  measurementHover(["polygon", "polyline"])
  analyzeHover(["radius", "drivingtime", "drivingdistance", "manual"])
  removePointer(map)
  //---End of Context Menu Action---//

  submitFilterServices(map);
  removeFilterResults(map);

  consumePOI(map)

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
      toggleNav("open")
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
  inputFilter();
  multiSelect();
  inputCheckboxPropertyStatus();
  inputCheckboxServices(GIS, map);
  saveDataServiceToLocalStorage();
  createOverlap(GIS, map);
  viewTableServices(map);
  zoomToLayer(map);
  expandCheckboxServices();
  //---End of Set all external function here---//

  //Clear the localstorage when user logout
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
  });

  console.log(map.ObjMap)
}