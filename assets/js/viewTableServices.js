function viewTableServices(map) {
  $(".close-services").click(function() {
    $(".table_list_services").hide();
  });

  $(document).delegate("i[name='list-table']", "click", function() {
    //Check tabActive in localstorage
    let container = JSON.parse(localStorage.getItem("tabServicesActive"));
    if (container == null) {
      container = [];
    }

    //Toggle table
    $(".table_list_services").show();

    let value = $(this)
      .parents("td")
      .siblings("td")
      .find("input")
      .val();
    let label = $(this)
      .parents("td")
      .siblings("td")
      .find("label")
      .text();
    let cardServices = document.getElementById("card-services");
    let content = document.createElement("DIV");
    content.setAttribute("id", "tab-content-services-" + value);
    content.setAttribute("class", "tab-content-services tab-content");
    cardServices.appendChild(content);

    let ulLabel = document.getElementById("nav-tabs-services");
    if (!container.includes(label)) {
      //Show loading bar while get data services
      $("#loading-bar").show();
      let labelServices = document.createElement("LI");
      labelServices.setAttribute(
        "class",
        "label-services nav-link active tab-link-service"
      );
      labelServices.setAttribute("id", "tab-link-services-" + value);
      labelServices.setAttribute("name", "label-services-" + label);
      labelServices.innerHTML = label;
      ulLabel.appendChild(labelServices);

      container.push(label);
      localStorage.setItem("tabServicesActive", JSON.stringify(container));

      let div = document.createElement("DIV");
      div.setAttribute("class", "table-responsive table-list-layer");
      let table = document.createElement("TABLE");
      table.setAttribute(
        "class",
        "table table-bordered table-xs table-striped table-hover"
      );
      table.style.marginBottom = "15px";
      div.appendChild(table);
      let trHead = document.createElement("TR");
      let thNumber = document.createElement("TH");
      thNumber.innerHTML = "#";
      thNumber.style.fontWeight = "bold";
      let thName = document.createElement("TH");
      thName.innerHTML = "POI NAME";
      thName.style.fontWeight = "bold";
      let thSiteName = document.createElement("TH");
      thSiteName.innerHTML = "ST NAME";
      thSiteName.style.fontWeight = "bold";
      let poi = new ESRI.FeatureLayer({
        url:
          "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/" +
          value
      });

      trHead.appendChild(thNumber);
      trHead.appendChild(thName);
      trHead.appendChild(thSiteName);
      table.appendChild(trHead);
      content.appendChild(div);

      let query = new ESRI.Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.outSpatialReference = map.ObjMap.spatialReference;
      query.where = "1=1";

      poi.queryFeatures(query).then(function(results) {
        displayResults(results);
      });

      function displayResults(results) {
        for (let i in results.features) {
          let latitude = results.features[i].geometry.latitude;
          let longitude = results.features[i].geometry.longitude;

          let tr = document.createElement("TR");
          let tdNumber = document.createElement("TD");
          let a = document.createElement("A");
          a.setAttribute("name", "layer-point");
          a.setAttribute("latitude", latitude);
          a.setAttribute("longitude", longitude);
          let tdName = document.createElement("TD");
          let tdSiteName = document.createElement("TD");

          tdNumber.innerHTML = Number(i) + 1;
          a.innerHTML = results.features[i].attributes.POI_NAME;
          a.setAttribute("href", "#");
          tdSiteName.innerHTML = results.features[i].attributes.ST_NAME;

          tdName.appendChild(a);
          tr.appendChild(tdNumber);
          tr.appendChild(tdName);
          tr.appendChild(tdSiteName);
          table.appendChild(tr);
          $("#loading-bar").hide();
        }
      }
    } else {
      if ($("#tab-link-services-" + value).is(":visible")) {
        $("#tab-link-services-" + value).show();
        $("#tab-content-services-" + value).show();
      } else {
        $("#tab-link-services-" + value).show();
        $("#tab-content-services-" + value).show();
        $("#tab-link-services-" + value).appendTo($("#nav-tabs-services"));
      }
    }

    //Navigate to current tab
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link-service");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("tab-content-services-" + value).style.display =
      "block";
    document.getElementById("tab-link-services-" + value).className +=
      " active";
  });

  $(document).delegate(".tab-link-service", "click", function(evt) {
    let str = $(this).attr("id"),
      splitNum = str.split("-"),
      id = splitNum[3];
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link-service");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("tab-content-services-" + id).style.display =
      "block";
    evt.currentTarget.className += " active";
  });
}
