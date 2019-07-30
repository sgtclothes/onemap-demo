function inputCheckboxServices(GIS, map) {
  let poi = $(".checkbox-poi");
  let infrastructure = $(".checkbox-infrastructure");
  let demographic = $(".checkbox-demographic");
  let subPOI = $(".checkbox-sub-poi");
  let subInfrasctructure = $(".checkbox-sub-infrastructure");
  let subDemographic = $(".checkbox-sub-demographic");

  $(poi).click(function() {
    map.ObjMap.layers.items = [];
    let layer;
    let url =
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
    let legend = document.createElement("div");
    let title = "<p>LIST POINT OF INTEREST</p>";
    $(legend).append(title);
    if ($(this).prop("checked") == true) {
      for (let i = 0; i < subPOI.length; i++) {
        $(subPOI).prop("checked", true);
        layer = new GIS.Layer.ServiceLayer(
          map.ObjMap,
          url + $(subPOI[i]).val()
        );
        layer.render();
        $(subPOI[i]).attr(
          "name",
          map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
        );
        renderLegend(legend, url + $(subPOI[i]).val());
      }
    } else if ($(this).prop("checked") == false) {
      map.ObjMap.layers.items = [];
      for (let i = 0; i < subPOI.length; i++) {
        $(subPOI).prop("checked", false);
      }
    }
  });

  $(subPOI).click(function() {
    let layer;
    let url =
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
    let check = [];
    if ($(this).prop("checked") == true) {
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
    } else if ($(this).prop("checked") == false) {
      for (let i in map.ObjMap.layers.items) {
        if (map.ObjMap.layers.items[i].uid == $(this).attr("name")) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < subPOI.length; i++) {
      if ($(subPOI[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subPOI[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(poi).prop("checked", false);
    } else {
      $(poi).prop("checked", true);
    }
  });

  function renderLegend(legend, url) {
    var layersRequest = {
      query: {
        f: "json"
      },
      responseType: "json"
    };
    EsriRequest(url, layersRequest).then(function(response) {
      console.log("response", response.data.drawingInfo.renderer.symbol);
      let symbol = response.data.drawingInfo.renderer.symbol.url;
      map.ObjMapView.when(function() {
        let pic =
          "<img src=" + url + "/images/" + symbol + " width='14' height='14'>";
        $(legend).append(pic);
        map.ObjMapView.ui.add($(".legend-POI")[0], "bottom-right");
        $(".legend-POI")[0].toggle();
        console.log($(".legend-POI")[0])
      });
    });
  }

  $(infrastructure).click(function() {
    map.ObjMap.layers.items = [];
    let layer;
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/UberMedia/MapServer/";
    if ($(this).prop("checked") == true) {
      for (let i = 0; i < subInfrasctructure.length; i++) {
        $(subInfrasctructure).prop("checked", true);
        layer = new GIS.Layer.ServiceLayer(
          map.ObjMap,
          url + $(subInfrasctructure[i]).val()
        );
        layer.render();
        $(subInfrasctructure[i]).attr(
          "name",
          map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
        );
      }
    } else if ($(this).prop("checked") == false) {
      map.ObjMap.layers.items = [];
      for (let i = 0; i < subInfrasctructure.length; i++) {
        $(subInfrasctructure).prop("checked", false);
      }
    }
  });

  $(subInfrasctructure).click(function() {
    let layer;
    let check = [];
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/UberMedia/MapServer/";
    if ($(this).prop("checked") == true) {
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
    } else if ($(this).prop("checked") == false) {
      for (let i in map.ObjMap.layers.items) {
        if (map.ObjMap.layers.items[i].uid == $(this).attr("name")) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < subInfrasctructure.length; i++) {
      if ($(subInfrasctructure[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subInfrasctructure[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(infrastructure).prop("checked", false);
    } else {
      $(infrastructure).prop("checked", true);
    }
  });

  $(demographic).click(function() {
    map.ObjMap.layers.items = [];
    let layer;
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/";
    if ($(this).prop("checked") == true) {
      for (let i = 0; i < subDemographic.length; i++) {
        $(subDemographic).prop("checked", true);
        layer = new GIS.Layer.ServiceLayer(
          map.ObjMap,
          url + $(subDemographic[i]).val()
        );
        layer.render();
        $(subDemographic[i]).attr(
          "name",
          map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
        );
      }
    } else if ($(this).prop("checked") == false) {
      map.ObjMap.layers.items = [];
      for (let i = 0; i < subDemographic.length; i++) {
        $(subDemographic).prop("checked", false);
      }
    }
    console.log(map.ObjMap.layers.items);
  });

  $(subDemographic).click(function() {
    let layer;
    let check = [];
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/";
    if ($(this).prop("checked") == true) {
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
    } else if ($(this).prop("checked") == false) {
      for (let i in map.ObjMap.layers.items) {
        if (map.ObjMap.layers.items[i].uid == $(this).attr("name")) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < subDemographic.length; i++) {
      if ($(subDemographic[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subDemographic[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(demographic).prop("checked", false);
    } else {
      $(demographic).prop("checked", true);
    }
  });
}
