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

    var buffer = ESRI.geometryEngine.geodesicBuffer(circle, this.Distance, this.Unit);

    const self = this;
    let query = new ESRI.Query();
    query.where = 'OBJECTID in ('+this.OID+')'
    query.returnGeometry = true;
    query.geometry = buffer;
    query.outFields = ["*"];
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      results.features.forEach(function(feature){
        console.log(feature)
      })
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