function zoomToLayer(map) {
  $(document).delegate("a[name='layer-point']", "click", function() {
    let y = $(this).attr("y");
    let x = $(this).attr("x");
    let latitude = $(this).attr("latitude");
    let longitude = $(this).attr("longitude");
    let latLong = proj4("EPSG:3857", "EPSG:4326", [Number(x), Number(y)]);
    console.log(latitude);
    console.log(longitude)
    let point = new ESRI.Point({
      latitude: latitude,
      longitude: longitude
    });

    let pointGraphic = new ESRI.Graphic({
      geometry: point
    });
    map.ObjMapView.goTo({
      target: pointGraphic,
      zoom: 17
    });
  });
}
