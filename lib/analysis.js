export class BufferPOI {
  constructor(map, mapView, latitude, longitude, layerId) {
    this.Map = map;
    this.MapView = mapView;
    this.Latitude = latitude;
    this.Longitude = longitude;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/"+layerId
    );
  }
  
  create() {
    let circle = new ESRI.Circle({
      center: [this.Longitude, this.Latitude],
      geodesic: true
    });

    let buffer = ESRI.geometryEngine.geodesicBuffer(circle, this.Distance, this.Unit);

    let graphicsLayer = new ESRI.GraphicsLayer();
    this.Map.add(graphicsLayer);
    
    let query = new ESRI.Query();
    query.geometry = buffer;
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = 'OBJECTID IN ('+this.OID+')'
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      results.features.forEach(function(feature){
        let g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: feature.layer.renderer.symbol
        });
        graphicsLayer.add(g);
      });
    });
  }

  setDistanceAndUnit(distance,unit){
    this.Distance = distance
    this.Unit = unit
  }

  setObjectID(oid){
    this.OID = oid
  }
}