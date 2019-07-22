export class BufferPOI {
  constructor(map, layerId, poiName) {
    this.Map = map;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/"+layerId
    );
    this.POIName = poiName
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
    const self = this
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
            title: self.POIName,
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

export class BufferProperty {
  constructor(map, layerId, poiName) {
    this.Map = map;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/FeatureServer/"+layerId
    );
    this.POIName = poiName
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
    const self = this
    let graphicsLayer = new ESRI.GraphicsLayer();
    this.Map.add(graphicsLayer);
    
    let query = new ESRI.Query();
    query.geometry = this.Geometry;
    query.returnGeometry = true;
    query.outFields = ["*"];

    let markerSymbol = {
      type: "picture-marker",
      url: "assets/images/icons/icons8-building-40.png",
      width: "20px",
      height: "20px"
    };
    
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      results.features.forEach(function(feature){
        let myDateP = new Date(feature.attributes.r_k_time_period*1000);
        let myEpochProperty = myDateP.toGMTString();
        let myDateL = new Date(feature.attributes.r_k_l_time_period*1000);
        let myEpochLand = myDateL.toGMTString();
        let g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: markerSymbol,
          popupTemplate: {
            title: self.POIName,
            content: "<table class='esri-widget__table'><tr><th class='esri-feature__field-header'>Building Name</th><td class='esri-feature__field-data'>{buildingname}</td></tr><tr><th class='esri-feature__field-header'>Tenant</th><td class='esri-feature__field-data'>{tenant}</td></tr><tr><th class='esri-feature__field-header'>Property Type</th><td class='esri-feature__field-data'>{propertytype}</td></tr><tr><th class='esri-feature__field-header'>Market Scheme</th><td class='esri-feature__field-data'>{marketscheme}</td></tr><tr><th class='esri-feature__field-header'>Transaction Type</th><td class='esri-feature__field-data'>{transactiontype}</td></tr><tr><th class='esri-feature__field-header'>Floor</th><td class='esri-feature__field-data'>{floor}</td></tr><tr><th class='esri-feature__field-header'>Address</th><td class='esri-feature__field-data'>{address}</td></tr><tr><th class='esri-feature__field-header'>Property Square Meter</th><td class='esri-feature__field-data'>{r_k_p_sqm} m<sup>2</sup></td></tr><tr><th class='esri-feature__field-header'>Land Square Meter</th><td class='esri-feature__field-data'>{r_k_l_sqm} m<sup>2</sup></td></tr><tr><th class='esri-feature__field-header'>Property Availability</th><td class='esri-feature__field-data'>{r_k_property_availability}</td></tr><tr><th class='esri-feature__field-header'>Property Time Period</th><td class='esri-feature__field-data'>"+myEpochProperty+"</td></tr><tr><th class='esri-feature__field-header'>Land Time Period</th><td class='esri-feature__field-data'>"+myEpochLand+"</td></tr></table><br><div class='esri-feature__media esri-feature__content-element'><div class='esri-feature__media-container'><div class='esri-feature__media-item-container'><div class='esri-feature__media-item'><img alt='{buildingname}' src='{photo}'></div></div></div></div>"
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