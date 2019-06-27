function boot(GIS) {
  //Define Config class
  let config = new GIS.Config();
  //Define Map class
  let map = new GIS.Map(config.CenterPoint);
  map.setBasemap("topo-vector");
  
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
  let pointEnabled = false;
  $(document).ready(function() {
    $("#pointing-btn").click(function(){
      pointEnabled = true;
      $("#mapDiv").attr("style","cursor:pointer;")
      map.ObjMapView.on("click", function(event) {
        if (pointEnabled) {
          pointEnabled = !pointEnabled;
          let latitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
          }).latitude.toFixed(3);
    
          let longitude = map.ObjMapView.toMap({
            x: event.x,
            y: event.y
          }).longitude.toFixed(3);
    
          $.addRows()
          $.each(window.counterArr, function(index, value){
            if ($(".latitude-form-"+value).val() === '') {
              $(".latitude-form-"+value).val(latitude)
              $(".longitude-form-"+value).val(longitude)
              $("#form-list").delegate('.selectbuffer-'+value, 'click', function() {
                $.get("content/template/instant_analysis/buffer.php", function(data){ 
                  $(".form-buffer-"+value).append(data)
                });
              })
              $("#form-list").delegate('.selectdrive-'+value, 'click', function() {
                $.get("content/template/instant_analysis/driving.php", function(data){ 
                  $(".form-drive-"+value).append(data)
                });
              }) 
            }
          })
        }
        if (pointEnabled == false) {
          $("#mapDiv").attr("style","cursor:default;")
        }
      })
    })
  })

  // let btnEmptySelection = document.getElementById("remove");
  // btnEmptySelection.onclick = function() {
  //   map.ObjMapView.graphics.removeAll();
  // };
  // end of create site analysis

  //Define Buffers
  bufferRadius(GIS,map,config)
  driveTime(GIS,map)

  // document.querySelector("#basemap").addEventListener("click", function() {
  //   console.log(radius.Results);
  // });

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
  map.ObjMapView.on("pointer-move", function() {
    let pointColors = $("#colors").val();
    let convertCSV = new GIS.Buffer.ConvertCSV(
      map.ObjMap,
      map.ObjMapView,
      pointColors
    );
    convertCSV.setupDropZone();
  });
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
  poi.run();
  // end of widget color picker and render poi

  ServiceLayer(GIS,map,config)

  //localStorage.clear();
}
