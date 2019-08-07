function viewTableServices(map) {
  $(document).delegate("i[name='list-table']", "click", function() {
    $(".table_list_services").toggle();
    let content = document.getElementById("tab-content-services");
    let value = $(this)
      .parents("td")
      .siblings("td")
      .find("input")
      .val();
    let div = document.createElement("DIV");
    div.setAttribute("class", "table-responsive");
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
    let thName = document.createElement("TH");
    thName.innerHTML = "POI NAME";
    let thSiteName = document.createElement("TH");
    thSiteName.innerHTML = "ST NAME";
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
      console.log(results.features);
      for (let i = 0; i < results.features; i++) {
        console.log(results.features[i].attributes);
        // let tr = document.createElement("TR");
        // let tdNumber = document.createElement("TD");
        // let tdName = document.createElement("TD");
        // let tdSiteName = document.createElement("TD");

        // tdNumber.innerHTML = i + 1;
        // tdName.innerHTML = results.features[i].attributes.POI_NAME;
        // tdSiteName.innerHTML = results.features[i].attributes.ST_NAME;

        // tr.appendChild(tdNumber);
        // tr.appendChild(tdName);
        // tr.appendChild(tdSiteName);
        // table.appendChild(tr);
      }
    });
  });
}
