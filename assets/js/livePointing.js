function livePointing(GIS, map) {
  $("#mapDiv").mousedown(function (event) {
    if (event.which == 1) {
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
    } else if (event.which == 3) {
      for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {
        if ("livePointing" in map.ObjMapView.graphics.items[i].attributes) {
          var div = $('<div class="image-wrapper-a">')
            .css({
              "left": event.pageX + 'px',
              "top": event.pageY + 'px'
            }).append($('<div>Buffer</div><div>Driving Time</div>'))
            .appendTo(document.body);
        }
      }
    }
  });
}
