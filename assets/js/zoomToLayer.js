function zoomToLayer(map) {
  $(document).delegate("a[name='layer-point']", "click", function() {

    let point = new ESRI.Point({
      longitude: $(this).attr("longitude"),
      latitude: $(this).attr("latitude")
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
