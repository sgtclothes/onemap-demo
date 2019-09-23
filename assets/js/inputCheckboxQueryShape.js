function inputCheckboxQueryShape(GIS, map) {
  let subPOI = $(".checkbox-sub-poi-query");

  $(document).delegate(".checkbox-sub-poi-query", "click", function() {
    let layer;
    let graphicsLayer = new ESRI.GraphicsLayer();
    map.ObjMap.add(graphicsLayer);
    if ($(this).prop("checked") == true) {
      let services = new ESRI.FeatureLayer({
        url:
          "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/" +
          $(this).val()
      });
      console.log(map.ObjMap);
      let query = new ESRI.Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.outSpatialReference = map.ObjMap.spatialReference;
      for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if ("customShape" in map.ObjMap.layers.items[i]) {
          query.geometry =
            map.ObjMap.layers.items[i].graphics.items[0].geometry;
        }
      }
      services.queryFeatures(query).then(function(results) {
        // console.log(results.fields);
        // for (let i = 0; i < results.fields.length; i++) {
        //   map.ObjMapView.graphics.add(results.fields[i]);
        // }
        addGraphics(results);
      });
    } else if ($(this).prop("checked") == false) {
      console.log("unchecked");
    }

    function addGraphics(result) {
      console.log(localStorage.getItem("dataPOI"));
      graphicsLayer.removeAll();
      result.features.forEach(function(feature) {
        var g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: {
            type: "simple-marker",
            color: [0, 0, 0],
            outline: {
              width: 2,
              color: [0, 255, 255]
            },
            size: "20px"
          }
        });
        graphicsLayer.add(g);
      });
    }
  });
}
