function createOverlap(GIS, map) {
  $(document).delegate(".select-buffer-layer", "change", function() {
    let radiusValue = $(this).val();
    let value = $(this)
      .parents("td")
      .siblings("td")
      .find("input")
      .val();
    let poiUrl = new ESRI.FeatureLayer({
      url:
        "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/" +
        value
    });
    let collectLatLon = [];

    let query = new ESRI.Query();
    query.returnGeometry = true;
    query.outSpatialReference = map.ObjMap.spatialReference;
    query.where = "1=1";
    poiUrl.queryFeatures(query).then(function(results) {
      for (let i = 0; i < results.features.length; i++) {
        collectLatLon.push([
          results.features[i].geometry.latitude,
          results.features[i].geometry.longitude
        ]);
        let radius = new GIS.Buffer.Overlap(
          map.ObjMap,
          map.ObjMapView,
          results.features[i].geometry.latitude,
          results.features[i].geometry.longitude
        );
        radius.setRadius(radiusValue);
        radius.setUnit("kilometers");
        radius.create();
      }
    });
  });
}
