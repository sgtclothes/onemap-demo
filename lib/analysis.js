export class BufferPOI {
  constructor(map, layerId, type) {
    this.Map = map;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/"+layerId
    );
  }

  setGeometryBuffer(latitude, longitude){
    this.Latitude = latitude;
    this.Longitude = longitude;
    let circle = new ESRI.Circle({
      center: [this.Longitude, this.Latitude],
      geodesic: true,
      radius: this.Distance,
      radiusUnit: this.Unit
    });
    this.Geometry = circle
  }

  setGeometryDriving(geometry) {
    this.Geometry = geometry
  }
  
  render() {
    let graphicsLayer = new ESRI.GraphicsLayer();
    this.Map.add(graphicsLayer);
    
    let query = new ESRI.Query();
    query.geometry = this.Geometry;
    query.returnGeometry = true;
    query.outFields = ["*"];
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      results.features.forEach(function(feature){
        let g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: feature.layer.renderer.symbol,
          popupTemplate: {
            title: "{POI_NAME}",
            content: "<table class='esri-widget__table'><tr><th class='esri-feature__field-header'>St Name</th><td class='esri-feature__field-data'>{ST_NAME}</td></tr><tr><th class='esri-feature__field-header'>Ph Number</th><td class='esri-feature__field-data'>{PH_NUMBER}</td></tr><tr><th class='esri-feature__field-header'>Poi St Num</th><td class='esri-feature__field-data'>{POI_ST_NUM}</td></tr><tr><th class='esri-feature__field-header'>Poi Nmtype</th><td class='esri-feature__field-data'>{POI_NMTYPE}</td></tr><tr><th class='esri-feature__field-header'>Act Postal</th><td class='esri-feature__field-data'>{ACT_POSTAL}</td></tr></table>"
          }
        });
        graphicsLayer.add(g);
      });
    });
  }

  setDistanceAndUnit(distance,unit){
    this.Distance = distance
    this.Unit = unit
  }
}