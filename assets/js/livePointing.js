function livePointing(GIS, map) {
  map.ObjMapView.on("click", function (event) {
    //check if previous pointing is enable
    for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {
      if ("livePointing" in map.ObjMapView.graphics.items[i].attributes) {
        map.ObjMapView.graphics.items[i].visible = false;
        map.ObjMapView.graphics.items.splice(i, 1);
      }
    }
    //Get latitude and longitude
    let latitude = map.ObjMapView.toMap({
      x: event.x,
      y: event.y
    }).latitude.toFixed(7);
    let longitude = map.ObjMapView.toMap({
      x: event.x,
      y: event.y
    }).longitude.toFixed(7);
    let pointing = new GIS.Buffer.livePointing(
      map.ObjMapView,
      latitude,
      longitude
    );
    pointing.setPictureMarker();
    pointing.render();
    $("#error-input-points").hide();
    $("#error-down-service").hide();
    console.log(map.ObjMapView);
  });
}
